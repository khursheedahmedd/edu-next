import React, { useState, useEffect } from "react";
import Groq from "groq-sdk";
import ChatHistory from "./ChatHistory";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentChatTitle, setCurrentChatTitle] = useState("");

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(savedChats);
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const loadChatHistory = (chatTitle) => {
    const selectedChat = chats.find((chat) => chat.title === chatTitle);
    if (selectedChat) {
      setChatHistory(selectedChat.messages || []);
      setCurrentChatTitle(chatTitle);
    }
  };

  const handleNewChat = () => {
    setChatHistory([]); // Clear chat history
    setCurrentChatTitle(""); // Reset chat title
  };

  const handleSubmit = async () => {
    if (!userInput) return;

    const newMessage = { role: "user", content: userInput };
    const updatedChat = [...chatHistory, newMessage];
    setChatHistory(updatedChat);
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: updatedChat,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        stream: false,
      });

      const aiResponse = chatCompletion.choices[0].message.content;
      const finalChat = [
        ...updatedChat,
        { role: "assistant", content: aiResponse },
      ];

      setChatHistory(finalChat);

      setChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex(
          (chat) => chat.title === currentChatTitle
        );

        if (existingChatIndex > -1) {
          prevChats[existingChatIndex].messages = finalChat;
          return [...prevChats];
        } else {
          const summarizeTitle = (input) => {
            const words = input.split(" ").slice(0, 5); // First 5 words
            return words.join(" ") + (input.length > 5 ? "..." : "");
          };

          const newChatTitle =
            currentChatTitle || summarizeTitle(userInput);
          return [
            ...prevChats,
            { title: newChatTitle, messages: finalChat },
          ];
        }
      });

      if (!currentChatTitle) {
        const summarizeTitle = (input) => {
          const words = input.split(" ").slice(0, 5); // First 5 words
          return words.join(" ") + (input.length > 5 ? "..." : "");
        };
        setCurrentChatTitle(summarizeTitle(userInput));
      }
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="flex flex-row min-h-screen ">
      {/* Chat History Sidebar */}
      <ChatHistory
        chats={chats}
        onChatSelect={loadChatHistory}
        onNewChat={handleNewChat}
        className="w-1/4 bg-white bg-opacity-80 shadow-lg border-r border-gray-200 overflow-y-auto"
      />

      {/* Chat Section */}
      <div className="flex-grow flex flex-col items-center justify-start p-4 bg-gray-100">
        <div className="flex flex-col w-full h-full max-w-6xl">
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white max-w-[70%]"
                      : "bg-gray-200 text-gray-800 max-w-[70%]"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg shadow bg-gray-200 text-gray-800 max-w-[70%]">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center space-x-4 p-4 border-t border-gray-300">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
