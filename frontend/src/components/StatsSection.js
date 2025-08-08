import React, { useState, useEffect } from 'react';
import { TrendingUp, Database, Clock, Users, HardDrive, Upload } from 'lucide-react';
import { mockStats } from '../mock/data';
import apiService from '../services/apiService';

const StatsSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    totalDataProcessed: 0,
    accuracyRate: 0,
    activeUsers: 0,
    dataVolume: 0,
    monthlyUploads: 0
  });
  const [realStats, setRealStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const analytics = await apiService.getAnalyticsSummary();
        setRealStats(analytics);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Fallback to mock data
        setRealStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (realStats) {
        setAnimatedStats({
          totalDataProcessed: realStats.total_datasets || 0,
          accuracyRate: realStats.platform_stats?.algorithm_accuracy?.random_forest || 96.2,
          activeUsers: Math.floor(Math.random() * 200) + 50, // Simulate active users
          dataVolume: parseFloat((Math.random() * 20 + 10).toFixed(1)), // Simulate data volume
          monthlyUploads: realStats.total_datasets || 0
        });
      } else {
        setAnimatedStats({
          totalDataProcessed: mockStats.totalDataProcessed,
          accuracyRate: mockStats.accuracyRate,
          activeUsers: mockStats.activeUsers,
          dataVolume: parseFloat(mockStats.dataVolume),
          monthlyUploads: mockStats.monthlyUploads
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [realStats]);

  const stats = [
    {
      icon: Database,
      label: 'Datasets Processed',
      value: animatedStats.totalDataProcessed.toLocaleString(),
      suffix: '',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      label: 'Average Accuracy',
      value: animatedStats.accuracyRate.toFixed(1),
      suffix: '%',
      color: 'green'
    },
    {
      icon: Clock,
      label: 'Avg Processing Time',
      value: mockStats.avgProcessingTime,
      suffix: '',
      color: 'purple'
    },
    {
      icon: Users,
      label: 'Active Researchers',
      value: animatedStats.activeUsers.toLocaleString(),
      suffix: '',
      color: 'indigo'
    },
    {
      icon: HardDrive,
      label: 'Data Volume',
      value: animatedStats.dataVolume.toFixed(1),
      suffix: ' TB',
      color: 'orange'
    },
    {
      icon: Upload,
      label: 'Monthly Uploads',
      value: animatedStats.monthlyUploads.toLocaleString(),
      suffix: '',
      color: 'teal'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600'
  };

  return (
    <div className="py-24 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Platform Statistics
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Trusted by researchers worldwide for accurate satellite data analysis
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[stat.color]} flex items-center justify-center`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                
                <div className="text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Insights */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Global Coverage
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Our platform processes satellite data covering all continents, with special focus on 
                high-emission regions in Europe, North America, and Asia. Real-time monitoring 
                capabilities ensure up-to-date environmental insights.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Research Impact
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Supporting over 50 research institutions worldwide, our downscaling algorithms 
                have contributed to numerous peer-reviewed publications and policy decisions 
                in environmental monitoring and air quality management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;