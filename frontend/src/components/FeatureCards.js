import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Map, BarChart3, Database, Cpu, Globe } from 'lucide-react';

const FeatureCards = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: 'Data Upload & Processing',
      description: 'Upload satellite NO₂ data in various formats (NetCDF, HDF5, GRIB) and process with our advanced algorithms.',
      action: 'Upload Data',
      route: '/upload',
      color: 'blue'
    },
    {
      icon: Map,
      title: 'Interactive Map Visualization',
      description: 'Visualize downscaled NO₂ data on interactive maps with multiple overlay options and analysis tools.',
      action: 'View Maps',
      route: '/map',
      color: 'green'
    },
    {
      icon: BarChart3,
      title: 'Data Validation & Analytics',
      description: 'Validate your results against ground truth measurements and analyze accuracy metrics.',
      action: 'Validate Data',
      route: '/validation',
      color: 'purple'
    }
  ];

  const algorithms = [
    {
      icon: Cpu,
      title: 'Machine Learning Models',
      description: 'Random Forest, Neural Networks, and Deep Learning for accurate downscaling',
      accuracy: '96%'
    },
    {
      icon: Database,
      title: 'Statistical Methods',
      description: 'Kriging, IDW interpolation, and advanced spatial statistics',
      accuracy: '89%'
    },
    {
      icon: Globe,
      title: 'Physics-Based Models',
      description: 'Atmospheric chemistry and transport models with meteorological coupling',
      accuracy: '94%'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Comprehensive NO₂ Analysis Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From raw satellite data to actionable environmental insights in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
              purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
            };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[feature.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <button
                    onClick={() => navigate(feature.route)}
                    className={`w-full py-3 px-6 rounded-xl text-white font-semibold bg-gradient-to-r ${colorClasses[feature.color]} transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    {feature.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Algorithm Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Downscaling Algorithms
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from multiple state-of-the-art algorithms optimized for different data types and accuracy requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {algorithms.map((algorithm, index) => {
              const IconComponent = algorithm.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      {algorithm.accuracy}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {algorithm.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm">
                    {algorithm.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;