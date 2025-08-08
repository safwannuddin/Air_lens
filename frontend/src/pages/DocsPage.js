import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, ExternalLink, Download, Code, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockDocumentation } from '../mock/data';

const DocsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documentation' },
    { id: 'tutorial', name: 'Tutorials' },
    { id: 'guide', name: 'User Guides' },
    { id: 'reference', name: 'API Reference' },
    { id: 'examples', name: 'Examples' }
  ];

  const additionalDocs = [
    {
      id: 4,
      title: 'TROPOMI Data Processing',
      description: 'Step-by-step guide for processing TROPOMI satellite data',
      category: 'tutorial',
      readTime: '15 min'
    },
    {
      id: 5,
      title: 'Algorithm Comparison',
      description: 'Compare different downscaling algorithms and their performance',
      category: 'guide',
      readTime: '12 min'
    },
    {
      id: 6,
      title: 'Code Examples',
      description: 'Python and R code examples for data processing',
      category: 'examples',
      readTime: '20 min'
    }
  ];

  const allDocs = [...mockDocumentation, ...additionalDocs];

  const filteredDocs = allDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const quickLinks = [
    { name: 'Quick Start Guide', url: '#quickstart', icon: BookOpen },
    { name: 'API Documentation', url: '#api', icon: Code },
    { name: 'Data Formats', url: '#formats', icon: FileText },
    { name: 'Download Examples', url: '#download', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation Center
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about satellite NO₂ data processing
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Documentation List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 ml-4 mt-1 transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        doc.category === 'tutorial' ? 'bg-green-100 text-green-800' :
                        doc.category === 'guide' ? 'bg-blue-100 text-blue-800' :
                        doc.category === 'reference' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.category}
                      </span>
                      <span className="text-sm text-gray-500">{doc.readTime}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Read more →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No documentation found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter</p>
              </div>
            )}

            {/* Featured Guide */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Getting Started Guide</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                New to satellite NO₂ data processing? Our comprehensive getting started guide 
                will walk you through uploading your first dataset, choosing the right algorithm, 
                and interpreting the results.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Tutorial
                </button>
                <button className="border border-blue-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Watch Video
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <button
                      key={link.name}
                      className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">Need Help?</h3>
              <p className="text-green-800 text-sm mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Contact Support
                </button>
                <button className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-colors">
                  Community Forum
                </button>
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Downloads</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg text-blue-900 hover:bg-blue-100 transition-colors">
                  <span className="text-sm">Python SDK</span>
                  <Download className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg text-blue-900 hover:bg-blue-100 transition-colors">
                  <span className="text-sm">R Package</span>
                  <Download className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg text-blue-900 hover:bg-blue-100 transition-colors">
                  <span className="text-sm">Example Datasets</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Version Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Version Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Version:</span>
                  <span className="font-medium">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API Version:</span>
                  <span className="font-medium">v1.3.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">Dec 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocsPage;