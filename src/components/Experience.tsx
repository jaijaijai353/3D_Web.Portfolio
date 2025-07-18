import React from 'react';
import { Calendar, MapPin, Building, TrendingUp } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: 'Cognizen Innovation',
      position: 'Marketing & Finance Intern',
      location: 'Ghaziabad, India',
      duration: 'June 2023 - August 2023',
      description: [
        'Analyzed marketing campaign performance data using Excel and Power BI',
        'Created automated financial reporting dashboards',
        'Improved data processing efficiency by 30% through process optimization',
        'Collaborated with cross-functional teams to deliver actionable insights'
      ],
      logo: Building,
      color: 'from-blue-500 to-blue-600'
    },
    {
      company: 'Deloitte',
      position: 'Data Analyst Simulation (Virtual Internship)',
      location: 'Remote',
      duration: 'March 2023 - May 2023',
      description: [
        'Completed comprehensive data analysis projects using Python and SQL',
        'Developed interactive dashboards for client presentations',
        'Performed statistical analysis and data visualization',
        'Delivered insights that influenced strategic business decisions'
      ],
      logo: TrendingUp,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional journey showcasing hands-on experience in data analysis and business intelligence
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-slate-800 hidden md:block" />

                  <div className="w-full md:ml-16">
                    <div className="bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group-hover:scale-105">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="flex items-center mb-4 lg:mb-0">
                          <div className={`w-12 h-12 bg-gradient-to-r ${exp.color} rounded-lg flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300`}>
                            <exp.logo className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col lg:items-end space-y-2">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">{exp.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.description.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start text-gray-600 dark:text-gray-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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

export default Experience;