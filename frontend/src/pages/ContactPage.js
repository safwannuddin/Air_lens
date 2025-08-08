import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Users,
  Building,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'api', name: 'API Integration' },
    { id: 'partnership', name: 'Partnership' },
    { id: 'research', name: 'Research Collaboration' },
    { id: 'billing', name: 'Billing & Account' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'support@satelliteno2.org',
      secondary: 'Response within 24 hours',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      primary: '+1 (555) 123-4567',
      secondary: 'Mon-Fri, 9 AM - 6 PM EST',
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      primary: 'Environmental Research Center',
      secondary: '123 Science Drive, Boston, MA 02101',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      primary: 'Monday - Friday',
      secondary: '9:00 AM - 6:00 PM EST',
      color: 'orange'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Platform Director',
      email: 'sarah.chen@satelliteno2.org',
      department: 'Research & Development',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff&size=80'
    },
    {
      name: 'Michael Torres',
      role: 'Technical Support Lead',
      email: 'michael.torres@satelliteno2.org',
      department: 'User Support',
      image: 'https://ui-avatars.com/api/?name=Michael+Torres&background=10b981&color=fff&size=80'
    },
    {
      name: 'Lisa Wang',
      role: 'Partnership Manager',
      email: 'lisa.wang@satelliteno2.org',
      department: 'Business Development',
      image: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=f59e0b&color=fff&size=80'
    },
    {
      name: 'James Rodriguez',
      role: 'API Developer',
      email: 'james.rodriguez@satelliteno2.org',
      department: 'Platform Engineering',
      image: 'https://ui-avatars.com/api/?name=James+Rodriguez&background=8b5cf6&color=fff&size=80'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      organization: '',
      subject: '',
      category: 'general',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
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
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about our platform, need technical support, or interested in collaboration? 
              We're here to help you make the most of satellite NO₂ data processing.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[info.color]} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.primary}</p>
                <p className="text-gray-600 text-sm">{info.secondary}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your university or organization"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your inquiry, question, or how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Response */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Response Times</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Technical Support</p>
                    <p className="text-sm text-gray-600">&lt; 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">General Inquiries</p>
                    <p className="text-sm text-gray-600">&lt; 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Partnership Requests</p>
                    <p className="text-sm text-gray-600">&lt; 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Contacts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Direct Contacts</h3>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{member.name}</p>
                      <p className="text-sm text-blue-600 truncate">{member.role}</p>
                      <p className="text-xs text-gray-500 truncate">{member.department}</p>
                    </div>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">Frequently Asked Questions</h3>
              </div>
              <p className="text-blue-800 text-sm mb-4">
                Check our FAQ section for instant answers to common questions about platform usage, API integration, and troubleshooting.
              </p>
              <button
                onClick={() => navigate('/help')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Boston Headquarters</h3>
              <p className="text-gray-600 text-sm mb-2">123 Science Drive<br />Boston, MA 02101</p>
              <p className="text-blue-600 text-sm font-medium">Main Research & Development</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">European Office</h3>
              <p className="text-gray-600 text-sm mb-2">Climate Research Center<br />Cambridge, UK</p>
              <p className="text-green-600 text-sm font-medium">European Operations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Asia-Pacific Hub</h3>
              <p className="text-gray-600 text-sm mb-2">Environmental Institute<br />Seoul, South Korea</p>
              <p className="text-purple-600 text-sm font-medium">Regional Support</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Technical Support</h2>
          <p className="text-lg text-red-100 mb-6">
            For critical system issues affecting ongoing research or time-sensitive projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 911-HELP</span>
            </button>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>emergency@satelliteno2.org</span>
            </button>
          </div>
          <p className="text-red-100 text-sm mt-4">Available 24/7 for registered institutional users</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;