import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  loadingComponent?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  loadingComponent,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px'
}) => {
  const { elementRef, isLoaded, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
    </div>
  );

  return (
    <div ref={elementRef} className={className}>
      {isLoaded ? (
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {children}
        </div>
      ) : (
        loadingComponent || defaultLoadingComponent
      )}
    </div>
  );
};

export default LazySection;