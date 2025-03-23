// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center text-white relative">
      {/* Login button at the top right */}
      <button
        onClick={() => navigate('/login')}
        className="absolute top-4 right-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg text-black font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Login
      </button>

      <div className="text-center p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to EduNext</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
          AI-powered personalized learning at your fingertips. Make your learning journey smarter, adaptive, and engaging.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg text-black font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
