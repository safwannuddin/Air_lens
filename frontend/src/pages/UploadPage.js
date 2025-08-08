import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Play, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockAlgorithms } from '../mock/data';
import { useToast } from '../hooks/use-toast';
import apiService from '../services/apiService';

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedDataset, setUploadedDataset] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(mockAlgorithms[0]);
  const [processingStatus, setProcessingStatus] = useState('idle'); // idle, uploading, processing, completed
  const [currentJob, setCurrentJob] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = [
    { ext: '.nc', name: 'NetCDF', description: 'Network Common Data Form' },
    { ext: '.hdf5', name: 'HDF5', description: 'Hierarchical Data Format' },
    { ext: '.grib', name: 'GRIB', description: 'Gridded Binary' },
    { ext: '.tiff', name: 'GeoTIFF', description: 'Geographic Tagged Image File' }
  ];

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2), // MB
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        file: file
      });

      // Auto-upload the file
      await uploadFileToBackend(file);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        file: file
      });

      // Auto-upload the file
      await uploadFileToBackend(file);
    }
  };

  const uploadFileToBackend = async (file) => {
    setIsUploading(true);
    setProcessingStatus('uploading');

    try {
      // Determine file format and satellite source based on filename
      const fileName = file.name.toLowerCase();
      let dataFormat = 'netcdf';
      let satelliteSource = 'TROPOMI';

      if (fileName.includes('.hdf5') || fileName.includes('.h5')) {
        dataFormat = 'hdf5';
      } else if (fileName.includes('.grib')) {
        dataFormat = 'grib';
      }

      if (fileName.includes('omi')) {
        satelliteSource = 'OMI';
      } else if (fileName.includes('sentinel')) {
        satelliteSource = 'Sentinel-5P';
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('data_format', dataFormat);
      formData.append('satellite_source', satelliteSource);

      const result = await apiService.uploadDataset(formData);
      
      setUploadedDataset(result.metadata);
      setProcessingStatus('idle');
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for processing`,
      });

    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
      setProcessingStatus('idle');
      setUploadedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startProcessing = async () => {
    if (!uploadedDataset) {
      toast({
        title: "No file uploaded",
        description: "Please upload a file before processing",
        variant: "destructive"
      });
      return;
    }

    try {
      setProcessingStatus('processing');
      setProgress(0);

      // Map algorithm names to backend algorithm IDs
      const algorithmMap = {
        'Machine Learning Downscaling': 'random_forest',
        'Statistical Interpolation': 'kriging', 
        'Physics-Based Model': 'physics_based'
      };

      const jobData = {
        dataset_id: uploadedDataset.id,
        algorithm: algorithmMap[selectedAlgorithm.name] || 'random_forest',
        parameters: {
          resolution_target: '1km',
          quality_control: true,
          temporal_smoothing: true
        }
      };

      const job = await apiService.startProcessing(jobData);
      setCurrentJob(job);

      // Simulate processing progress
      const interval = setInterval(async () => {
        setProgress(prev => {
          if (prev >= 90) {
            // At 90%, simulate completion by calling the backend
            clearInterval(interval);
            simulateJobCompletion(job.id);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 1000);

    } catch (error) {
      console.error('Processing failed:', error);
      toast({
        title: "Processing failed",
        description: error.message,
        variant: "destructive"
      });
      setProcessingStatus('idle');
    }
  };

  const simulateJobCompletion = async (jobId) => {
    try {
      await apiService.simulateProcessing(jobId);
      setProgress(100);
      setProcessingStatus('completed');
      
      toast({
        title: "Processing completed!",
        description: "Your data has been successfully downscaled",
      });
    } catch (error) {
      console.error('Failed to complete processing:', error);
      toast({
        title: "Processing completed with errors",
        description: "There were some issues during processing",
        variant: "destructive"
      });
      setProcessingStatus('completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
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
            Upload & Process Satellite Data
          </h1>
          <p className="text-xl text-gray-600">
            Upload your satellite NO₂ data and choose a downscaling algorithm
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                1. Upload Satellite Data
              </h2>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Drop your files here, or click to browse
                </p>
                <p className="text-gray-600 mb-4">
                  Support for NetCDF, HDF5, GRIB, and GeoTIFF formats
                </p>
                <p className="text-sm text-gray-500">
                  Maximum file size: 500 MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".nc,.hdf5,.grib,.tiff,.tif"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile && (
                <div className="mt-6 bg-green-50 rounded-lg p-4 flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {uploadedFile.size} MB • {uploadedDataset ? 'Uploaded and ready' : 'Processing upload...'}
                    </p>
                    {isUploading && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Supported Formats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {supportedFormats.map((format) => (
                  <div key={format.ext} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">{format.name}</p>
                      <p className="text-sm text-gray-600">{format.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Algorithm Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                2. Choose Processing Algorithm
              </h2>

              <div className="space-y-4">
                {mockAlgorithms.map((algorithm) => (
                  <div
                    key={algorithm.id}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedAlgorithm.id === algorithm.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAlgorithm(algorithm)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {algorithm.name}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-green-600">
                          {algorithm.accuracy}%
                        </span>
                        <span className="text-sm text-gray-500">
                          {algorithm.processingTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{algorithm.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {algorithm.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing Controls */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                3. Start Processing
              </h2>

              {processingStatus === 'idle' && uploadedDataset && (
                <button
                  onClick={startProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Processing</span>
                </button>
              )}

              {processingStatus === 'uploading' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-blue-600">
                    <Settings className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-semibold">Uploading your data...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {!uploadedDataset && processingStatus === 'idle' && (
                <div className="text-center py-4 text-gray-500">
                  <p>Upload a file to start processing</p>
                </div>
              )}

              {processingStatus === 'processing' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-blue-600">
                    <Settings className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-semibold">Processing your data...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">{Math.round(progress)}% complete</p>
                </div>
              )}

              {processingStatus === 'completed' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-8 h-8" />
                    <span className="text-lg font-semibold">Processing completed successfully!</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate('/map')}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => navigate('/validation')}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Validate Results
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Processing Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Processing Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Algorithm:</span>
                  <span className="font-semibold">{selectedAlgorithm.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Accuracy:</span>
                  <span className="font-semibold text-green-600">{selectedAlgorithm.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-semibold">{selectedAlgorithm.processingTime}</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Processing Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Ensure your data covers the complete time period</li>
                <li>• Check for missing values or data gaps</li>
                <li>• Verify coordinate reference system</li>
                <li>• Quality control flags should be included</li>
              </ul>
            </div>

            {/* Help */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-yellow-900">Need Help?</h3>
              </div>
              <p className="text-sm text-yellow-800 mb-3">
                Check our documentation for detailed upload guidelines and troubleshooting tips.
              </p>
              <button
                onClick={() => navigate('/docs')}
                className="text-yellow-800 font-semibold hover:text-yellow-900 transition-colors"
              >
                View Documentation →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadPage;