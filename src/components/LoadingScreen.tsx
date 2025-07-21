import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  const phases = [
    "Initializing systems...",
    "Connecting to mission control...",
    "Calibrating instruments...",
    "Preparing for launch...",
    "Ready for exploration..."
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, Commander ☀️";
    if (hour < 17) return "Good Afternoon, Commander 🌤️";
    return "Good Evening, Commander 🌅";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading dots animation
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.2;
        
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-space-gradient">
      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-6 right-6 z-50 p-3 bg-black/20 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-all hover:bg-black/30 border border-white/10"
      >
        {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-6 left-6 z-50 px-6 py-3 bg-black/20 backdrop-blur-sm text-white/70 hover:text-white rounded-full text-sm transition-all hover:bg-black/30 border border-white/10 font-mono"
        >
          SKIP SEQUENCE
        </button>
      )}

      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float-space"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main 3D Scene */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div 
          className="relative transform-gpu"
          style={{
            transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
          }}
        >
          {/* Central Planet */}
          <div className="relative w-64 h-64 mx-auto mb-16">
            {/* Planet Core */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-blue-400/20 via-purple-500/30 to-black animate-planet-rotate shadow-planet">
              {/* Planet Surface Details */}
              <div className="absolute inset-2 rounded-full bg-gradient-conic from-blue-500/20 via-purple-400/20 to-cyan-500/20 animate-planet-surface" />
              <div className="absolute inset-4 rounded-full bg-gradient-radial from-white/5 to-transparent" />
              
              {/* Planet Glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-radial from-blue-400/20 via-purple-500/10 to-transparent animate-pulse" />
              <div className="absolute -inset-8 rounded-full bg-gradient-radial from-cyan-400/10 via-blue-500/5 to-transparent animate-pulse-slow" />
            </div>

            {/* Orbital Rings */}
            <div className="absolute inset-0 animate-orbit-1">
              <div className="absolute top-1/2 left-1/2 w-80 h-80 -mt-40 -ml-40 border border-blue-400/30 rounded-full animate-ring-glow" />
            </div>
            <div className="absolute inset-0 animate-orbit-2">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 -mt-48 -ml-48 border border-purple-400/20 rounded-full animate-ring-glow-2" />
            </div>
            <div className="absolute inset-0 animate-orbit-3">
              <div className="absolute top-1/2 left-1/2 w-72 h-72 -mt-36 -ml-36 border border-cyan-400/25 rounded-full animate-ring-glow-3" />
            </div>

            {/* Orbital Satellites */}
            <div className="absolute inset-0 animate-satellite-1">
              <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-blue-400 rounded-full shadow-glow-blue animate-pulse" />
            </div>
            <div className="absolute inset-0 animate-satellite-2">
              <div className="absolute bottom-0 right-1/2 w-1.5 h-1.5 mr-0.75 bg-purple-400 rounded-full shadow-glow-purple animate-pulse" />
            </div>
          </div>

          {/* Futuristic Loading Text */}
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-2 tracking-wider animate-text-glow-space">
                LOADING{loadingDots}
              </h1>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto animate-pulse" />
            </div>

            {/* Mission Status */}
            <div className="mb-8">
              <p className="text-blue-200 text-lg font-mono tracking-wide animate-fade-in-space">
                {getGreeting()}
              </p>
            </div>

            {/* Progress Section */}
            <div className="w-96 max-w-sm mx-auto">
              {/* Current Phase */}
              <div className="mb-6">
                <p className="text-cyan-300 text-base font-mono tracking-wide animate-pulse">
                  {phases[currentPhase]}
                </p>
              </div>

              {/* Futuristic Progress Bar */}
              <div className="relative w-full h-1 bg-black/50 rounded-full overflow-hidden mb-4 border border-blue-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative shadow-glow-blue"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-space" />
                </div>
                {/* Progress Bar Glow */}
                <div 
                  className="absolute top-0 h-full bg-gradient-to-r from-blue-400/50 via-cyan-400/50 to-blue-500/50 rounded-full blur-sm transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Stats */}
              <div className="flex justify-between text-xs text-blue-300/80 font-mono">
                <span>MISSION PROGRESS</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* System Status Indicators */}
            <div className="flex justify-center space-x-6 mt-8">
              {['SYS', 'NAV', 'COM'].map((system, i) => (
                <div key={system} className="flex items-center space-x-2">
                  <div 
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      progress > (i + 1) * 25 ? 'bg-green-400 shadow-glow-green' : 'bg-red-400/50'
                    }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                  <span className="text-xs text-white/60 font-mono">{system}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-xs text-white/40 font-mono">
          <span>BOLT SPACE SYSTEMS</span>
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          <span>MISSION: PORTFOLIO</span>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
          <span>STATUS: LOADING</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;