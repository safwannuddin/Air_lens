import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockValidationResults, mockSatelliteData } from '../mock/data';

const ValidationPage = () => {
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState(mockValidationResults[0]);

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
            Data Validation & Analytics
          </h1>
          <p className="text-xl text-gray-600">
            Validate downscaled results against ground truth measurements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Validation Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dataset Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Validation Results</h2>
              
              {mockValidationResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-6 border-2 rounded-xl mb-4 cursor-pointer transition-all ${
                    selectedDataset.id === result.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDataset(result)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {result.dataset}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {result.groundTruthMatch > 95 ? 
                        <CheckCircle className="w-5 h-5 text-green-600" /> :
                        result.groundTruthMatch > 90 ? 
                        <CheckCircle className="w-5 h-5 text-yellow-600" /> :
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      }
                      <span className="font-bold text-lg text-green-600">
                        {result.groundTruthMatch}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">RMSE</p>
                      <p className="text-lg font-bold text-gray-900">{result.rmse}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Correlation</p>
                      <p className="text-lg font-bold text-gray-900">{result.correlation}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Bias</p>
                      <p className="text-lg font-bold text-gray-900">{result.bias}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Match</p>
                      <p className="text-lg font-bold text-green-600">{result.groundTruthMatch}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Detailed Analysis: {selectedDataset.dataset}
              </h3>

              {/* Mock Chart Area */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 mb-6">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Validation Charts
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Statistical comparison between downscaled and ground truth data
                  </p>

                  {/* Mock validation metrics visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold text-gray-900">Scatter Plot</h5>
                      <div className="h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded mt-2 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">R² = {selectedDataset.correlation}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold text-gray-900">Time Series</h5>
                      <div className="h-24 bg-gradient-to-br from-green-100 to-yellow-100 rounded mt-2 flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">RMSE = {selectedDataset.rmse}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold text-gray-900">Residuals</h5>
                      <div className="h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded mt-2 flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Bias = {selectedDataset.bias}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export Report</span>
                </button>
                <button 
                  onClick={() => navigate('/map')}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Validation Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Validation Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Overall Accuracy:</span>
                  <span className="font-bold text-green-600">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Datasets Validated:</span>
                  <span className="font-bold text-gray-900">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg RMSE:</span>
                  <span className="font-bold text-gray-900">1.05</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Correlation:</span>
                  <span className="font-bold text-gray-900">0.92</span>
                </div>
              </div>
            </div>

            {/* Validation Guidelines */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Validation Guidelines</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Ground truth match &gt; 95% = Excellent</li>
                <li>• Ground truth match &gt; 90% = Good</li>
                <li>• RMSE &lt; 1.0 = High accuracy</li>
                <li>• Correlation &gt; 0.9 = Strong relationship</li>
                <li>• Bias &lt; 0.2 = Low systematic error</li>
              </ul>
            </div>

            {/* Ground Truth Sources */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">Ground Truth Sources</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-green-900">Air Quality Stations</p>
                  <p className="text-green-700">EPA, EMEP, CAMS networks</p>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Mobile Measurements</p>
                  <p className="text-green-700">Vehicle-based NO₂ sensors</p>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Aircraft Data</p>
                  <p className="text-green-700">Flight campaign measurements</p>
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

export default ValidationPage;