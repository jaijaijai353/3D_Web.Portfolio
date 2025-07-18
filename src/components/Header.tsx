import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element && window.scrollY > 0) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    // Navigation functionality removed - sections are now part of single page flow
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Ensure body scroll is managed
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Clean up body overflow on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-500 animate-pulse group-hover:text-purple-500 transition-colors duration-500" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping group-hover:bg-purple-500/20 transition-colors duration-500" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                Jai Narula
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium group ${
                    activeSection === item.href.substring(1) ? 'text-blue-500 dark:text-blue-400' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
                    activeSection === item.href.substring(1) ? 'w-full' : ''
                  }`} />
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110 relative overflow-hidden"
                aria-label="Toggle menu"
              >
                <div className="relative z-10">
                  <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                    <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${isMenuOpen ? 'opacity-20' : 'opacity-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl transition-all duration-500 ease-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          {/* Menu Header */}
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Zap className="h-6 w-6 text-blue-500 animate-pulse" />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Navigation
                </span>
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>
          </div>

          {/* Menu Items */}
          <nav className="px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`group relative w-full text-left py-4 px-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:scale-105 hover:shadow-lg ${
                    activeSection === item.href.substring(1) 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.name}
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? 'bg-blue-500 scale-100'
                        : 'bg-gray-300 dark:bg-gray-600 scale-0 group-hover:scale-100 group-hover:bg-blue-500'
                    }`} />
                  </div>
                  
                  {/* Animated underline */}
                  <div className={`absolute bottom-2 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                    activeSection === item.href.substring(1) 
                      ? 'opacity-100 scale-x-100' 
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`} />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Data Analyst & Dashboard Designer
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;