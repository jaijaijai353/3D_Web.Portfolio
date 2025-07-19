import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Show text after brief delay
    const textTimer = setTimeout(() => setShowText(true), 800);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 overflow-hidden">
      {/* Rocket Spline Background */}
      <div className="absolute inset-0">
        <div className={`w-full h-full transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Spline 
            scene="https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode"
            onLoad={handleSplineLoad}
          />
        </div>
        
        {/* Loading fallback while Spline loads */}
        {!splineLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin" 
                   style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Center Content - Name with Animations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`text-center transition-all duration-2000 ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Animated Name */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 relative">
              {/* Letter by letter animation */}
              <span className="inline-block">
                {'JAI NARULA'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-letter-bounce ${
                      letter === ' ' ? 'w-4' : ''
                    }`}
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animationDuration: '1s'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </span>
              
              {/* Glowing effect behind text */}
              <div className="absolute inset-0 text-6xl md:text-8xl font-black text-blue-500/20 animate-text-glow blur-sm">
                JAI NARULA
              </div>
            </h1>
            
            {/* Subtitle with typewriter effect */}
            <div className="relative">
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wider animate-fade-in delay-2000">
                Data Analyst & Dashboard Designer
              </p>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-[width-expand_2s_ease-out_2s_forwards]" />
            </div>
          </div>

          {/* Animated Progress Section */}
          <div className={`transition-all duration-1000 delay-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span className="animate-pulse">Loading Portfolio</span>
                <span className="font-mono text-blue-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Loading Status with Icons */}
            <div className="text-center">
              <div className="flex justify-center space-x-3 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      progress > i * 20 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 scale-110' 
                        : 'bg-gray-600 scale-100'
                    }`}
                    style={{ 
                      animationDelay: `${i * 200}ms`,
                      animation: progress > i * 20 ? 'bounce 1s ease-in-out infinite' : 'none'
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 animate-pulse">
                {progress < 25 && "🚀 Launching experience..."}
                {progress >= 25 && progress < 50 && "⚡ Powering up systems..."}
                {progress >= 50 && progress < 75 && "📊 Loading analytics..."}
                {progress >= 75 && progress < 95 && "🎯 Finalizing dashboard..."}
                {progress >= 95 && "✨ Ready for takeoff!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Corner Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 pointer-events-none animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500/30 pointer-events-none animate-pulse delay-500" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-purple-500/30 pointer-events-none animate-pulse delay-1000" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 pointer-events-none animate-pulse delay-1500" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Ambient Light Rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-40 bg-gradient-to-b from-blue-400/40 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-40 bg-gradient-to-t from-purple-400/40 to-transparent animate-pulse delay-1000" />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-px w-40 bg-gradient-to-r from-cyan-400/40 to-transparent animate-pulse delay-500" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-px w-40 bg-gradient-to-l from-pink-400/40 to-transparent animate-pulse delay-1500" />
      </div>
    </div>
  );
};

export default LoadingScreen;