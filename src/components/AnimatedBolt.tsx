import React from 'react';
import { Zap } from 'lucide-react';

const AnimatedBolt: React.FC = () => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8 group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500" />
      <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-pulse delay-75 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="absolute inset-4 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full opacity-40 animate-pulse delay-150 group-hover:opacity-60 transition-opacity duration-500" />
      
      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Zap className="h-16 w-16 text-blue-500 animate-pulse group-hover:text-purple-500 transition-colors duration-500" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-float group-hover:bg-blue-300 group-hover:scale-125 transition-all duration-500" />
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-float delay-1000 group-hover:bg-purple-300 group-hover:scale-125 transition-all duration-500" />
      <div className="absolute top-4 -left-4 w-4 h-4 bg-blue-300 rounded-full animate-float delay-500 group-hover:bg-blue-200 group-hover:scale-125 transition-all duration-500" />
      <div className="absolute bottom-4 -right-4 w-3 h-3 bg-purple-300 rounded-full animate-float delay-1500 group-hover:bg-purple-200 group-hover:scale-125 transition-all duration-500" />
      
      {/* Additional animated rings */}
      <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-2 border border-purple-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
    </div>
  );
};

export default AnimatedBolt;