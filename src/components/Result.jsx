import React from "react";
import { motion } from "framer-motion";

const ResultComponent = ({ score, totalQuestions, rank }) => {
  // Framer Motion animation variants
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const rankColor = rank.toLowerCase().includes("excellent")
    ? "text-green-500"
    : rank.toLowerCase().includes("good")
    ? "text-yellow-500"
    : "text-red-500";

  return (
    <motion.div
      className="mt-10 text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-purple-600 mb-4">Your Quiz Results</h2>
      <motion.p
        className="text-2xl font-semibold text-gray-800 mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Score: {score} / {totalQuestions}
      </motion.p>
      <motion.p
        className={`text-xl font-medium ${rankColor}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Rank: {rank}
      </motion.p>
      <motion.div
        className="mt-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        {rank.toLowerCase().includes("excellent") && (
          <p className="text-green-500 font-bold">Outstanding performance! 🌟</p>
        )}
        {rank.toLowerCase().includes("good") && (
          <p className="text-yellow-500 font-bold">Great job! Keep improving! 💪</p>
        )}
        {rank.toLowerCase().includes("average") && (
          <p className="text-orange-500 font-bold">Good effort! Aim higher next time! 🚀</p>
        )}
        {rank.toLowerCase().includes("unranked") && (
          <p className="text-red-500 font-bold">Keep practicing! You can do it! ✨</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResultComponent;
