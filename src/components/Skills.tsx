import React from 'react';
import { Database, BarChart3, FileSpreadsheet, Code, Brain, Zap } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

const Skills: React.FC = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: skillsRef, visibleItems, loadedItems } = useStaggeredAnimation(6, 150);

  const skills = [
    { name: 'SQL', level: 90, icon: Database, color: 'from-blue-500 to-blue-600' },
    { name: 'Power BI', level: 85, icon: BarChart3, color: 'from-yellow-500 to-orange-500' },
    { name: 'Excel', level: 88, icon: FileSpreadsheet, color: 'from-green-500 to-green-600' },
    { name: 'Python', level: 82, icon: Code, color: 'from-purple-500 to-purple-600' },
    { name: 'Data Analysis', level: 92, icon: Brain, color: 'from-pink-500 to-rose-500' },
    { name: 'Dashboard Design', level: 87, icon: Zap, color: 'from-indigo-500 to-purple-600' },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef} className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Proficient in modern data analysis tools and technologies with hands-on experience in building scalable solutions
            </p>
          </div>

          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group relative p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                  loadedItems.includes(index) ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-3'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg animate-bounce-in`}>
                      <skill.icon className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">Proficiency</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden relative">
                    <div
                      className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out group-hover:animate-pulse relative`}
                      style={{ 
                        width: visibleItems.includes(index) ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 150 + 500}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;