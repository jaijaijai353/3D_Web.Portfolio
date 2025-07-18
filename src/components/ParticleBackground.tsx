import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent dark:from-blue-950/30 dark:via-purple-950/20 dark:to-transparent" />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-float hover:scale-150 transition-transform duration-300" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/60 rounded-full animate-float delay-1000 hover:scale-150 transition-transform duration-300" />
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-blue-300/60 rounded-full animate-float delay-2000 hover:scale-150 transition-transform duration-300" />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-300/60 rounded-full animate-float delay-3000 hover:scale-150 transition-transform duration-300" />
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-blue-500/60 rounded-full animate-float delay-4000 hover:scale-150 transition-transform duration-300" />
      <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-purple-500/60 rounded-full animate-float delay-5000 hover:scale-150 transition-transform duration-300" />
      
      {/* Additional animated particles */}
      <div className="absolute top-1/5 right-1/5 w-1 h-1 bg-blue-600/40 rounded-full animate-float delay-6000" />
      <div className="absolute bottom-1/5 left-1/5 w-2 h-2 bg-purple-600/40 rounded-full animate-float delay-7000" />
      <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-blue-200/50 rounded-full animate-float delay-8000" />
      
      {/* Lightning effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/2 w-px h-16 bg-gradient-to-b from-blue-400/40 to-transparent animate-pulse hover:from-blue-400/80 transition-colors duration-300" />
        <div className="absolute top-1/2 right-1/4 w-px h-12 bg-gradient-to-b from-purple-400/40 to-transparent animate-pulse delay-1000 hover:from-purple-400/80 transition-colors duration-300" />
        <div className="absolute bottom-1/3 left-1/4 w-px h-20 bg-gradient-to-b from-blue-300/40 to-transparent animate-pulse delay-2000 hover:from-blue-300/80 transition-colors duration-300" />
        <div className="absolute top-1/6 right-1/3 w-px h-8 bg-gradient-to-b from-purple-300/40 to-transparent animate-pulse delay-3000" />
        <div className="absolute bottom-1/6 right-1/6 w-px h-14 bg-gradient-to-b from-blue-500/40 to-transparent animate-pulse delay-4000" />
      </div>
      
      {/* Animated circuit patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-2/3 right-0 w-24 h-px bg-gradient-to-l from-transparent via-purple-400/50 to-transparent animate-pulse delay-2000" />
        <div className="absolute left-1/4 top-0 h-20 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent animate-pulse delay-3000" />
      </div>
    </div>
  );
};

export default ParticleBackground;