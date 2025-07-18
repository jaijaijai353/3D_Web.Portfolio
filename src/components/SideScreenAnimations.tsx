import React, { useEffect, useState } from 'react';
import { Zap, Code, Database, BarChart3, Brain, Star, Sparkles, Activity } from 'lucide-react';

const SideScreenAnimations: React.FC = () => {
  const [leftIcons, setLeftIcons] = useState<Array<{ id: number; icon: any; delay: number; color: string }>>([]);
  const [rightIcons, setRightIcons] = useState<Array<{ id: number; icon: any; delay: number; color: string }>>([]);

  const iconSet = [
    { icon: Zap, color: 'text-blue-500' },
    { icon: Code, color: 'text-purple-500' },
    { icon: Database, color: 'text-green-500' },
    { icon: BarChart3, color: 'text-yellow-500' },
    { icon: Brain, color: 'text-pink-500' },
    { icon: Star, color: 'text-indigo-500' },
    { icon: Sparkles, color: 'text-cyan-500' },
    { icon: Activity, color: 'text-red-500' },
  ];

  useEffect(() => {
    const generateIcon = (side: 'left' | 'right') => {
      const randomIcon = iconSet[Math.floor(Math.random() * iconSet.length)];
      const newIcon = {
        id: Date.now() + Math.random(),
        icon: randomIcon.icon,
        delay: Math.random() * 2000,
        color: randomIcon.color,
      };

      if (side === 'left') {
        setLeftIcons(prev => [...prev, newIcon]);
        setTimeout(() => {
          setLeftIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
        }, 8000);
      } else {
        setRightIcons(prev => [...prev, newIcon]);
        setTimeout(() => {
          setRightIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
        }, 8000);
      }
    };

    const leftInterval = setInterval(() => generateIcon('left'), 3000);
    const rightInterval = setInterval(() => generateIcon('right'), 4000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <>
      {/* Left Side Animations */}
      <div className="fixed left-0 top-0 h-full w-20 pointer-events-none z-10 overflow-hidden">
        {leftIcons.map((iconData) => (
          <div
            key={iconData.id}
            className={`absolute left-4 animate-float-up ${iconData.color} opacity-60 hover:opacity-100 transition-opacity duration-300`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${iconData.delay}ms`,
              animationDuration: '8s',
            }}
          >
            <iconData.icon className="h-6 w-6 animate-pulse hover:scale-125 transition-transform duration-300" />
          </div>
        ))}
        
        {/* Static decorative elements */}
        <div className="absolute left-2 top-1/4 w-1 h-16 bg-gradient-to-b from-blue-500/30 to-transparent animate-pulse" />
        <div className="absolute left-2 top-1/2 w-1 h-12 bg-gradient-to-b from-purple-500/30 to-transparent animate-pulse delay-1000" />
        <div className="absolute left-2 top-3/4 w-1 h-20 bg-gradient-to-b from-blue-400/30 to-transparent animate-pulse delay-2000" />
      </div>

      {/* Right Side Animations */}
      <div className="fixed right-0 top-0 h-full w-20 pointer-events-none z-10 overflow-hidden">
        {rightIcons.map((iconData) => (
          <div
            key={iconData.id}
            className={`absolute right-4 animate-float-down ${iconData.color} opacity-60 hover:opacity-100 transition-opacity duration-300`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${iconData.delay}ms`,
              animationDuration: '8s',
            }}
          >
            <iconData.icon className="h-6 w-6 animate-pulse hover:scale-125 transition-transform duration-300" />
          </div>
        ))}
        
        {/* Static decorative elements */}
        <div className="absolute right-2 top-1/3 w-1 h-14 bg-gradient-to-b from-purple-500/30 to-transparent animate-pulse delay-500" />
        <div className="absolute right-2 top-1/2 w-1 h-18 bg-gradient-to-b from-blue-500/30 to-transparent animate-pulse delay-1500" />
        <div className="absolute right-2 top-2/3 w-1 h-10 bg-gradient-to-b from-purple-400/30 to-transparent animate-pulse delay-2500" />
      </div>

      {/* Corner Decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500/30 pointer-events-none z-10 animate-pulse" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/30 pointer-events-none z-10 animate-pulse delay-1000" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500/30 pointer-events-none z-10 animate-pulse delay-2000" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500/30 pointer-events-none z-10 animate-pulse delay-3000" />
    </>
  );
};

export default SideScreenAnimations;