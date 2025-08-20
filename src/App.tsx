import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ScrollAnimations from './components/ScrollAnimations';
import LazySection from './components/LazySection';
import SkeletonLoader from './components/SkeletonLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(true);

  useEffect(() => {
    // Optimize initial load
    const optimizeLoad = () => {
      // Preload Spline scene
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://prod.spline.design/uDidnMGWsjyYajl5/scene.splinecode';
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      // Optimize rendering
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setSplineLoaded(true);
        });
      } else {
        setTimeout(() => setSplineLoaded(true), 100);
      }
    };
    
    optimizeLoad();
  }, []);

  const handleLoadingComplete = (forceComplete = false) => {
    // Only proceed if loading is actually complete or forced
    if (forceComplete || loadingComplete) {
      setIsLoading(false);
    }
  };

  const handleLoadingProgress = (isComplete: boolean) => {
    setLoadingComplete(isComplete);
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          onProgressUpdate={handleLoadingProgress}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div
        className="min-h-screen bg-white dark:bg-slate-900 transition-all duration-1000 relative opacity-100"
      >
        <ScrollAnimations />
        <Header />

        <main className="relative z-10 scroll-smooth">
          <section id="hero">
            <Hero splineLoaded={splineLoaded} />
          </section>

          <section id="about">
            <LazySection loadingComponent={<SkeletonLoader type="text" count={3} />}>
              <About />
            </LazySection>
          </section>

          <section id="skills">
            <LazySection
              loadingComponent={
                <div className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <SkeletonLoader type="card" count={6} />
                    </div>
                  </div>
                </div>
              }
            >
              <Skills />
            </LazySection>
          </section>

          <section id="experience">
            <LazySection
              loadingComponent={
                <div className="py-20 bg-gray-50 dark:bg-slate-800">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">
                      <SkeletonLoader type="timeline" count={2} />
                    </div>
                  </div>
                </div>
              }
            >
              <Experience />
            </LazySection>
          </section>

          <section id="projects">
            <LazySection
              loadingComponent={
                <div className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <SkeletonLoader type="image" count={3} />
                    </div>
                  </div>
                </div>
              }
            >
              <Projects />
            </LazySection>
          </section>

          <section id="education">
            <LazySection
              loadingComponent={
                <div className="py-20 bg-gray-50 dark:bg-slate-800">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8">
                      <SkeletonLoader type="timeline" count={1} />
                      <div className="grid md:grid-cols-2 gap-6">
                        <SkeletonLoader type="card" count={4} />
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Education />
            </LazySection>
          </section>

          <section id="contact">
            <LazySection
              loadingComponent={
                <div className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                      <div className="grid lg:grid-cols-2 gap-12">
                        <SkeletonLoader type="text" count={4} />
                        <SkeletonLoader type="card" count={1} />
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Contact />
            </LazySection>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
