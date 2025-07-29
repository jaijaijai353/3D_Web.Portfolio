import React from 'react';
import { ExternalLink, BarChart3, PlayCircle, Database } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Blinkit Sales Dashboard',
      description: 'Interactive Power BI dashboard analyzing Blinkit sales trends, customer segmentation, and revenue forecasting with real-time data visualization.',
      tech: ['Power BI', 'SQL', 'DAX', 'Excel'],
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://github.com/jaijaijai353/Blinkit-Sales-Dashboard'
    },
    {
      title: 'Netflix Data Analysis',
      description: 'Comprehensive EDA of Netflix catalog using Python, analyzing content trends, ratings distribution, and viewer preferences.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      icon: PlayCircle,
      color: 'from-red-500 to-red-600',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Inventory Management System',
      description: 'SQL-based inventory tracking system with automated reporting, stock level monitoring, and supplier performance analysis.',
      tech: ['SQL', 'MySQL', 'Python', 'Tableau'],
      icon: Database,
      color: 'from-green-500 to-green-600',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing data analysis projects that demonstrate technical expertise and business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none z-0" />

                {/* Image Section */}
                <div className="relative overflow-hidden z-10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center shadow-lg animate-bounce-in`}>
                      <project.icon className="h-6 w-6 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 group-hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <div className="flex">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-glow z-20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View Project</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;


