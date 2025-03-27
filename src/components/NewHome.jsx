import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaBullseye } from "react-icons/fa"; // Import icons from react-icons

const NewHome = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 overflow-hidden bg-gradient-to-b from-gray-50 via-purple-200 to-pink-200">
      {/* Logo with responsive adjustments */}
      <div className="absolute top-3 left-4 z-10">
        <img
          src="/Untitled_design__1_-removebg-preview.png" // Logo source
          alt="EduNext Logo"
          className="h-16 w-auto md:h-24 lg:h-32" // Adjust logo size for different screen sizes
        />
      </div>

      <div id="particles-js" className="absolute inset-0 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Advanced Learning with EduNext
        </h1>
        <p className="text-base md:text-lg max-w-lg md:max-w-2xl mx-auto mb-6">
          Experience personalized, AI-driven learning that adapts to your needs.
          Join us to make education smarter, engaging, and effective.
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-6 md:mt-8">
        {/* Card 1: Talk with Tutor */}
        <Link
          to="/chatbot"
          className="cursor-pointer w-72 md:w-80 p-4 md:p-6 bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg transition transform hover:-translate-y-2 rounded-lg text-center"
        >
          <FaChalkboardTeacher className="text-4xl md:text-5xl text-white mx-auto mb-3" />
          <h2 className="text-xl md:text-2xl text-gray-50 font-semibold mb-2 md:mb-3">
            Talk with Tutor
          </h2>
          <p className="text-sm md:text-base text-gray-50">
            Connect and discuss with our AI tutor to stay informed and engaged
            in your studies.
          </p>
        </Link>

        {/* Card 2: Make a Target */}
        <Link
          to="/quiz" // Updated to link to QuizComponent
          className="cursor-pointer w-72 md:w-80 p-4 md:p-6 bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg transition transform hover:-translate-y-2 rounded-lg text-center"
        >
          <FaBullseye className="text-4xl md:text-5xl text-white mx-auto mb-3" />
          <h2 className="text-xl md:text-2xl text-gray-50 font-semibold mb-2 md:mb-3">
            Make a Target
          </h2>
          <p className="text-sm md:text-base text-gray-50">
            Set learning goals and track progress to achieve academic excellence with us.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NewHome;