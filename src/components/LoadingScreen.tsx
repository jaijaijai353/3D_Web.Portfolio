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
    const textTimer = setTimeout(() => setShowText(true), 1000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 1000);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

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
      {/* Ambient Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main 3D Scene Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Spline 3D Model - Guy on Staircase */}
        <div className="relative w-full h-full max-w-4xl max-h-screen">
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

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
          {/* Top Section - Name and Title */}
          <div className={`text-center transition-all duration-1500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                JAI NARULA
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide">
              Data Analyst & Dashboard Designer
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4 animate-pulse" />
          </div>

          {/* Bottom Section - Progress and Loading Info */}
          <div className={`transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>Loading Portfolio</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>

            {/* Loading Status */}
            <div className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 300}ms` }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                {progress < 30 && "Initializing 3D environment..."}
                {progress >= 30 && progress < 60 && "Loading interactive elements..."}
                {progress >= 60 && progress < 90 && "Preparing portfolio content..."}
                {progress >= 90 && "Almost ready!"}
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Corner Decorations */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-blue-500/20 pointer-events-none animate-pulse" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-purple-500/20 pointer-events-none animate-pulse delay-500" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-purple-500/20 pointer-events-none animate-pulse delay-1000" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-blue-500/20 pointer-events-none animate-pulse delay-1500" />
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-blue-400/30 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-t from-purple-400/30 to-transparent animate-pulse delay-1000" />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-px w-32 bg-gradient-to-r from-cyan-400/30 to-transparent animate-pulse delay-500" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-px w-32 bg-gradient-to-l from-pink-400/30 to-transparent animate-pulse delay-1500" />
      </div>
    </div>
  );
};

export default LoadingScreen;