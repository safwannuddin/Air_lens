// Mock data for Satellite NO₂ Downscaling Web App

export const mockUserData = {
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@env-lab.org',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff'
};

export const mockActiveJobs = 3;

export const mockSatelliteData = [
  {
    id: 1,
    name: 'TROPOMI_NO2_Europe_2024_Q4',
    uploadDate: '2024-12-15',
    status: 'processed',
    resolution: '3.5km x 7km',
    location: 'Europe',
    no2Levels: '15.3 μmol/m²',
    accuracy: '94%'
  },
  {
    id: 2,
    name: 'OMI_NO2_USA_East_2024_Dec',
    uploadDate: '2024-12-10',
    status: 'processing',
    resolution: '13km x 24km', 
    location: 'Eastern USA',
    no2Levels: '18.7 μmol/m²',
    accuracy: '91%'
  },
  {
    id: 3,
    name: 'Sentinel5P_NO2_Asia_2024_W50',
    uploadDate: '2024-12-08',
    status: 'completed',
    resolution: '3.5km x 5.5km',
    location: 'Southeast Asia',
    no2Levels: '22.1 μmol/m²',
    accuracy: '96%'
  }
];

export const mockMapRegions = [
  {
    id: 1,
    name: 'Northern Europe',
    coordinates: [60.1699, 18.6435],
    no2Level: 12.5,
    status: 'good',
    color: '#22c55e'
  },
  {
    id: 2,
    name: 'Central Europe',
    coordinates: [50.0755, 14.4378],
    no2Level: 28.3,
    status: 'moderate',
    color: '#f59e0b'
  },
  {
    id: 3,
    name: 'Eastern USA',
    coordinates: [40.7128, -74.0060],
    no2Level: 35.7,
    status: 'poor',
    color: '#ef4444'
  }
];

export const mockStats = {
  totalDataProcessed: 2847,
  accuracyRate: 94.2,
  avgProcessingTime: '14 min',
  activeUsers: 127,
  dataVolume: '15.6 TB',
  monthlyUploads: 342
};

export const mockValidationResults = [
  {
    id: 1,
    dataset: 'TROPOMI_NO2_Europe_2024_Q4',
    groundTruthMatch: 96.3,
    rmse: 0.87,
    correlation: 0.94,
    bias: -0.12
  },
  {
    id: 2,
    dataset: 'OMI_NO2_USA_East_2024_Dec',
    groundTruthMatch: 91.7,
    rmse: 1.23,
    correlation: 0.89,
    bias: 0.08
  }
];

export const mockAlgorithms = [
  {
    id: 1,
    name: 'Machine Learning Downscaling',
    description: 'AI-powered downscaling using Random Forest and neural networks',
    accuracy: 96,
    processingTime: '12 min',
    features: ['Cloud masking', 'Terrain correction', 'Temporal interpolation']
  },
  {
    id: 2,
    name: 'Statistical Interpolation',
    description: 'Traditional statistical methods with spatial interpolation',
    accuracy: 89,
    processingTime: '8 min', 
    features: ['Kriging', 'IDW interpolation', 'Bias correction']
  },
  {
    id: 3,
    name: 'Physics-Based Model',
    description: 'Atmospheric physics model with chemical transport',
    accuracy: 94,
    processingTime: '25 min',
    features: ['Atmospheric chemistry', 'Emission modeling', 'Meteorological coupling']
  }
];

export const mockRecentActivity = [
  {
    id: 1,
    user: 'Dr. Maria Rodriguez',
    action: 'Uploaded new dataset',
    dataset: 'TROPOMI_NO2_Spain_2024',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: 'Prof. James Wilson',
    action: 'Completed validation',
    dataset: 'OMI_NO2_Canada_2024',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    user: 'Dr. Li Wei',
    action: 'Generated map visualization',
    dataset: 'Sentinel5P_NO2_China_2024',
    timestamp: '1 day ago'
  }
];

export const mockDocumentation = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn how to upload and process satellite NO₂ data',
    category: 'tutorial',
    readTime: '10 min'
  },
  {
    id: 2,
    title: 'API Reference',
    description: 'Complete API documentation for developers',
    category: 'reference',
    readTime: '25 min'
  },
  {
    id: 3,
    title: 'Data Format Guide',
    description: 'Supported formats and data requirements',
    category: 'guide',
    readTime: '8 min'
  }
];