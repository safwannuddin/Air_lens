import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock,
  Server,
  Database,
  Zap,
  Globe,
  Activity,
  TrendingUp,
  Calendar,
  RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StatusPage = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const systemComponents = [
    {
      id: 'api',
      name: 'API Services',
      description: 'Core API endpoints and data processing services',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '120ms',
      lastIncident: 'None in last 30 days',
      icon: Zap
    },
    {
      id: 'database',
      name: 'Database Systems',
      description: 'MongoDB clusters and data storage infrastructure',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '15ms',
      lastIncident: 'None in last 30 days',
      icon: Database
    },
    {
      id: 'processing',
      name: 'Data Processing',
      description: 'Machine learning and statistical processing engines',
      status: 'degraded',
      uptime: '99.85%',
      responseTime: '180ms',
      lastIncident: 'Dec 14, 2024 - 10 min downtime',
      icon: Server
    },
    {
      id: 'storage',
      name: 'File Storage',
      description: 'Satellite data storage and file management systems',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '45ms',
      lastIncident: 'None in last 30 days',
      icon: Database
    },
    {
      id: 'cdn',
      name: 'Content Delivery',
      description: 'Global CDN for fast data access and downloads',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '25ms',
      lastIncident: 'Dec 10, 2024 - Regional slowdown',
      icon: Globe
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Alerts',
      description: 'System health monitoring and notification services',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '5ms',
      lastIncident: 'None in last 30 days',
      icon: Activity
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'Intermittent processing delays for ML algorithms',
      status: 'resolved',
      severity: 'minor',
      startTime: '2024-12-14T08:30:00Z',
      endTime: '2024-12-14T08:40:00Z',
      duration: '10 minutes',
      description: 'Some users experienced longer than usual processing times for machine learning downscaling algorithms due to increased load.',
      resolution: 'Additional processing nodes were automatically provisioned to handle the increased demand.',
      affectedServices: ['Data Processing', 'API Services']
    },
    {
      id: 2,
      title: 'Regional CDN slowdown in Asia-Pacific',
      status: 'resolved',
      severity: 'minor',
      startTime: '2024-12-10T14:15:00Z',
      endTime: '2024-12-10T15:45:00Z',
      duration: '1 hour 30 minutes',
      description: 'Users in Asia-Pacific region experienced slower download speeds for processed data files.',
      resolution: 'CDN configuration was optimized and additional edge servers were activated in the region.',
      affectedServices: ['Content Delivery']
    },
    {
      id: 3,
      title: 'Scheduled maintenance completed successfully',
      status: 'resolved',
      severity: 'maintenance',
      startTime: '2024-12-08T02:00:00Z',
      endTime: '2024-12-08T04:00:00Z',
      duration: '2 hours',
      description: 'Planned database maintenance to improve query performance and storage efficiency.',
      resolution: 'Maintenance completed as scheduled with no issues. System performance improvements observed.',
      affectedServices: ['Database Systems']
    }
  ];

  const metrics = {
    totalUptime: '99.96%',
    avgResponseTime: '85ms',
    dailyRequests: '2.4M',
    activeUsers: '1,247',
    processedData: '45.8TB',
    completedJobs: '12,847'
  };

  const performanceData = [
    { name: 'API Response Time', value: '120ms', trend: 'stable', color: 'green' },
    { name: 'Processing Queue', value: '23 jobs', trend: 'down', color: 'green' },
    { name: 'Storage Usage', value: '78%', trend: 'up', color: 'yellow' },
    { name: 'Error Rate', value: '0.02%', trend: 'down', color: 'green' },
    { name: 'Active Sessions', value: '1,247', trend: 'up', color: 'green' },
    { name: 'Data Throughput', value: '2.3GB/s', trend: 'stable', color: 'green' }
  ];

  const statusConfig = {
    operational: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: CheckCircle,
      label: 'Operational'
    },
    degraded: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      icon: AlertCircle,
      label: 'Degraded Performance'
    },
    outage: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: XCircle,
      label: 'Major Outage'
    },
    maintenance: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: Clock,
      label: 'Maintenance'
    }
  };

  const severityConfig = {
    minor: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Minor' },
    major: { color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Major' },
    critical: { color: 'text-red-600', bgColor: 'bg-red-100', label: 'Critical' },
    maintenance: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Maintenance' }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const overallStatus = systemComponents.some(c => c.status === 'outage') ? 'outage' :
                      systemComponents.some(c => c.status === 'degraded') ? 'degraded' : 'operational';

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
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                System Status
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                Real-time status of our satellite data processing platform and services.
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="mb-8">
          <div className={`rounded-xl p-8 ${statusConfig[overallStatus].bgColor}`}>
            <div className="flex items-center justify-center space-x-4">
              {React.createElement(statusConfig[overallStatus].icon, {
                className: `w-8 h-8 ${statusConfig[overallStatus].color}`
              })}
              <div className="text-center">
                <h2 className={`text-2xl font-bold ${statusConfig[overallStatus].color}`}>
                  {overallStatus === 'operational' ? 'All Systems Operational' :
                   overallStatus === 'degraded' ? 'Some Systems Experiencing Issues' :
                   'System Outage Detected'}
                </h2>
                <p className="text-gray-700 mt-2">
                  Platform uptime: {metrics.totalUptime} • Average response time: {metrics.avgResponseTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.totalUptime}</div>
            <div className="text-xs lg:text-sm text-gray-600">Total Uptime</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.avgResponseTime}</div>
            <div className="text-xs lg:text-sm text-gray-600">Avg Response</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.dailyRequests}</div>
            <div className="text-xs lg:text-sm text-gray-600">Daily Requests</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.activeUsers}</div>
            <div className="text-xs lg:text-sm text-gray-600">Active Users</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <Database className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.processedData}</div>
            <div className="text-xs lg:text-sm text-gray-600">Data Processed</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center">
            <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-lg lg:text-xl font-bold text-gray-900">{metrics.completedJobs}</div>
            <div className="text-xs lg:text-sm text-gray-600">Jobs Completed</div>
          </div>
        </div>

        {/* System Components */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemComponents.map(component => {
              const IconComponent = component.icon;
              const statusInfo = statusConfig[component.status];
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={component.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{component.name}</h3>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{component.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Uptime</p>
                          <p className="font-medium text-gray-900">{component.uptime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Response Time</p>
                          <p className="font-medium text-gray-900">{component.responseTime}</p>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                          <p className="text-gray-500">Last Incident</p>
                          <p className="font-medium text-gray-900 truncate">{component.lastIncident}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceData.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <div className={`p-1 rounded ${
                      metric.trend === 'up' ? 'bg-green-100' :
                      metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${
                        metric.trend === 'up' ? 'text-green-600 rotate-0' :
                        metric.trend === 'down' ? 'text-red-600 rotate-180' :
                        'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Incidents</h2>
          <div className="space-y-4">
            {recentIncidents.map(incident => {
              const severityInfo = severityConfig[incident.severity];
              
              return (
                <div key={incident.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className={`w-6 h-6 ${
                        incident.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityInfo.bgColor} ${severityInfo.color}`}>
                            {severityInfo.label}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium capitalize">
                            {incident.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(incident.startTime)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{incident.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{incident.description}</p>
                      
                      {incident.resolution && (
                        <div className="bg-green-50 rounded-lg p-4 mb-3">
                          <h4 className="font-medium text-green-900 mb-1">Resolution:</h4>
                          <p className="text-green-800 text-sm">{incident.resolution}</p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500">Affected services:</span>
                        {incident.affectedServices.map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Subscribe to status updates and get notified about planned maintenance, 
            incidents, and system improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            You can also follow us on Twitter <strong>@SatelliteNO2Status</strong> for real-time updates
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StatusPage;