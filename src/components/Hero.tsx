import React, { useEffect, useState, Suspense } from "react";
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
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/JAI_RESUME_2025.pdf";
    link.download = "JAI_RESUME_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          justify-content: center;
          align-items: center;
        }

        @media(min-width: 768px) {
          .hero-container {
            flex-direction: row;
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
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 1.5rem;
          animation: slideIn 1s ease-in-out;
        }

        @media(max-width: 767px) {
          .hero-left {
            order: 2;
            align-items: center;
            text-align: center;
            margin-top: 0; /* 🛠️ Removed space */
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
            height: 1800px;
            margin-top: -2rem; /* 🛠️ Lowered spline slightly */
            margin-bottom: -1rem; /* 🛠️ Pull closer to text */
          }
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
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
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
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

        .cta-button {
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hero-container">
        {/* ✅ TEXT FIRST (Left on desktop) */}
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

          <button className="cta-button" onClick={downloadResume}>
            Download Resume
          </button>

          <div
            className="scroll-down-btn"
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to about section"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToSection("about");
              }
            }}
          >
            <ChevronDown size={32} />
          </div>
        </div>

        {/* ✅ SPLINE SECOND (Right on desktop) */}
        <div className="hero-right">
          <Suspense fallback={<div style={{ color: "#fff", textAlign: "center" }}>Loading animation...</div>}>
            <Spline scene="https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode" />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Hero;
