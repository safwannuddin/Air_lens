import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Satellite, Users, Award, Globe, TrendingUp, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Research Scientist',
      expertise: 'Atmospheric Chemistry, Machine Learning',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff'
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Principal Investigator',
      expertise: 'Satellite Remote Sensing, Environmental Monitoring',
      image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=10b981&color=fff'
    },
    {
      name: 'Dr. Emma Williams',
      role: 'Data Scientist',
      expertise: 'Statistical Modeling, Spatial Analysis',
      image: 'https://ui-avatars.com/api/?name=Emma+Williams&background=f59e0b&color=fff'
    },
    {
      name: 'James Liu',
      role: 'Software Engineer',
      expertise: 'Platform Development, Cloud Computing',
      image: 'https://ui-avatars.com/api/?name=James+Liu&background=8b5cf6&color=fff'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Research Excellence',
      description: '50+ peer-reviewed publications in top-tier journals'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Platform used by researchers in 25+ countries worldwide'
    },
    {
      icon: TrendingUp,
      title: 'High Accuracy',
      description: '96% average accuracy in satellite data downscaling'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: '500+ active researchers using our platform'
    }
  ];

  const partners = [
    'NASA Earth Science Division',
    'European Space Agency (ESA)',
    'NOAA Satellite Division',
    'University Research Consortium',
    'Environmental Protection Agency',
    'Max Planck Institute'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About AirLens AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to advancing atmospheric science through innovative satellite data processing 
              and making high-quality environmental data accessible to researchers worldwide.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 bg-white rounded-2xl shadow-xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To revolutionize atmospheric monitoring by providing scientists with cutting-edge tools 
                for processing and analyzing satellite NO₂ data. We bridge the gap between raw satellite 
                observations and actionable environmental insights.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through advanced machine learning algorithms and rigorous validation processes, we enable 
                researchers to understand air quality patterns at unprecedented spatial and temporal resolutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-8 text-center">
              <Satellite className="w-24 h-24 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art algorithms transforming satellite data into high-resolution insights
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{achievement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-105">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Focus */}
        <div className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Research Focus Areas</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our interdisciplinary approach combines atmospheric science, machine learning, and remote sensing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Satellite Data Processing</h3>
              <p className="text-blue-100">Advanced algorithms for processing TROPOMI, OMI, and Sentinel-5P data</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
              <p className="text-blue-100">Neural networks and ensemble methods for spatial downscaling</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Environmental Monitoring</h3>
              <p className="text-blue-100">Air quality assessment and pollution source identification</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Partners</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-800 text-center">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you're a researcher, student, or environmental professional, we invite you to be part of 
            our community working towards better air quality monitoring and environmental protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/upload')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Start Using Platform
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;