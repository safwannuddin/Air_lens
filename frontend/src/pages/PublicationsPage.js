import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ExternalLink, Download, Calendar, Users, BookOpen, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicationsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const publications = [
    {
      id: 1,
      title: 'Machine Learning Approaches for High-Resolution NO₂ Downscaling from TROPOMI Satellite Data',
      authors: ['S. Chen', 'M. Rodriguez', 'E. Williams', 'J. Liu'],
      journal: 'Remote Sensing of Environment',
      year: 2024,
      type: 'journal',
      doi: '10.1016/j.rse.2024.113456',
      abstract: 'We present a novel machine learning framework for downscaling TROPOMI NO₂ observations from 3.5km to 1km resolution using ensemble methods and deep neural networks.',
      citations: 23,
      impactFactor: 11.1,
      openAccess: true,
      featured: true
    },
    {
      id: 2,
      title: 'Validation of Satellite-Derived NO₂ Concentrations Using Ground-Based Measurements Across Europe',
      authors: ['D. Park', 'E. Williams', 'M. Santos', 'S. Chen'],
      journal: 'Atmospheric Chemistry and Physics',
      year: 2024,
      type: 'journal',
      doi: '10.5194/acp-24-1234-2024',
      abstract: 'Comprehensive validation study comparing downscaled satellite NO₂ data with ground truth measurements from 150+ monitoring stations across Europe.',
      citations: 18,
      impactFactor: 5.7,
      openAccess: true,
      featured: true
    },
    {
      id: 3,
      title: 'Statistical Uncertainty Quantification in Satellite NO₂ Downscaling Algorithms',
      authors: ['E. Williams', 'S. Chen', 'D. Park'],
      journal: 'Journal of Geophysical Research: Atmospheres',
      year: 2023,
      type: 'journal',
      doi: '10.1029/2023JD039876',
      abstract: 'Development of Bayesian methods for uncertainty quantification in machine learning-based satellite data downscaling with application to NO₂ measurements.',
      citations: 34,
      impactFactor: 4.4,
      openAccess: false,
      featured: true
    },
    {
      id: 4,
      title: 'Urban Air Quality Monitoring Using Downscaled Satellite NO₂ Data: A Multi-City Analysis',
      authors: ['M. Santos', 'S. Chen', 'M. Rodriguez', 'J. Liu', 'D. Park'],
      journal: 'Environmental Science & Technology',
      year: 2023,
      type: 'journal',
      doi: '10.1021/acs.est.3c01234',
      abstract: 'Application of high-resolution satellite NO₂ data for urban air quality assessment in 25 major cities worldwide, revealing significant spatial variations.',
      citations: 41,
      impactFactor: 10.8,
      openAccess: true,
      featured: false
    },
    {
      id: 5,
      title: 'Scalable Cloud Infrastructure for Global Satellite Data Processing',
      authors: ['J. Liu', 'S. Chen', 'M. Rodriguez'],
      journal: 'IEEE Transactions on Geoscience and Remote Sensing',
      year: 2023,
      type: 'journal',
      doi: '10.1109/TGRS.2023.3234567',
      abstract: 'Design and implementation of a cloud-based platform for processing petabytes of satellite atmospheric data with sub-hourly latency requirements.',
      citations: 15,
      impactFactor: 7.5,
      openAccess: false,
      featured: false
    },
    {
      id: 6,
      title: 'Real-time NO₂ Monitoring Platform for Environmental Research',
      authors: ['S. Chen', 'J. Liu', 'E. Williams', 'M. Rodriguez'],
      conference: 'AGU Fall Meeting 2024',
      year: 2024,
      type: 'conference',
      abstract: 'Presentation of our web-based platform enabling researchers worldwide to access and process high-resolution satellite NO₂ data in real-time.',
      location: 'Washington, D.C.',
      featured: false
    },
    {
      id: 7,
      title: 'Deep Learning for Atmospheric Trace Gas Retrieval: A TROPOMI Case Study',
      authors: ['M. Rodriguez', 'S. Chen', 'M. Santos'],
      conference: 'IEEE IGARSS 2024',
      year: 2024,
      type: 'conference',
      abstract: 'Novel convolutional neural network architectures for improving the accuracy of atmospheric trace gas retrievals from satellite measurements.',
      location: 'Athens, Greece',
      featured: false
    },
    {
      id: 8,
      title: 'Advances in Satellite Data Downscaling: Methods and Applications',
      authors: ['S. Chen', 'E. Williams', 'M. Rodriguez'],
      journal: 'Annual Review of Environment and Resources',
      year: 2023,
      type: 'review',
      doi: '10.1146/annurev-environ-012023-456789',
      abstract: 'Comprehensive review of statistical and machine learning methods for satellite data downscaling with focus on atmospheric applications.',
      citations: 67,
      impactFactor: 15.4,
      openAccess: true,
      featured: true
    }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];
  const types = [
    { id: 'all', name: 'All Publications' },
    { id: 'journal', name: 'Journal Articles' },
    { id: 'conference', name: 'Conference Papers' },
    { id: 'review', name: 'Review Articles' }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    return matchesSearch && matchesYear && matchesType;
  });

  const stats = {
    totalPublications: publications.length,
    totalCitations: publications.reduce((sum, pub) => sum + (pub.citations || 0), 0),
    hIndex: 34,
    avgImpactFactor: 8.2
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
              Research Publications
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Peer-reviewed research and conference papers advancing the field of satellite atmospheric monitoring 
              and environmental data science.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalPublications}</div>
            <div className="text-sm text-gray-600">Total Publications</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalCitations}</div>
            <div className="text-sm text-gray-600">Total Citations</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.hIndex}</div>
            <div className="text-sm text-gray-600">Team h-index</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.avgImpactFactor}</div>
            <div className="text-sm text-gray-600">Avg Impact Factor</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title or author..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Publications */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Featured Publications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {publications.filter(pub => pub.featured).map(pub => (
              <div key={pub.id} className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {pub.authors.join(', ')}
                    </p>
                    <p className="text-blue-600 font-medium text-sm">
                      {pub.journal} • {pub.year}
                    </p>
                  </div>
                  {pub.openAccess && (
                    <div className="ml-4">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Open Access
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {pub.abstract}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    {pub.citations && (
                      <span className="text-gray-600">
                        <strong className="text-gray-900">{pub.citations}</strong> citations
                      </span>
                    )}
                    {pub.impactFactor && (
                      <span className="text-gray-600">
                        IF: <strong className="text-gray-900">{pub.impactFactor}</strong>
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-700 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Publications */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
            All Publications ({filteredPublications.length})
          </h2>
          
          <div className="space-y-4 lg:space-y-6">
            {filteredPublications.map(pub => (
              <div key={pub.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0 lg:pr-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 line-clamp-2">
                        {pub.title}
                      </h3>
                      {pub.openAccess && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          Open Access
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      {pub.authors.join(', ')}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm mb-3">
                      <p className="text-blue-600 font-medium">
                        {pub.journal || pub.conference} • {pub.year}
                      </p>
                      {pub.location && (
                        <p className="text-gray-500">{pub.location}</p>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                      {pub.abstract}
                    </p>

                    <div className="flex items-center space-x-4 text-sm">
                      {pub.citations && (
                        <span className="text-gray-600">
                          <strong className="text-gray-900">{pub.citations}</strong> citations
                        </span>
                      )}
                      {pub.impactFactor && (
                        <span className="text-gray-600">
                          IF: <strong className="text-gray-900">{pub.impactFactor}</strong>
                        </span>
                      )}
                      {pub.doi && (
                        <span className="text-gray-500 font-mono text-xs">
                          DOI: {pub.doi}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm lg:hidden">View</span>
                    </button>
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                      <Download className="w-5 h-5" />
                      <span className="text-sm lg:hidden">Download</span>
                    </button>
                    <div className="text-center lg:mt-4">
                      <div className="text-xs text-gray-500">{pub.year}</div>
                      <div className={`w-2 h-2 rounded-full mt-1 mx-auto ${
                        pub.type === 'journal' ? 'bg-blue-500' :
                        pub.type === 'conference' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No publications found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Research Impact */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Research Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Our research contributes to global understanding of atmospheric pollution and supports 
              evidence-based environmental policy decisions worldwide.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-blue-100">Countries Using Our Data</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-blue-100">Research Collaborations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Citations Received</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-blue-100">Policy Reports Supported</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PublicationsPage;