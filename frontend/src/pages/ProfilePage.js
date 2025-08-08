import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, Settings, Download, Calendar, BarChart3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockUserData, mockSatelliteData } from '../mock/data';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const userStats = {
    datasetsProcessed: 127,
    totalAccuracy: 94.2,
    joinDate: 'March 2023',
    lastLogin: 'Today at 2:30 PM'
  };

  const sections = [
    { id: 'profile', name: 'Profile Information', icon: User },
    { id: 'activity', name: 'Recent Activity', icon: BarChart3 },
    { id: 'settings', name: 'Account Settings', icon: Settings }
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
          
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={mockUserData.avatar}
              alt={mockUserData.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{mockUserData.name}</h1>
              <p className="text-xl text-gray-600">{mockUserData.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium capitalize">{mockUserData.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}

            {/* User Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Datasets Processed:</span>
                  <span className="font-bold text-blue-600">{userStats.datasetsProcessed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Accuracy:</span>
                  <span className="font-bold text-green-600">{userStats.totalAccuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-medium text-gray-900">{userStats.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Login:</span>
                  <span className="font-medium text-gray-900">{userStats.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'profile' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={mockUserData.name}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={mockUserData.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={mockUserData.role}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 capitalize"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                    <input
                      type="text"
                      value="Environmental Research Laboratory"
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Research Interests</label>
                  <textarea
                    value="Atmospheric chemistry, satellite remote sensing, air quality modeling, environmental data analysis, machine learning applications in atmospheric science"
                    readOnly
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>

                <div className="mt-8 flex space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'activity' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activity</h2>
                
                <div className="space-y-6">
                  {mockSatelliteData.map((dataset) => (
                    <div key={dataset.id} className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        dataset.status === 'completed' ? 'bg-green-100' :
                        dataset.status === 'processing' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <BarChart3 className={`w-6 h-6 ${
                          dataset.status === 'completed' ? 'text-green-600' :
                          dataset.status === 'processing' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
                        <p className="text-sm text-gray-600">{dataset.location} • Accuracy: {dataset.accuracy}</p>
                        <p className="text-xs text-gray-500 mt-1">{dataset.uploadDate}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          dataset.status === 'completed' ? 'bg-green-100 text-green-800' :
                          dataset.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {dataset.status}
                        </span>
                        
                        {dataset.status === 'completed' && (
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View All Activity →
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>
                
                <div className="space-y-8">
                  {/* Notification Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your data processing</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Processing Alerts</p>
                          <p className="text-sm text-gray-600">Get notified when processing completes</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Weekly Reports</p>
                          <p className="text-sm text-gray-600">Weekly summary of your activity</p>
                        </div>
                        <input type="checkbox" className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Profile Visibility</p>
                          <p className="text-sm text-gray-600">Make your profile visible to other researchers</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Data Sharing</p>
                          <p className="text-sm text-gray-600">Allow anonymized usage statistics</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-center space-x-2 p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Download My Data</span>
                      </button>
                      
                      <button className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <User className="w-5 h-5" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;