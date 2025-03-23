import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const ChatHistory = ({ chats, onChatSelect, onNewChat }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="md:w-1/4 md:relative md:bg-white md:bg-opacity-80 md:p-4">
      {/* Mobile: Burger Button */}
      <button
        onClick={toggleMenu}
        className="block md:hidden p-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg fixed top-4 left-4 z-50"
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile: Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-3/4 max-w-sm bg-white bg-opacity-80 p-4 shadow-lg transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:h-auto md:w-full`}
      >
        <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
          Chat History
        </h3>
        <button
          onClick={onNewChat}
          className="w-full p-2 mb-4 text-white font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          New Chat
        </button>
        <ul className="space-y-2">
          {chats.map((chat, idx) => (
            <li
              key={idx}
              onClick={() => {
                onChatSelect(chat.title);
                setMenuOpen(false); // Close menu on selection (mobile only)
              }}
              className="p-2 bg-gray-200 bg-opacity-90 rounded-lg cursor-pointer text-center md:text-left hover:bg-gray-300"
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: Overlay */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default ChatHistory;
