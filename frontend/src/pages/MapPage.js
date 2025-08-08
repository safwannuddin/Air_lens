import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, ZoomIn, ZoomOut, Download, Settings, Play, Pause } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockMapRegions, mockSatelliteData } from '../mock/data';
import apiService from '../services/apiService';

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [mapVisualizations, setMapVisualizations] = useState([]);
  const [mapView, setMapView] = useState('satellite'); // satellite, processed, comparison
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasetsData, mapsData] = await Promise.all([
          apiService.getDatasets(),
          apiService.getMapVisualizations()
        ]);
        
        setDatasets(datasetsData);
        setMapVisualizations(mapsData);
        
        if (datasetsData.length > 0) {
          setSelectedDataset(datasetsData[0]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Fallback to mock data
        setDatasets(mockSatelliteData);
        setSelectedDataset(mockSatelliteData[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const layerTypes = [
    { id: 'satellite', name: 'Original Satellite Data', color: 'blue' },
    { id: 'processed', name: 'Downscaled Data', color: 'green' },
    { id: 'comparison', name: 'Side-by-Side', color: 'purple' }
  ];

  const handleDownload = async () => {
    if (!selectedDataset) return;
    
    try {
      // Create map visualization if none exists
      const mapData = {
        dataset_id: selectedDataset.id,
        map_type: mapView,
        zoom_level: 5,
        center_lat: 52.3676,
        center_lon: 4.9041
      };
      
      const visualization = await apiService.createMapVisualization(mapData);
      console.log('Map visualization created:', visualization);
      
      // In a real implementation, this would trigger a download
      console.log('Downloading map data...');
    } catch (error) {
      console.error('Failed to create map visualization:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Interactive Map Viewer
          </h1>
          <p className="text-xl text-gray-600">
            Visualize and analyze downscaled NO₂ data on interactive maps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Dataset Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Dataset</h3>
              {loading ? (
                <div className="text-center py-4">
                  <Settings className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">Loading datasets...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {datasets.map((dataset) => (
                    <div
                      key={dataset.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDataset && selectedDataset.id === dataset.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDataset(dataset)}
                    >
                      <p className="font-semibold text-gray-900 text-sm">
                        {dataset.filename || dataset.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {dataset.satellite_source || 'Unknown Source'}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {dataset.upload_timestamp ? new Date(dataset.upload_timestamp).toLocaleDateString() : 'Unknown Date'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          dataset.processing_status === 'completed' || dataset.status === 'completed' ? 'bg-green-100 text-green-800' :
                          dataset.processing_status === 'processing' || dataset.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {dataset.processing_status || dataset.status || 'uploaded'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {datasets.length === 0 && (
                    <p className="text-center py-4 text-gray-500">
                      No datasets available. Upload some data first.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Layer Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Map Layers</h3>
              <div className="space-y-3">
                {layerTypes.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setMapView(layer.id)}
                    className={`w-full p-3 text-left rounded-lg transition-all ${
                      mapView === layer.id
                        ? `bg-${layer.color}-100 border-${layer.color}-500 border-2`
                        : 'bg-gray-50 border-gray-200 border-2 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${layer.color}-500`}></div>
                      <span className="font-medium text-gray-900">{layer.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Controls</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <ZoomIn className="w-5 h-5 mx-auto" />
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <ZoomOut className="w-5 h-5 mx-auto" />
                  </button>
                </div>

                <button
                  onClick={() => setIsAnimated(!isAnimated)}
                  className={`w-full p-3 rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    isAnimated 
                      ? 'bg-green-100 text-green-800 border-green-500 border-2' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border-2'
                  }`}
                >
                  {isAnimated ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isAnimated ? 'Pause Animation' : 'Start Animation'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Export Map</span>
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">NO₂ Levels</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Good</span>
                  </div>
                  <span className="text-sm text-gray-600">0-20 μmol/m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Moderate</span>
                  </div>
                  <span className="text-sm text-gray-600">20-40 μmol/m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Poor</span>
                  </div>
                  <span className="text-sm text-gray-600">40+ μmol/m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Map Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedDataset ? (selectedDataset.filename || selectedDataset.name) : 'No Dataset Selected'}
                  </h2>
                  {selectedDataset && (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Source: {selectedDataset.satellite_source || 'Unknown'}
                      </span>
                      <span className="text-sm text-gray-600">
                        Format: {selectedDataset.data_format || 'Unknown'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mock Map Display */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Interactive Map Display
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {mapView === 'satellite' && 'Showing original satellite data resolution'}
                      {mapView === 'processed' && 'Showing downscaled high-resolution data'}
                      {mapView === 'comparison' && 'Showing side-by-side comparison'}
                    </p>

                    {/* Mock Data Points */}
                    <div className="relative w-80 h-60 mx-auto bg-gradient-to-br from-slate-200 to-blue-200 rounded-lg overflow-hidden">
                      {mockMapRegions.map((region, index) => (
                        <div
                          key={region.id}
                          className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all transform hover:scale-125 ${isAnimated ? 'animate-pulse' : ''}`}
                          style={{
                            backgroundColor: region.color,
                            left: `${20 + index * 25}%`,
                            top: `${30 + (index % 2) * 20}%`
                          }}
                          onClick={() => setSelectedRegion(region)}
                          title={`${region.name}: ${region.no2Level} μmol/m²`}
                        />
                      ))}

                      {selectedRegion && (
                        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                          <h4 className="font-semibold text-gray-900">{selectedRegion.name}</h4>
                          <p className="text-sm text-gray-600">
                            NO₂: {selectedRegion.no2Level} μmol/m²
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: <span className={`capitalize ${selectedRegion.status === 'good' ? 'text-green-600' : selectedRegion.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                              {selectedRegion.status}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Last updated: {selectedDataset ? 
                      (selectedDataset.upload_timestamp ? new Date(selectedDataset.upload_timestamp).toLocaleDateString() : 'Unknown') : 
                      'N/A'
                    }
                  </span>
                  <span>Zoom level: 1:50,000</span>
                </div>
              </div>
            </div>

            {/* Additional Tools */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Time Series</h4>
                <p className="text-sm text-gray-600">View temporal changes</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Open Timeline →
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Cross Sections</h4>
                <p className="text-sm text-gray-600">Analyze vertical profiles</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Create Section →
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Data Export</h4>
                <p className="text-sm text-gray-600">Download processed data</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Export Options →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MapPage;