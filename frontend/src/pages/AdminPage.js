import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Database, 
  Activity, 
  Settings, 
  BarChart3, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockRecentActivity, mockSatelliteData, mockStats } from '../mock/data';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'data', name: 'Data Management', icon: Database },
    { id: 'system', name: 'System Health', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', status: 'good', color: 'green' },
    { name: 'Memory Usage', value: '67%', status: 'warning', color: 'yellow' },
    { name: 'Storage', value: '23%', status: 'good', color: 'green' },
    { name: 'API Response', value: '120ms', status: 'good', color: 'green' }
  ];

  const recentUsers = [
    { name: 'Dr. Maria Santos', email: 'maria.santos@uni.edu', lastActive: '2 hours ago', status: 'active' },
    { name: 'Prof. John Davis', email: 'john.davis@research.org', lastActive: '1 day ago', status: 'active' },
    { name: 'Dr. Lisa Wang', email: 'lisa.wang@env.gov', lastActive: '3 days ago', status: 'inactive' }
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
          
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-xl text-gray-600">
            Platform administration and system management
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white rounded-t-xl">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-lg">
          {activeTab === 'overview' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Overview</h2>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-900">{mockStats.activeUsers}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900">Active Users</h3>
                  <p className="text-blue-700">Currently online</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Database className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-900">{mockStats.totalDataProcessed}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">Datasets Processed</h3>
                  <p className="text-green-700">Total processed</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-900">{mockStats.accuracyRate}%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900">Avg Accuracy</h3>
                  <p className="text-purple-700">System performance</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-900">{mockStats.dataVolume}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-900">Data Storage</h3>
                  <p className="text-yellow-700">Total data volume</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action} - {activity.dataset}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">System Health</h3>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          {metric.status === 'good' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {metric.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                          {metric.status === 'error' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                          <span className="font-bold text-gray-900">{metric.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add New User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Active</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{user.email}</td>
                        <td className="py-4 px-6 text-gray-600">{user.lastActive}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Data Management</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Backup Data
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Uploads</h3>
                  <div className="space-y-4">
                    {mockSatelliteData.map((dataset) => (
                      <div key={dataset.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{dataset.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            dataset.status === 'completed' ? 'bg-green-100 text-green-800' :
                            dataset.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {dataset.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{dataset.location} • {dataset.resolution}</p>
                        <p className="text-sm text-gray-500">{dataset.uploadDate}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Storage Analytics</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Total Storage Used</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                        <span className="text-sm text-blue-800">23%</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">15.6 TB / 68 TB</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Processing Queue</h4>
                      <p className="text-2xl font-bold text-green-800">3 datasets</p>
                      <p className="text-sm text-green-700">Currently in queue</p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Monthly Growth</h4>
                      <p className="text-2xl font-bold text-yellow-800">+2.3 TB</p>
                      <p className="text-sm text-yellow-700">Data added this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'system' || activeTab === 'settings') && (
            <div className="p-8 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
              <p className="text-gray-600">
                {activeTab === 'system' ? 'System health monitoring' : 'Advanced settings'} features 
                are currently under development.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;