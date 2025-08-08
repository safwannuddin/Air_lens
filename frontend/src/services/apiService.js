import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API Service Class
class ApiService {
  // Health check
  async checkHealth() {
    try {
      const response = await api.get('/api/');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }

  // Dataset management
  async uploadDataset(formData) {
    try {
      const response = await api.post('/api/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getDatasets() {
    try {
      const response = await api.get('/api/datasets');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch datasets: ${error.message}`);
    }
  }

  async getDataset(datasetId) {
    try {
      const response = await api.get(`/api/datasets/${datasetId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dataset: ${error.message}`);
    }
  }

  async deleteDataset(datasetId) {
    try {
      const response = await api.delete(`/api/datasets/${datasetId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete dataset: ${error.message}`);
    }
  }

  // Processing jobs
  async startProcessing(jobData) {
    try {
      const response = await api.post('/api/processing/start', jobData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to start processing: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getProcessingJobs() {
    try {
      const response = await api.get('/api/processing/jobs');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch processing jobs: ${error.message}`);
    }
  }

  async getProcessingJob(jobId) {
    try {
      const response = await api.get(`/api/processing/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch processing job: ${error.message}`);
    }
  }

  async simulateProcessing(jobId) {
    try {
      const response = await api.post(`/api/processing/jobs/${jobId}/simulate`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to simulate processing: ${error.message}`);
    }
  }

  // Validation
  async createValidation(validationData) {
    try {
      const formData = new FormData();
      Object.keys(validationData).forEach(key => {
        formData.append(key, validationData[key]);
      });
      
      const response = await api.post('/api/validation/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create validation: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getValidationResults() {
    try {
      const response = await api.get('/api/validation/results');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch validation results: ${error.message}`);
    }
  }

  // Map visualization
  async createMapVisualization(mapData) {
    try {
      const formData = new FormData();
      Object.keys(mapData).forEach(key => {
        formData.append(key, mapData[key]);
      });
      
      const response = await api.post('/api/maps/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create map visualization: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getMapVisualizations() {
    try {
      const response = await api.get('/api/maps');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch map visualizations: ${error.message}`);
    }
  }

  async getMapVisualization(mapId) {
    try {
      const response = await api.get(`/api/maps/${mapId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch map visualization: ${error.message}`);
    }
  }

  // Analytics
  async getAnalyticsSummary() {
    try {
      const response = await api.get('/api/analytics/summary');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }

  // Status checks (legacy endpoints)
  async createStatusCheck(statusData) {
    try {
      const response = await api.post('/api/status', statusData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create status check: ${error.message}`);
    }
  }

  async getStatusChecks() {
    try {
      const response = await api.get('/api/status');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch status checks: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

export default apiService;

// Also export individual functions for direct use
export const {
  checkHealth,
  uploadDataset,
  getDatasets,
  getDataset,
  deleteDataset,
  startProcessing,
  getProcessingJobs,
  getProcessingJob,
  simulateProcessing,
  createValidation,
  getValidationResults,
  createMapVisualization,
  getMapVisualizations,
  getMapVisualization,
  getAnalyticsSummary,
  createStatusCheck,
  getStatusChecks,
} = apiService;