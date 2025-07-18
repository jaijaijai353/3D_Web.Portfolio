import React from 'react';
import { BarChart3, TrendingUp, Database, PieChart } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: statsRef, visibleItems, loadedItems } = useStaggeredAnimation(4, 200);

  const stats = [
    { icon: BarChart3, label: 'Dashboards Created', value: '15+' },
    { icon: TrendingUp, label: 'Efficiency Improved', value: '25%' },
    { icon: Database, label: 'Data Projects', value: '20+' },
    { icon: PieChart, label: 'Years Experience', value: '2+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef} className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={contentRef} className={`space-y-6 transition-all duration-1000 delay-300 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-8">
                  Data Analyst with expertise in <span className="font-semibold text-blue-600 dark:text-blue-400">SQL</span>, 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> Excel</span>, 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> Power BI</span>, and 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> Python</span> for data modeling and visualization.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-600 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-8">
                  Designed dashboards that improved reporting efficiency by <span className="font-semibold text-purple-600 dark:text-purple-400">25%</span> and 
                  reduced manual data processing time significantly.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-8">
                  Passionate about transforming complex data into actionable insights through innovative visualization techniques 
                  and strategic business intelligence solutions.
                </p>
              </div>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                    loadedItems.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-1000 ${
                      visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`} style={{ transitionDelay: `${index * 200 + 300}ms` }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;