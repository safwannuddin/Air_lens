import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin, Twitter, BookOpen, Award, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ResearchTeamPage = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Lead Research Scientist & Platform Director',
      department: 'Atmospheric Chemistry',
      expertise: ['Machine Learning in Atmospheric Science', 'Satellite Data Processing', 'Air Quality Modeling'],
      education: 'PhD in Atmospheric Physics, MIT (2015)',
      experience: '8+ years in satellite remote sensing',
      publications: 45,
      hIndex: 23,
      email: 'sarah.chen@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff&size=128',
      bio: 'Dr. Chen leads our research efforts in developing advanced machine learning algorithms for satellite NO₂ downscaling. Her work has been instrumental in achieving 96% accuracy in atmospheric data processing.',
      achievements: ['Best Paper Award - Remote Sensing Society (2023)', 'Young Scientist Award - International Atmospheric Sciences (2021)'],
      location: 'Boston, MA'
    },
    {
      id: 2,
      name: 'Prof. Michael Rodriguez',
      role: 'Principal Investigator',
      department: 'Environmental Remote Sensing',
      expertise: ['TROPOMI Data Analysis', 'Environmental Monitoring', 'Climate Change Research'],
      education: 'PhD in Remote Sensing, Stanford University (2008)',
      experience: '15+ years in environmental research',
      publications: 89,
      hIndex: 34,
      email: 'michael.rodriguez@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=10b981&color=fff&size=128',
      bio: 'Prof. Rodriguez brings extensive experience in satellite remote sensing and environmental monitoring. He has been working with satellite data since the early days of OMI and SCIAMACHY missions.',
      achievements: ['Fellow - American Geophysical Union (2022)', 'Distinguished Researcher Award - NASA Earth Science (2020)'],
      location: 'Palo Alto, CA'
    },
    {
      id: 3,
      name: 'Dr. Emma Williams',
      role: 'Senior Data Scientist',
      department: 'Statistical Modeling',
      expertise: ['Spatial Statistics', 'Uncertainty Quantification', 'Validation Methodologies'],
      education: 'PhD in Statistics, University of Cambridge (2017)',
      experience: '6+ years in environmental data analysis',
      publications: 32,
      hIndex: 18,
      email: 'emma.williams@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=Emma+Williams&background=f59e0b&color=fff&size=128',
      bio: 'Dr. Williams specializes in developing robust statistical methods for validation and uncertainty assessment of downscaled satellite data. Her work ensures the reliability of our processing algorithms.',
      achievements: ['Excellence in Statistics Award - Royal Statistical Society (2023)', 'Rising Star Award - Environmental Statistics (2022)'],
      location: 'Cambridge, UK'
    },
    {
      id: 4,
      name: 'James Liu',
      role: 'Lead Software Architect',
      department: 'Platform Development',
      expertise: ['Cloud Computing', 'Scalable Systems', 'API Development'],
      education: 'MS in Computer Science, Carnegie Mellon (2018)',
      experience: '7+ years in scientific software development',
      publications: 12,
      hIndex: 8,
      email: 'james.liu@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=James+Liu&background=8b5cf6&color=fff&size=128',
      bio: 'James architected our entire platform infrastructure, enabling researchers worldwide to process satellite data efficiently. His scalable solutions handle petabytes of atmospheric data.',
      achievements: ['Innovation Award - Scientific Computing Society (2023)', 'Open Source Contributor Award - Python Software Foundation (2022)'],
      location: 'Pittsburgh, PA'
    },
    {
      id: 5,
      name: 'Dr. Maria Santos',
      role: 'Atmospheric Physicist',
      department: 'Atmospheric Modeling',
      expertise: ['Atmospheric Chemistry', 'Transport Modeling', 'Emission Inventories'],
      education: 'PhD in Atmospheric Physics, Max Planck Institute (2019)',
      experience: '5+ years in atmospheric modeling',
      publications: 28,
      hIndex: 15,
      email: 'maria.santos@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=Maria+Santos&background=ef4444&color=fff&size=128',
      bio: 'Dr. Santos contributes deep expertise in atmospheric physics and chemistry, ensuring our algorithms are grounded in solid scientific understanding of NO₂ behavior in the atmosphere.',
      achievements: ['Early Career Researcher Award - European Geosciences Union (2023)', 'Best Thesis Award - Max Planck Institute (2019)'],
      location: 'Mainz, Germany'
    },
    {
      id: 6,
      name: 'Dr. David Park',
      role: 'Validation Specialist',
      department: 'Ground Truth Analysis',
      expertise: ['Ground-based Measurements', 'Quality Assurance', 'Field Campaigns'],
      education: 'PhD in Environmental Engineering, Seoul National University (2016)',
      experience: '8+ years in air quality monitoring',
      publications: 41,
      hIndex: 21,
      email: 'david.park@satelliteno2.org',
      image: 'https://ui-avatars.com/api/?name=David+Park&background=06b6d4&color=fff&size=128',
      bio: 'Dr. Park leads our validation efforts, coordinating with ground monitoring networks worldwide to ensure our satellite-derived data meets the highest quality standards.',
      achievements: ['Outstanding Contribution Award - World Meteorological Organization (2022)', 'Excellence in Air Quality Research - Korean Environmental Society (2021)'],
      location: 'Seoul, South Korea'
    }
  ];

  const researchAreas = [
    {
      title: 'Machine Learning Algorithms',
      description: 'Advanced AI methods for satellite data processing',
      teamMembers: ['Dr. Sarah Chen', 'James Liu']
    },
    {
      title: 'Atmospheric Physics',
      description: 'Understanding NO₂ behavior and transport in the atmosphere',
      teamMembers: ['Dr. Maria Santos', 'Prof. Michael Rodriguez']
    },
    {
      title: 'Statistical Validation',
      description: 'Rigorous validation and uncertainty quantification methods',
      teamMembers: ['Dr. Emma Williams', 'Dr. David Park']
    },
    {
      title: 'Platform Development',
      description: 'Scalable infrastructure for global research community',
      teamMembers: ['James Liu', 'Dr. Sarah Chen']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 lg:mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Meet Our Research Team
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              World-class scientists and engineers working together to advance atmospheric monitoring 
              and environmental research through cutting-edge satellite data processing.
            </p>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8 lg:mb-12">Research Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{area.description}</p>
                <div className="space-y-1">
                  {area.teamMembers.map((member, idx) => (
                    <p key={idx} className="text-xs text-blue-600 font-medium">{member}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="text-center mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm lg:text-base mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.department}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Publications:</span>
                  <span className="font-bold text-gray-900">{member.publications}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">h-index:</span>
                  <span className="font-bold text-gray-900">{member.hIndex}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center space-x-3">
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Collaborations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
            Global Collaborations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">50+ Institutions</h3>
              <p className="text-gray-600 text-sm">Collaborating with leading research institutions worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">200+ Publications</h3>
              <p className="text-gray-600 text-sm">Peer-reviewed research papers and conference proceedings</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">25 Countries</h3>
              <p className="text-gray-600 text-sm">International research network spanning all continents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <p className="text-blue-600 font-medium">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Biography</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-gray-600">{selectedMember.education}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-gray-600">{selectedMember.experience}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Achievements</h3>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <Award className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">Contact</span>
                    </button>
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm">Publications</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{selectedMember.publications} publications • h-index: {selectedMember.hIndex}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ResearchTeamPage;