import React, { useEffect, useState } from 'react';
import { Zap, Volume2, VolumeX } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const phases = [
    "Igniting intelligence...",
    "Gathering sparks...",
    "Illuminating ideas...",
    "Awakening creativity...",
    "Ready to shine..."
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, Jai ☀️";
    if (hour < 17) return "Good Afternoon, Jai 🌤️";
    return "Good Evening, Jai 🌅";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const handleSkip = () => {
    setProgress(100);
    setTimeout(onLoadingComplete, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-6 right-6 z-50 p-2 bg-black/30 rounded-full text-white/70 hover:text-white transition-colors"
      >
        {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-6 left-6 z-50 px-4 py-2 bg-black/30 text-white/70 hover:text-white rounded-full text-sm transition-all hover:bg-black/50"
        >
          Skip
        </button>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div className="text-center text-white">
          {/* Bolt Logo */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Loading Experience
          </h1>

          {/* Greeting */}
          <p className="text-xl md:text-2xl text-blue-200 mb-8 font-light">
            {getGreeting()}
          </p>

          {/* Progress Section */}
          <div className="w-80 max-w-sm mx-auto">
            {/* Current Phase */}
            <div className="mb-4">
              <p className="text-blue-200 text-lg animate-pulse">
                {phases[currentPhase]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between text-sm text-blue-300">
              <span>Loading Experience</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;