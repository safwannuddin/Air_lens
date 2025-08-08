import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Building, Award, Users, ExternalLink, MapPin, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PartnershipsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const partnerships = [
    {
      id: 1,
      name: 'NASA Earth Science Division',
      category: 'government',
      type: 'Data Provider & Research Collaboration',
      location: 'Washington, D.C., USA',
      established: '2021',
      logo: 'https://ui-avatars.com/api/?name=NASA&background=1e3a8a&color=fff&size=80',
      description: 'Strategic partnership providing access to satellite data archives and joint research initiatives in atmospheric monitoring.',
      projects: ['TROPOMI Data Validation', 'OMI Successor Mission Planning', 'Earth System Data Records'],
      impact: 'Access to 20+ years of satellite atmospheric data',
      website: 'https://science.nasa.gov/earth-science',
      featured: true
    },
    {
      id: 2,
      name: 'European Space Agency (ESA)',
      category: 'government',
      type: 'Satellite Data Partnership',
      location: 'Paris, France',
      established: '2020',
      logo: 'https://ui-avatars.com/api/?name=ESA&background=0f4c75&color=fff&size=80',
      description: 'Collaboration on Sentinel-5P TROPOMI data processing and algorithm development for operational air quality monitoring.',
      projects: ['Sentinel-5P Cal/Val', 'Copernicus Atmosphere Services', 'Air Quality Forecasting'],
      impact: 'Real-time access to European satellite atmospheric data',
      website: 'https://www.esa.int',
      featured: true
    },
    {
      id: 3,
      name: 'Max Planck Institute for Chemistry',
      category: 'academic',
      type: 'Research Collaboration',
      location: 'Mainz, Germany',
      established: '2019',
      logo: 'https://ui-avatars.com/api/?name=MPI&background=8b2635&color=fff&size=80',
      description: 'Joint research on atmospheric chemistry modeling and satellite data validation using ground-based measurements.',
      projects: ['Atmospheric Chemistry Modeling', 'Ground Truth Validation', 'PhD Exchange Program'],
      impact: 'Enhanced validation capabilities and scientific expertise',
      website: 'https://www.mpic.de',
      featured: true
    },
    {
      id: 4,
      name: 'NOAA Satellite Division',
      category: 'government',
      type: 'Operational Partnership',
      location: 'Silver Spring, MD, USA',
      established: '2022',
      logo: 'https://ui-avatars.com/api/?name=NOAA&background=2563eb&color=fff&size=80',
      description: 'Collaboration on operational air quality forecasting using downscaled satellite NO₂ data for public health applications.',
      projects: ['Air Quality Forecasting', 'Public Health Monitoring', 'Emergency Response Support'],
      impact: 'Operational air quality products for US regions',
      website: 'https://www.nesdis.noaa.gov',
      featured: false
    },
    {
      id: 5,
      name: 'University of Cambridge',
      category: 'academic',
      type: 'Statistical Methods Development',
      location: 'Cambridge, UK',
      established: '2021',
      logo: 'https://ui-avatars.com/api/?name=CAM&background=0f3460&color=fff&size=80',
      description: 'Joint development of advanced statistical methods for uncertainty quantification in satellite data downscaling.',
      projects: ['Bayesian Methods', 'Uncertainty Quantification', 'Student Research Exchange'],
      impact: 'Advanced statistical algorithms improving data reliability',
      website: 'https://www.cam.ac.uk',
      featured: false
    },
    {
      id: 6,
      name: 'Environmental Protection Agency',
      category: 'government',
      type: 'Policy & Validation Support',
      location: 'Research Triangle Park, NC, USA',
      established: '2023',
      logo: 'https://ui-avatars.com/api/?name=EPA&background=16a34a&color=fff&size=80',
      description: 'Supporting EPA air quality monitoring initiatives with high-resolution satellite-derived NO₂ data products.',
      projects: ['Air Quality Standards', 'Environmental Justice', 'Regulatory Support'],
      impact: 'Evidence-based environmental policy and regulation',
      website: 'https://www.epa.gov',
      featured: true
    },
    {
      id: 7,
      name: 'Google Earth Engine',
      category: 'industry',
      type: 'Cloud Computing Partnership',
      location: 'Mountain View, CA, USA',
      established: '2022',
      logo: 'https://ui-avatars.com/api/?name=GEE&background=ea4335&color=fff&size=80',
      description: 'Leveraging Google Earth Engine cloud infrastructure for large-scale satellite data processing and distribution.',
      projects: ['Cloud Processing Infrastructure', 'Data Distribution', 'API Development'],
      impact: 'Scalable global data processing capabilities',
      website: 'https://earthengine.google.com',
      featured: false
    },
    {
      id: 8,
      name: 'World Health Organization',
      category: 'international',
      type: 'Public Health Applications',
      location: 'Geneva, Switzerland',
      established: '2023',
      logo: 'https://ui-avatars.com/api/?name=WHO&background=0ea5e9&color=fff&size=80',
      description: 'Providing air quality data products to support WHO global health initiatives and environmental health assessments.',
      projects: ['Global Health Monitoring', 'Air Pollution Health Impact', 'Capacity Building'],
      impact: 'Global health policy and intervention support',
      website: 'https://www.who.int',
      featured: true
    },
    {
      id: 9,
      name: 'Korean Institute of Atmospheric Prediction Systems',
      category: 'academic',
      type: 'Regional Research Hub',
      location: 'Seoul, South Korea',
      established: '2020',
      logo: 'https://ui-avatars.com/api/?name=KIAPS&background=7c2d12&color=fff&size=80',
      description: 'Regional partnership for atmospheric monitoring and prediction in East Asia using advanced satellite data products.',
      projects: ['Asian Dust Monitoring', 'Air Quality Prediction', 'Regional Climate Studies'],
      impact: 'Enhanced atmospheric monitoring for East Asian region',
      website: 'https://www.kiaps.org',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Partners', count: partnerships.length },
    { id: 'government', name: 'Government Agencies', count: partnerships.filter(p => p.category === 'government').length },
    { id: 'academic', name: 'Academic Institutions', count: partnerships.filter(p => p.category === 'academic').length },
    { id: 'industry', name: 'Industry Partners', count: partnerships.filter(p => p.category === 'industry').length },
    { id: 'international', name: 'International Organizations', count: partnerships.filter(p => p.category === 'international').length }
  ];

  const filteredPartnerships = selectedCategory === 'all' 
    ? partnerships 
    : partnerships.filter(p => p.category === selectedCategory);

  const stats = {
    totalPartners: partnerships.length,
    countries: 8,
    activeProjects: 25,
    yearsActive: 5
  };

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
              Global Partnerships
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Collaborating with leading organizations worldwide to advance atmospheric science, 
              environmental monitoring, and public health through innovative satellite data applications.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalPartners}</div>
            <div className="text-sm text-gray-600">Partner Organizations</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.countries}</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.activeProjects}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.yearsActive}+</div>
            <div className="text-sm text-gray-600">Years of Partnership</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 lg:gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all text-sm lg:text-base ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Partnerships */}
        {selectedCategory === 'all' && (
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Featured Partnerships</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {partnerships.filter(p => p.featured).map(partner => (
                <div key={partner.id} className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-blue-600 font-medium text-sm mb-1">{partner.type}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {partner.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Since {partner.established}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {partner.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Projects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.projects.map((project, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Impact:</h4>
                      <p className="text-gray-600 text-sm">{partner.impact}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Partnerships */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
            {selectedCategory === 'all' ? 'All Partnerships' : categories.find(c => c.id === selectedCategory)?.name || 'Partnerships'}
            ({filteredPartnerships.length})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPartnerships.map(partner => (
              <div key={partner.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mb-2">{partner.type}</p>
                    <div className="flex flex-col space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {partner.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Since {partner.established}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {partner.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {partner.projects.slice(0, 2).map((project, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {project}
                      </span>
                    ))}
                    {partner.projects.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                        +{partner.projects.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 line-clamp-2 flex-1 pr-4">
                    <strong>Impact:</strong> {partner.impact}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Partnership Benefits</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our collaborative approach amplifies scientific impact and accelerates innovation 
              in atmospheric monitoring and environmental research.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-blue-100">
                Access to worldwide data sources and research expertise across continents
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Shared Resources</h3>
              <p className="text-blue-100">
                Combined computing power, datasets, and scientific infrastructure
              </p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation Acceleration</h3>
              <p className="text-blue-100">
                Faster development cycles and enhanced validation through collaboration
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            Interested in Partnership?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            We welcome collaborations with organizations that share our commitment to advancing 
            atmospheric science and environmental monitoring. Let's work together to address 
            global environmental challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Contact Partnership Team
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              Partnership Guidelines
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PartnershipsPage;