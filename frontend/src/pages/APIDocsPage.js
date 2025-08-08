import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  Key, 
  Database, 
  Zap,
  BookOpen,
  Download,
  Play
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const APIDocsPage = () => {
  const navigate = useNavigate();
  const [selectedEndpoint, setSelectedEndpoint] = useState('upload');
  const [copiedCode, setCopiedCode] = useState(null);

  const endpoints = [
    {
      id: 'upload',
      name: 'Upload Data',
      method: 'POST',
      path: '/api/v1/upload',
      description: 'Upload satellite NO₂ data files for processing'
    },
    {
      id: 'process',
      name: 'Process Data',
      method: 'POST', 
      path: '/api/v1/process',
      description: 'Start downscaling process with selected algorithm'
    },
    {
      id: 'status',
      name: 'Job Status',
      method: 'GET',
      path: '/api/v1/jobs/{job_id}',
      description: 'Check processing status and progress'
    },
    {
      id: 'results',
      name: 'Get Results',
      method: 'GET',
      path: '/api/v1/results/{job_id}',
      description: 'Retrieve processed data and download links'
    },
    {
      id: 'validate',
      name: 'Validate Results',
      method: 'POST',
      path: '/api/v1/validate',
      description: 'Validate results against ground truth data'
    }
  ];

  const codeExamples = {
    upload: {
      python: `import requests
import os

# Set your API key
API_KEY = "your_api_key_here"
BASE_URL = "https://api.satelliteno2.org"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "multipart/form-data"
}

# Upload satellite data file
def upload_satellite_data(file_path):
    with open(file_path, 'rb') as file:
        files = {'file': file}
        data = {
            'satellite': 'TROPOMI',
            'data_type': 'NO2',
            'processing_level': 'L2'
        }
        
        response = requests.post(
            f"{BASE_URL}/api/v1/upload",
            headers={"Authorization": f"Bearer {API_KEY}"},
            files=files,
            data=data
        )
        
        return response.json()

# Example usage
result = upload_satellite_data("tropomi_no2_data.nc")
print(f"Upload ID: {result['upload_id']}")`,
      
      javascript: `const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.satelliteno2.org';

async function uploadSatelliteData(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('satellite', 'TROPOMI');
    formData.append('data_type', 'NO2');
    formData.append('processing_level', 'L2');
    
    const response = await fetch(\`\${BASE_URL}/api/v1/upload\`, {
        method: 'POST',
        headers: {
            'Authorization': \`Bearer \${API_KEY}\`
        },
        body: formData
    });
    
    return await response.json();
}

// Example usage
const fileInput = document.getElementById('file-input');
const file = fileInput.files[0];
uploadSatelliteData(file)
    .then(result => console.log('Upload ID:', result.upload_id))
    .catch(error => console.error('Error:', error));`,
      
      curl: `curl -X POST "https://api.satelliteno2.org/api/v1/upload" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -F "file=@tropomi_no2_data.nc" \\
  -F "satellite=TROPOMI" \\
  -F "data_type=NO2" \\
  -F "processing_level=L2"`
    },
    
    process: {
      python: `import requests

def start_processing(upload_id, algorithm='ml'):
    """
    Start data processing with specified algorithm
    
    Args:
        upload_id (str): ID from upload response
        algorithm (str): 'ml', 'statistical', or 'physics'
    """
    
    payload = {
        "upload_id": upload_id,
        "algorithm": algorithm,
        "resolution": "1km",
        "validation": True,
        "output_format": "netcdf"
    }
    
    response = requests.post(
        f"{BASE_URL}/api/v1/process",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json=payload
    )
    
    return response.json()

# Example usage
job = start_processing("upload_123456", "ml")
print(f"Job ID: {job['job_id']}")
print(f"Estimated time: {job['estimated_time_minutes']} minutes")`,
      
      javascript: `async function startProcessing(uploadId, algorithm = 'ml') {
    const payload = {
        upload_id: uploadId,
        algorithm: algorithm,
        resolution: '1km',
        validation: true,
        output_format: 'netcdf'
    };
    
    const response = await fetch(\`\${BASE_URL}/api/v1/process\`, {
        method: 'POST',
        headers: {
            'Authorization': \`Bearer \${API_KEY}\`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    return await response.json();
}

// Example usage
startProcessing('upload_123456', 'ml')
    .then(job => {
        console.log('Job ID:', job.job_id);
        console.log('Estimated time:', job.estimated_time_minutes, 'minutes');
    });`,
      
      curl: `curl -X POST "https://api.satelliteno2.org/api/v1/process" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "upload_id": "upload_123456",
    "algorithm": "ml",
    "resolution": "1km",
    "validation": true,
    "output_format": "netcdf"
  }'`
    }
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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
              API Documentation
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Integrate satellite NO₂ data processing capabilities into your applications with our 
              comprehensive REST API. Process data programmatically and access results in real-time.
            </p>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">REST API</div>
            <div className="text-sm text-gray-600">JSON over HTTPS</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">API Keys</div>
            <div className="text-sm text-gray-600">Bearer Authentication</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">Rate Limits</div>
            <div className="text-sm text-gray-600">1000 req/hour</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">Version</div>
            <div className="text-sm text-gray-600">v1.3.2</div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URL</h3>
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                https://api.satelliteno2.org
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Key className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Get Your API Key</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  API keys are available to registered researchers and institutions. 
                  Contact our support team or visit your account dashboard to generate your key.
                </p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Request API Key
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Endpoint Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">API Endpoints</h3>
              <div className="space-y-2">
                {endpoints.map(endpoint => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedEndpoint === endpoint.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{endpoint.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      } ${selectedEndpoint === endpoint.id ? 'bg-white/20 text-white' : ''}`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <div className={`text-xs ${
                      selectedEndpoint === endpoint.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {endpoint.path}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Endpoint Documentation */}
          <div className="lg:col-span-3">
            {selectedEndpoint && (
              <div className="bg-white rounded-xl shadow-lg">
                {/* Endpoint Header */}
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {endpoints.find(e => e.id === selectedEndpoint)?.name}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        endpoints.find(e => e.id === selectedEndpoint)?.method === 'GET' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoints.find(e => e.id === selectedEndpoint)?.method}
                      </span>
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                        {endpoints.find(e => e.id === selectedEndpoint)?.path}
                      </code>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {endpoints.find(e => e.id === selectedEndpoint)?.description}
                  </p>
                </div>

                {/* Code Examples */}
                {codeExamples[selectedEndpoint] && (
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Code Examples</h3>
                    
                    {Object.entries(codeExamples[selectedEndpoint]).map(([language, code]) => (
                      <div key={language} className="mb-8 last:mb-0">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900 capitalize">
                            {language === 'javascript' ? 'JavaScript' : language.toUpperCase()}
                          </h4>
                          <button
                            onClick={() => copyCode(code, `${selectedEndpoint}-${language}`)}
                            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            {copiedCode === `${selectedEndpoint}-${language}` ? (
                              <>
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-600">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}

                    {/* Try It Out Button */}
                    <div className="mt-8 p-6 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">Try it out</h4>
                          <p className="text-green-800 text-sm">
                            Test this endpoint in our interactive API explorer
                          </p>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                          <Play className="w-4 h-4" />
                          <span>Test API</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Response Examples */}
                <div className="p-8 border-t border-gray-200 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Response Format</h3>
                  <div className="bg-gray-900 rounded-lg p-6">
                    <pre className="text-sm text-gray-100">
                      <code>{`{
  "status": "success",
  "data": {
    "job_id": "job_789012",
    "upload_id": "upload_123456",
    "algorithm": "ml",
    "estimated_time_minutes": 12,
    "status": "queued",
    "created_at": "2024-12-15T10:30:00Z"
  },
  "meta": {
    "api_version": "1.3.2",
    "rate_limit_remaining": 995,
    "request_id": "req_abc123"
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SDKs and Libraries */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Python SDK</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Official Python library with built-in data validation and error handling
              </p>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Docs</span>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">R Package</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                R package for statistical analysis and visualization of processed data
              </p>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Docs</span>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">JavaScript SDK</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Client-side library for web applications with real-time updates
              </p>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Docs</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Need API Support?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Our developer support team is ready to help you integrate and optimize your API usage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Contact API Support
              </button>
              <button
                onClick={() => navigate('/help')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                View Examples
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default APIDocsPage;