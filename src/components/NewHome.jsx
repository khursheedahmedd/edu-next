import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NewHome = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: {
            value: 0.5,
            anim: { enable: true, speed: 1, opacity_min: 0.1 },
          },
          size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 40, size_min: 0.1 },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 6, random: true, out_mode: "out" },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Logo with larger size and adjusted position */}
      <div className="absolute top-3 left-8 z-10">
        <img
          src="/Untitled_design__1_-removebg-preview.png" // Logo source
          alt="EduNext Logo"
          className="h-32 w-auto"
        />
      </div>

      <div id="particles-js" className="absolute inset-0 z-0"></div>
    
      <div className="relative z-10 p-6 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Advanced Learning with EduNext
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Experience personalized, AI-driven learning that adapts to your needs.
          Join us to make education smarter, engaging, and effective.
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 mt-8">
        {/* Card 1: Talk with Tutor */}
        <Link
          to="/chatbot"
          className="cursor-pointer w-80 p-6 bg-gradient-to-r from-purple-500 to-pink-400 hover:shadow-lg transition transform hover:-translate-y-2 rounded-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-3">Talk with Tutor</h2>
          <p>
            Connect and discuss with our AI tutor to stay informed and engaged
            in your studies.
          </p>
        </Link>

        {/* Card 2: Make a Target */}
        <Link
          to="/quiz" // Updated to link to QuizComponent
          className="cursor-pointer w-80 p-6 bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg transition transform hover:-translate-y-2 rounded-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-3">Make a Target</h2>
          <p>
            Set learning goals and track progress to achieve academic excellence with us.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NewHome;
