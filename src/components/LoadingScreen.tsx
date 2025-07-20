import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Start name animation after a brief delay
    const nameTimer = setTimeout(() => setShowName(true), 500);
    
    // Start subtitle animation
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(subtitleTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className={`w-full h-full transition-opacity duration-1000 spline-optimized loading-spline-container ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
          style={{ 
            height: '200vh', 
            top: '-50vh',
            transform: 'scale(1.2)',
            transformOrigin: 'center center'
          }}>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: '100%',
              height: '100%',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Icon */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping" />
            <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40 animate-ping delay-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="h-10 w-10 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Animated Name */}
        <div className="mb-6 overflow-hidden">
          <h1 className={`text-6xl md:text-8xl font-bold transition-all duration-2000 ${
            showName 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}>
            <span className="inline-block">
              {'JAI'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-bounce-in"
                  style={{ 
                    animationDelay: `${showName ? index * 200 + 500 : 0}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="inline-block ml-4">
              {'NARULA'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-bounce-in"
                  style={{ 
                    animationDelay: `${showName ? (index + 3) * 200 + 800 : 0}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Animated Subtitle */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${
          showSubtitle 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            Data Analyst & Dashboard Designer
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4 animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading Portfolio</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse delay-1000" />
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse delay-500" />
        <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/20 to-transparent animate-pulse delay-1500" />
      </div>
    </div>
  );
};

export default LoadingScreen;