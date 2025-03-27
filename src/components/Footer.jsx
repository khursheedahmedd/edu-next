import React from 'react';

function Footer() {
  return (
    // Footer Section
    <footer className="w-full bg-gray-800 text-white py-4 mt-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Footer Branding */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">EduNext</h3>
          <p className="text-sm text-gray-400">Your AI-powered learning assistant</p>
        </div>

        {/* Footer Features */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          {/* Feature 1: AI-powered Chatbot */}
          <div className="flex items-center space-x-2">
            <span className="bg-blue-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span>AI-powered Chatbot</span>
          </div>

          {/* Feature 2: Learning Resources */}
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-4.418 0-8 1.79-8 4v1a2 2 0 002 2h12a2 2 0 002-2v-1c0-2.21-3.582-4-8-4z"
                />
              </svg>
            </span>
            <span>Learning Resources</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;