import React, { useState } from "react";
import ResultComponent from "./Result";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const QuizComponent = () => {
  const [profession, setProfession] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const generateQuiz = async () => {
    if (!profession) {
      alert("Please enter a profession or degree.");
      return;
    }

    setLoading(true);
    setQuiz([]);
    setUserAnswers({});
    setQuizSubmitted(false);
    setScore(null);

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `Create a quiz with 15 multiple-choice questions for students interested in pursuing a career in ${profession}. Each question should have 4 options.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const rawQuiz = response.choices[0]?.message?.content;

      if (!rawQuiz) {
        throw new Error("Quiz content is empty or invalid.");
      }

      console.log("Raw Quiz Response:", rawQuiz); // Debugging: Log the raw quiz response

      const formattedQuiz = rawQuiz
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.toLowerCase().startsWith("answer:"))
        .reduce((acc, line) => {
          if (/^\d+\./.test(line)) {
            // Match lines starting with a number followed by a period (e.g., "1. Question")
            acc.push({ question: line.replace(/^\d+\.\s*/, ""), options: [] });
          } else if (/^[A-D]\)/.test(line)) {
            // Match lines starting with A), B), C), or D) (e.g., "A) Option")
            if (acc.length > 0) {
              acc[acc.length - 1].options.push(line.trim());
            }
          }
          return acc;
        }, []);

      console.log("Formatted Quiz:", formattedQuiz); // Debugging: Log the formatted quiz

      if (formattedQuiz.length === 0 || formattedQuiz.some((q) => q.options.length < 4)) {
        throw new Error("Failed to parse quiz questions. Please try again.");
      }

      setQuiz(formattedQuiz.slice(0, 15)); // Ensure only 15 questions
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const userResponses = quiz.map((item, index) => ({
        question: item.question,
        answer: userAnswers[index] || "",
      }));

      const response = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `Evaluate this quiz: ${JSON.stringify(userResponses)}. Provide a score out of 15 and rank based on performance.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const result = response.choices[0]?.message?.content;

      const match = result.match(/Score: (\d+)/);
      const scoreValue = match ? parseInt(match[1], 10) : 0;

      const rankMatch = result.match(/Rank: ([a-zA-Z\s]+)/);
      const rank = rankMatch ? rankMatch[1] : "Unranked";

      setScore({ correct: scoreValue, total: 15, rank });
      setQuizSubmitted(true); // Mark quiz as submitted
    } catch (error) {
      console.error("Error evaluating quiz:", error);
      alert("Failed to evaluate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-purple-200 to-pink-200 text-black px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Custom Quiz Generator</h1>

      {!loading && quiz.length === 0 && !quizSubmitted && (
        <div className="flex flex-col items-center w-full max-w-lg">
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Enter your future profession or degree..."
            className="text-gray-800 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={generateQuiz}
            className="text-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
          >
            Generate Quiz
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Generating or evaluating...</p>
        </div>
      )}

      {quiz.length > 0 && !quizSubmitted && (
        <div className="w-full max-w-4xl bg-white bg-opacity-90 text-gray-800 rounded-lg shadow-xl p-6 space-y-6">
          {quiz.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold mb-2">
                {index + 1}. {item.question}
              </p>
              {item.options.map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {quizSubmitted && score && (
        <ResultComponent
          score={score.correct}
          totalQuestions={score.total}
          rank={score.rank}
        />
      )}
    </div>
  );
};

export default QuizComponent;
