import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Video,
  FileText
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'data-upload', name: 'Data Upload', icon: Download },
    { id: 'processing', name: 'Data Processing', icon: FileText },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: MessageCircle }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create an account and get started?',
      answer: 'To get started with our platform, you need to register for an account through your institution or research organization. Contact your system administrator or our support team to request access. Once approved, you\'ll receive login credentials and can begin uploading satellite data immediately.',
      tags: ['account', 'registration', 'access']
    },
    {
      id: 2,
      category: 'data-upload',
      question: 'What file formats are supported for satellite data upload?',
      answer: 'We support multiple satellite data formats including NetCDF (.nc), HDF5 (.hdf5), GRIB (.grib), and GeoTIFF (.tiff). The platform automatically detects the format and processes accordingly. Make sure your files include proper metadata and coordinate reference systems.',
      tags: ['file formats', 'upload', 'netcdf', 'hdf5']
    },
    {
      id: 3,
      category: 'data-upload',
      question: 'What is the maximum file size for uploads?',
      answer: 'Individual files can be up to 500 MB in size. For larger datasets, we recommend splitting them into smaller chunks or contacting our support team for assistance with bulk uploads. We also provide batch upload capabilities for research projects.',
      tags: ['file size', 'limits', 'bulk upload']
    },
    {
      id: 4,
      category: 'processing',
      question: 'How long does data processing typically take?',
      answer: 'Processing time depends on the algorithm selected and data size. Machine learning downscaling typically takes 12-15 minutes, statistical interpolation takes 8-10 minutes, and physics-based models take 25-30 minutes. You\'ll receive email notifications when processing is complete.',
      tags: ['processing time', 'algorithms', 'notifications']
    },
    {
      id: 5,
      category: 'processing',
      question: 'How do I choose the right downscaling algorithm?',
      answer: 'Algorithm choice depends on your research needs: Machine Learning (96% accuracy, best for operational use), Statistical Interpolation (89% accuracy, faster processing), or Physics-Based Models (94% accuracy, best for research applications). Consider your accuracy requirements and time constraints.',
      tags: ['algorithms', 'accuracy', 'selection']
    },
    {
      id: 6,
      category: 'troubleshooting',
      question: 'Why is my data processing failing?',
      answer: 'Common issues include: missing coordinate information, incorrect file format, corrupted data, or insufficient metadata. Check our data format guidelines and ensure your files meet all requirements. Contact support if issues persist after following troubleshooting steps.',
      tags: ['errors', 'processing', 'troubleshooting']
    },
    {
      id: 7,
      category: 'getting-started',
      question: 'How accurate are the downscaled results?',
      answer: 'Our algorithms achieve 89-96% accuracy depending on the method chosen. Machine learning approaches typically provide the highest accuracy (96%), while statistical methods offer faster processing (89% accuracy). All results include uncertainty estimates and validation metrics.',
      tags: ['accuracy', 'validation', 'results']
    },
    {
      id: 8,
      category: 'data-upload',
      question: 'Can I upload data from multiple satellites?',
      answer: 'Yes, we support data from TROPOMI (Sentinel-5P), OMI (Aura), SCIAMACHY (Envisat), and other atmospheric monitoring satellites. The platform automatically identifies the satellite source and applies appropriate processing algorithms.',
      tags: ['satellites', 'tropomi', 'omi', 'multiple sources']
    },
    {
      id: 9,
      category: 'processing',
      question: 'How can I validate my processed results?',
      answer: 'Use our validation tools to compare results with ground truth measurements. We provide statistical metrics including RMSE, correlation coefficients, and bias analysis. Access validation reports through the Validation tab or download detailed metrics.',
      tags: ['validation', 'ground truth', 'metrics']
    },
    {
      id: 10,
      category: 'troubleshooting',
      question: 'How do I download and export my results?',
      answer: 'Processed data can be downloaded in multiple formats (NetCDF, CSV, GeoTIFF) from the Map Viewer or Results page. Use the Export button to select your preferred format and resolution. Bulk downloads are available for multiple datasets.',
      tags: ['download', 'export', 'results', 'formats']
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Satellite NO₂ Processing',
      type: 'video',
      duration: '15 min',
      description: 'Complete walkthrough of uploading your first dataset and processing it with our platform',
      thumbnail: 'https://ui-avatars.com/api/?name=Video+1&background=3b82f6&color=fff&size=200'
    },
    {
      id: 2,
      title: 'Choosing the Right Algorithm',
      type: 'guide',
      duration: '8 min read',
      description: 'Detailed comparison of ML, statistical, and physics-based downscaling methods',
      thumbnail: 'https://ui-avatars.com/api/?name=Guide+1&background=10b981&color=fff&size=200'
    },
    {
      id: 3,
      title: 'Data Validation Best Practices',
      type: 'tutorial',
      duration: '12 min',
      description: 'How to validate your results using ground truth measurements and statistical metrics',
      thumbnail: 'https://ui-avatars.com/api/?name=Tutorial+1&background=f59e0b&color=fff&size=200'
    },
    {
      id: 4,
      title: 'API Integration Guide',
      type: 'documentation',
      duration: '20 min read',
      description: 'Complete guide to integrating our API into your research workflow',
      thumbnail: 'https://ui-avatars.com/api/?name=API+Guide&background=8b5cf6&color=fff&size=200'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
              Help Center
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions, access tutorials, and get support for using our 
              satellite NO₂ processing platform.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics, tutorials, or questions..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm">Comprehensive guides and references</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600 text-sm">Step-by-step video walkthroughs</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-gray-600 text-sm">Connect with other researchers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get direct help from our team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Topic</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tutorials Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tutorials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tutorials.map(tutorial => (
                  <div key={tutorial.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          tutorial.type === 'video' ? 'bg-blue-100 text-blue-800' :
                          tutorial.type === 'guide' ? 'bg-green-100 text-green-800' :
                          tutorial.type === 'tutorial' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tutorial.type}
                        </span>
                        <span className="text-xs text-gray-500">{tutorial.duration}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{tutorial.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{tutorial.description}</p>
                      <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                        <span>Start learning</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions ({filteredFAQs.length})
              </h2>
              
              <div className="space-y-4">
                {filteredFAQs.map(faq => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse different categories</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions or technical issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Mail className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Email Support</h3>
              <p className="text-blue-100 text-sm mb-4">Get detailed help via email</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Send Email
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-blue-100 text-sm mb-4">Chat with our support team</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center sm:col-span-2 lg:col-span-1">
              <Phone className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Phone Support</h3>
              <p className="text-blue-100 text-sm mb-4">Speak directly with experts</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenterPage;