import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  splineLoaded: boolean;
}

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

const Hero: React.FC<HeroProps> = ({ splineLoaded }) => {
  const [skillIndex, setSkillIndex] = useState(0);
  const [color, setColor] = useState("#FFFFFF");
  const [fade, setFade] = useState(true);
  const [splineError, setSplineError] = useState(false);

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

  const handleSplineError = () => {
    setSplineError(true);
    console.warn('Spline scene failed to load, using fallback');
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
          will-change: transform;
          transform: translateZ(0);
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
          will-change: transform;
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
          position: relative;
          will-change: transform;
        }
        @media(max-width: 767px) {
          .hero-right {
            order: 1;
            width: 100%;
            height: 600px;
          }
        }
        .spline-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
        }
        .spline-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #60a5fa;
          font-size: 1.2rem;
          z-index: 10;
        }
        .spline-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }
        .fallback-animation {
          width: 200px;
          height: 200px;
          border: 3px solid #60a5fa;
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 2s linear infinite;
          position: relative;
        }
        .fallback-animation::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          border: 2px solid #8b5cf6;
          border-bottom: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1.5s linear infinite reverse;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          font-weight: 900;
          will-change: transform;
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
          will-change: opacity, color;
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
          will-change: transform;
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
          <div className="spline-container">
            {!splineReady && !splineError && (
              <div className="spline-loading">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading 3D Scene...</span>
                </div>
              </div>
            )}
            
            {splineLoaded && !splineError ? (
              <Spline 
                scene="https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode"
                onLoad={handleSplineLoad}
                onError={handleSplineError}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  opacity: splineReady ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            ) : (
              <div className="spline-fallback">
                <div className="fallback-animation"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm">
                  {splineError ? '3D Scene Unavailable' : 'Interactive 3D Model'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
