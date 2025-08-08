import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  Map, 
  BarChart3, 
  BookOpen, 
  Info, 
  Shield, 
  Search, 
  Bell, 
  User,
  Menu,
  X
} from 'lucide-react';
import { mockUserData, mockActiveJobs } from '../mock/data';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Upload & Predict', url: '/upload', icon: Upload },
    { title: 'Map Viewer', url: '/map', icon: Map },
    { title: 'Validation', url: '/validation', icon: BarChart3 },
    { title: 'Documentation', url: '/docs', icon: BookOpen },
    { title: 'About', url: '/about', icon: Info },
    { title: 'Admin Panel', url: '/admin', icon: Shield, adminOnly: true }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Mock search functionality
    }
  };

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || mockUserData.role === 'admin'
  );

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">AirLens AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredMenuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.url}
                  onClick={() => navigate(item.url)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Search & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search datasets..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </form>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
                {mockActiveJobs > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {mockActiveJobs}
                  </span>
                )}
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={mockUserData.avatar}
                  alt={mockUserData.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{mockUserData.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{mockUserData.role}</p>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {filteredMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.url}
                    onClick={() => {
                      navigate(item.url);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;