import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { ChevronDown, Download } from "lucide-react";
import { useInView } from "react-intersection-observer";

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

// ✅ Memoized Spline so it doesn’t re-render with text animations
const SplineScene = React.memo(
  ({ onLoad, onError }: { onLoad: () => void; onError: () => void }) => (
    <Spline
      scene="https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode"
      onLoad={onLoad}
      onError={onError}
      style={{ width: "100%", height: "100%" }}
    />
  )
);

const Hero: React.FC<HeroProps> = ({ splineLoaded }) => {
  const [skillIndex, setSkillIndex] = useState(0);
  const [color, setColor] = useState("#FFFFFF");
  const [fade, setFade] = useState(true);

  const [splineReady, setSplineReady] = useState(false);
  const [splineError, setSplineError] = useState(false);

  // ✅ Animate skills with RAF (smoother than setInterval)
  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      if (time - lastTime > 2500) {
        setFade(false);
        setTimeout(() => {
          setSkillIndex((prev) => (prev + 1) % skills.length);
          setColor(randomColor());
          setFade(true);
        }, 500);
        lastTime = time;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSplineLoad = () => {
    setSplineReady(true);
    console.info("Spline scene loaded successfully!");
  };

  const handleSplineError = () => {
    setSplineError(true);
    console.warn("Spline scene failed to load, using fallback");
  };

  // ✅ Lazy load with intersection observer
  const { ref: splineRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
          position: relative;
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
          transition: opacity 0.5s ease, color 0.5s ease;
        }
        .fade-in { opacity: 1; }
        .fade-out { opacity: 0; }
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
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .scroll-down-btn:hover {
          color: white;
          transform: scale(1.1);
          animation: none;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>

      <div className="hero-container">
        {/* Left side */}
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

          <div className="mt-6">
            <a
              href="/JAI_RESUME_2025.pdf"
              download="JAI_RESUME_2025.pdf"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-semibold"
            >
              <Download className="h-5 w-5" />
              <span>Download Resume</span>
            </a>
          </div>

          <div
            className="scroll-down-btn"
            onClick={() =>
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to about section"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <ChevronDown size={32} />
          </div>
        </div>

        {/* Right side with Spline */}
        <div ref={splineRef} className="hero-right">
          <div className="spline-container">
            {!splineReady && !splineError && inView && (
              <div className="spline-loading">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading 3D Scene...</span>
                </div>
              </div>
            )}

            {inView && splineLoaded && !splineError ? (
              <SplineScene
                onLoad={handleSplineLoad}
                onError={handleSplineError}
              />
            ) : (
              <div className="spline-fallback">
                <div className="fallback-animation"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm">
                  {splineError ? "3D Scene Unavailable" : "Interactive 3D Model"}
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
