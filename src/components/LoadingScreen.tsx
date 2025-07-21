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

  const sunPosition = {
    x: 50 + (mousePosition.x - 50) * 0.1,
    y: 70 - (progress * 0.3)
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-400">
      {/* Cinematic Letterbox Bars */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black z-50" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-50" />
      
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

      {/* Animated Sky Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-400 transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, 
            hsl(240, 60%, ${20 + progress * 0.1}%), 
            hsl(280, 50%, ${30 + progress * 0.2}%), 
            hsl(30, 80%, ${50 + progress * 0.3}%))`
        }}
      />

      {/* Stars (fade out as sun rises) */}
      <div className="absolute inset-0" style={{ opacity: Math.max(0, 1 - progress / 50) }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div
        className="absolute w-24 h-24 transition-all duration-1000 ease-out"
        style={{
          left: `${sunPosition.x}%`,
          top: `${sunPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className="w-full h-full bg-gradient-radial from-yellow-300 via-orange-400 to-orange-600 rounded-full animate-pulse"
          style={{
            boxShadow: `0 0 ${20 + progress * 0.5}px rgba(255, 165, 0, 0.6), 0 0 ${40 + progress}px rgba(255, 140, 0, 0.4)`
          }}
        />
        {/* Sun rays */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-transparent via-yellow-300 to-transparent opacity-30"
              style={{
                height: '60px',
                left: '50%',
                top: '-30px',
                transformOrigin: '50% 42px',
                transform: `translateX(-50%) rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hills with Parallax */}
      <div className="absolute bottom-0 w-full">
        {/* Back Hills */}
        <div 
          className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-slate-800 to-slate-700 opacity-60"
          style={{
            clipPath: 'polygon(0 100%, 0 60%, 20% 50%, 40% 65%, 60% 45%, 80% 55%, 100% 40%, 100% 100%)',
            transform: `translateX(${(mousePosition.x - 50) * 0.05}px)`
          }}
        />
        
        {/* Middle Hills */}
        <div 
          className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-700 to-slate-600 opacity-80"
          style={{
            clipPath: 'polygon(0 100%, 0 70%, 25% 55%, 45% 70%, 65% 50%, 85% 60%, 100% 45%, 100% 100%)',
            transform: `translateX(${(mousePosition.x - 50) * 0.1}px)`
          }}
        />
        
        {/* Front Hills */}
        <div 
          className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-600 to-slate-500"
          style={{
            clipPath: 'polygon(0 100%, 0 80%, 30% 65%, 50% 75%, 70% 60%, 90% 70%, 100% 55%, 100% 100%)',
            transform: `translateX(${(mousePosition.x - 50) * 0.15}px)`
          }}
        />
      </div>

      {/* Wooden Hut */}
      <div 
        className="absolute bottom-20 left-1/3 w-16 h-12 bg-amber-900 transform -translate-x-1/2"
        style={{ transform: `translateX(${(mousePosition.x - 50) * 0.1}px) translateY(-50%)` }}
      >
        {/* Hut Body */}
        <div className="w-full h-8 bg-amber-800 rounded-sm" />
        {/* Roof */}
        <div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-6 border-transparent border-b-red-900"
        />
        {/* Chimney */}
        <div className="absolute -top-4 right-2 w-2 h-6 bg-gray-700" />
        
        {/* Smoke Animation */}
        <div className="absolute -top-8 right-1 w-4 h-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-300 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.sin(Date.now() * 0.001 + i) * 10}px`,
                bottom: `${i * 8}px`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Character Silhouette */}
      <div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        style={{ transform: `translateX(${(mousePosition.x - 50) * 0.2}px) translateY(-50%)` }}
      >
        {/* Character */}
        <div className="relative w-8 h-12 bg-black opacity-80">
          {/* Head */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
          {/* Body */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-black" />
          {/* Arms */}
          <div className="absolute top-4 left-0 w-1 h-4 bg-black transform rotate-12" />
          <div className="absolute top-4 right-0 w-1 h-4 bg-black transform -rotate-12" />
          {/* Legs */}
          <div className="absolute bottom-0 left-1 w-1 h-3 bg-black" />
          <div className="absolute bottom-0 right-1 w-1 h-3 bg-black" />
        </div>
        
        {/* Fire Pit */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-800 rounded-full" />
        
        {/* Fire Animation */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-1 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse"
              style={{
                height: `${8 + Math.sin(Date.now() * 0.01 + i) * 4}px`,
                left: `${i * 6}px`,
                animationDelay: `${i * 100}ms`,
                opacity: 0.8 + Math.sin(Date.now() * 0.005 + i) * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Fire Glow */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-400 rounded-full opacity-20 animate-pulse"
          style={{ filter: 'blur(8px)' }}
        />
      </div>

      {/* Foreground Grass */}
      <div className="absolute bottom-0 w-full h-24 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-green-800 to-green-600 opacity-60 animate-sway"
            style={{
              height: `${20 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `translateX(${(mousePosition.x - 50) * 0.3}px)`
            }}
          />
        ))}
      </div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Waking the Dawn...
          </h1>

          {/* Greeting */}
          <p className="text-xl md:text-2xl text-orange-200 mb-8 font-light">
            {getGreeting()}
          </p>

          {/* Progress Section */}
          <div className="w-80 max-w-sm mx-auto">
            {/* Current Phase */}
            <div className="mb-4">
              <p className="text-orange-200 text-lg animate-pulse">
                {phases[currentPhase]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between text-sm text-orange-300">
              <span>Loading Experience</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
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