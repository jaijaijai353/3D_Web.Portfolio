import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { ChevronDown } from "lucide-react";

const skills = [
  "Data Analyst",
  "SQL Expert",
  "Power BI Specialist",
  "Python Developer",
  "Excel Guru",
];

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Hero: React.FC = () => {
  const [skillIndex, setSkillIndex] = useState(0);
  const [color, setColor] = useState("#FFFFFF");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSkillIndex((prev) => (prev + 1) % skills.length);
        setColor(randomColor());
        setFade(true);
      }, 500); // fade out time
    }, 2500); // total interval

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .hero-container {
          background-color: #000;
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          box-sizing: border-box;
        }
        @media(min-width: 768px) {
          .hero-container {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4rem;
          }
        }
        .hero-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          max-width: 600px;
          margin: 0 auto;
        }
        @media(max-width: 767px) {
          .hero-left {
            order: 2;
            margin-top: 1rem;
            align-items: center;
            text-align: center;
          }
        }
        .hero-right {
          flex: 1;
          max-width: 600px;
          height: 600px;
          margin: 0 auto;
        }
        @media(max-width: 767px) {
          .hero-right {
            order: 1;
            width: 100%;
            height: 600px;
          }
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          font-weight: 900;
        }
        @media(min-width: 768px) {
          h1 {
            font-size: 4.5rem;
          }
        }
        .skill-text {
          margin-top: 0.5rem;
          font-size: 1.75rem;
          font-weight: 600;
          transition: opacity 0.5s ease;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }
        .description {
          margin-top: 1rem;
          font-size: 1.25rem;
          font-weight: 400;
          color: #ccc;
          max-width: 400px;
        }
        .scroll-down-btn {
          margin-top: 3rem;
          cursor: pointer;
          animation: bounce 2s infinite;
          color: #888;
          transition: color 0.3s ease;
        }
        .scroll-down-btn:hover {
          color: white;
          transform: scale(1.1);
          animation: none;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>

      <div className="hero-container">
        {/* Left side with text */}
        <div className="hero-left">
          <h1>Jai Narula</h1>
          <div
            className={`skill-text ${fade ? "fade-in" : "fade-out"}`}
            style={{ color }}
          >
            I am {skills[skillIndex]}
          </div>
          <p className="description">
            Data Analyst | SQL | Power BI | Python | Excel
          </p>

          <div
            className="scroll-down-btn"
            onClick={() => {
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to about section"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <ChevronDown size={32} />
          </div>
        </div>

        {/* Right side with Spline */}
        <div className="hero-right">
          <Spline scene="https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode" />
        </div>
      </div>
    </>
  );
};

export default Hero;
