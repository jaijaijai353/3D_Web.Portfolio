import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const phases = [
      { text: 'Initializing Systems...', duration: 2000 },
      { text: 'Loading Navigation...', duration: 1800 },
      { text: 'Preparing Interface...', duration: 1500 },
      { text: 'Finalizing Setup...', duration: 1200 }
    ];

    let currentPhase = 0;
    let progressValue = 0;
    
    const phaseInterval = setInterval(() => {
      if (currentPhase < phases.length - 1) {
        currentPhase++;
        setPhase(currentPhase);
      }
    }, 1500);

    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      progressValue += 1.2;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(progressInterval);
        clearInterval(phaseInterval);
        clearTimeout(skipTimer);
        
        // Complete loading after a brief delay
        setTimeout(() => {
          onLoadingComplete();
        }, 1500);
      }
    }, 60);

    return () => {
      clearInterval(phaseInterval);
      clearTimeout(skipTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const skipLoading = () => {
    onLoadingComplete();
  };

  const phases = [
    { text: 'Initializing Systems...', duration: 2000 },
    { text: 'Loading Navigation...', duration: 1800 },
    { text: 'Preparing Interface...', duration: 1500 },
    { text: 'Finalizing Setup...', duration: 1200 },
    { text: 'Mission Ready - Launching...', duration: 800 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float-space"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-scan-horizontal" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-scan-vertical" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Section */}
        <div className="mb-12 relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-2 border-2 border-purple-500/30 rounded-full animate-spin-reverse" />
            <div className="absolute inset-4 border-2 border-cyan-500/30 rounded-full animate-spin-slow" />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="h-12 w-12 text-blue-400 animate-pulse" />
            </div>
            
            {/* Pulsing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full animate-ping" />
          </div>
        </div>

        {/* Animated Name */}
        <div className="mb-12">
          <div className="text-6xl md:text-8xl font-bold mb-6 font-mono tracking-wider">
            {'JAI NARULA'.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ${
                  char === ' ' ? 'w-4' : 'animate-bounce-in bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          
          <div className="text-xl md:text-2xl text-gray-300 font-light tracking-wide mb-4">
            Data Analyst & Dashboard Designer
          </div>
          
          <div className="w-48 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto animate-pulse" />
        </div>

        {/* Phase Text */}
        <div className="mb-8 h-8 transition-all duration-500">
          <p className="text-xl text-blue-300 font-mono tracking-wide animate-fade-in-space">
            {phases[phase]?.text || 'Mission Ready - Launching...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-96 max-w-sm mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-3 font-mono">
            <span className={`transition-all duration-500 ${isComplete ? 'text-green-400' : ''}`}>
              {isComplete ? 'MISSION COMPLETE ✓' : 'MISSION PROGRESS'}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="relative w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-blue-500/30">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out relative ${
                isComplete 
                  ? 'bg-gradient-to-r from-green-400 via-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500'
              }`}
              style={{ width: `${progress}%` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent ${progress < 100 ? 'animate-shimmer-space' : ''}`} />
            </div>
            <div className={`absolute right-0 top-0 w-1 h-full opacity-75 animate-pulse transition-colors duration-500 ${
              isComplete ? 'bg-green-400' : 'bg-cyan-400'
            }`} />
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-xs font-mono">
          <div className="flex items-center justify-center space-x-2 bg-slate-800/30 rounded-lg p-2 border border-blue-500/20">
            <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${
              progress > 25 ? 'bg-green-400' : 'bg-yellow-400'
            }`} />
            <span className={`transition-colors duration-500 ${progress > 25 ? 'text-green-400' : 'text-yellow-400'}`}>SYS</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-slate-800/30 rounded-lg p-2 border border-purple-500/20">
            <div className={`w-2 h-2 rounded-full animate-pulse delay-500 transition-colors duration-500 ${
              progress > 50 ? 'bg-blue-400' : 'bg-yellow-400'
            }`} />
            <span className={`transition-colors duration-500 ${progress > 50 ? 'text-blue-400' : 'text-yellow-400'}`}>NAV</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-slate-800/30 rounded-lg p-2 border border-cyan-500/20">
            <div className={`w-2 h-2 rounded-full animate-pulse delay-1000 transition-colors duration-500 ${
              progress > 75 ? 'bg-cyan-400' : 'bg-yellow-400'
            }`} />
            <span className={`transition-colors duration-500 ${progress > 75 ? 'text-cyan-400' : 'text-yellow-400'}`}>COM</span>
          </div>
        </div>

        {/* Loading Indicators */}
        <div className={`flex justify-center space-x-3 mb-8 transition-all duration-500 ${
          isComplete ? 'opacity-50' : 'opacity-100'
        }`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full animate-pulse-sequence transition-colors duration-500 ${
                isComplete ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ animationDelay: `${i * 300}ms` }}
            />
          ))}
        </div>

        {/* Completion Message */}
        {progress >= 100 && (
          <div className="animate-fade-in-space text-center">
            <p className="text-green-400 font-mono text-lg mb-2">✓ ALL SYSTEMS OPERATIONAL</p>
            <p className="text-gray-400 font-mono text-sm">Initiating portfolio interface...</p>
          </div>
        )}
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={skipLoading}
          className="absolute bottom-8 right-8 px-4 py-2 bg-slate-800/50 text-gray-400 rounded-lg border border-gray-600/30 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 text-sm font-mono backdrop-blur-sm"
        >
          SKIP SEQUENCE
        </button>
      )}

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-blue-500/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-blue-500/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-blue-500/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-blue-500/30" />
    </div>
  );
};

export default LoadingScreen;