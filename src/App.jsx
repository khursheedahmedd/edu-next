// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewHome from './components/NewHome';
import Chatbot from './components/Chatbot';
import QuizComponent from './components/Quiz';
import ResultPage from './components/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<NewHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/Quiz' element={<QuizComponent/>} />
        <Route path="/result" element={<ResultPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
