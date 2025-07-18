import React from 'react';
import { GraduationCap, Award, Star, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  const education = {
    degree: 'Bachelor of Business Administration (BBA)',
    specialization: 'Business Analytics',
    university: 'SRM University',
    location: 'Sonepat, India',
    duration: '2023 - 2026',
    grade: 'First Class',
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-600'
  };

  const additionalEducation = {
    course: 'French Language (B1 Level)',
    institution: 'Alliance Française de Delhi',
    location: 'Delhi, India',
    duration: '2024 - 2026',
    icon: Star,
    color: 'from-red-500 to-blue-600'
  };

  const certifications = [
    {
      name: 'Foundation of Data Science',
      issuer: 'Google',
      date: '2023',
      icon: Award,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Microsoft Power BI Data Analyst',
      issuer: 'Microsoft',
      date: '2023',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'IBM Data Science Professional',
      issuer: 'IBM',
      date: '2023',
      icon: Award,
      color: 'from-blue-700 to-blue-900'
    },
    {
      name: 'Leadership Skills',
      issuer: 'IIM Ahmedabad',
      date: '2023',
      icon: Star,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Google Student Developer Club',
      issuer: 'SRM University & Google',
      date: '2024',
      icon: Award,
      color: 'from-red-500 to-yellow-500'
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Education & Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Academic foundation and professional certifications in data analytics and business intelligence
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-16 space-y-8">
            {/* Primary Education */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${education.color} rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <education.icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {education.degree}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg group-hover:scale-105 transition-transform duration-300">
                    {education.specialization}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <GraduationCap className="h-5 w-5 mr-3 text-blue-500" />
                    <span className="font-semibold">{education.university}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <Calendar className="h-5 w-5 mr-3 text-purple-500" />
                    <span>{education.duration}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <Star className="h-5 w-5 mr-3 text-yellow-500" />
                    <span>{education.grade}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <svg className="h-5 w-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Education - French Language */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-red-400/10 to-blue-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${additionalEducation.color} rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <additionalEducation.icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    {additionalEducation.course}
                  </h3>
                  <p className="text-red-600 dark:text-red-400 font-semibold text-lg group-hover:scale-105 transition-transform duration-300">
                    Language Certification
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <GraduationCap className="h-5 w-5 mr-3 text-red-500" />
                    <span className="font-semibold">{additionalEducation.institution}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                    <span>{additionalEducation.duration}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <Star className="h-5 w-5 mr-3 text-yellow-500" />
                    <span>B1 Level Proficiency</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    <svg className="h-5 w-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{additionalEducation.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${cert.color} rounded-lg flex items-center justify-center mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg relative z-10`}>
                      <cert.icon className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 relative z-10 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${cert.color} rounded-full w-full group-hover:animate-pulse transition-all duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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

export default Education;