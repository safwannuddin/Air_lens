import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Mail, Phone, MapPin, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Footer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
    }
  };

  const footerLinks = {
    platform: [
      { name: 'Upload Data', href: '/upload' },
      { name: 'Map Viewer', href: '/map' },
      { name: 'Validation', href: '/validation' },
      { name: 'Documentation', href: '/docs' }
    ],
    research: [
      { name: 'About Us', href: '/about' },
      { name: 'Research Team', href: '/team' },
      { name: 'Publications', href: '/publications' },
      { name: 'Partnerships', href: '/partnerships' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'API Docs', href: '/api-docs' },
      { name: 'Contact', href: '/contact' },
      { name: 'Status', href: '/status' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated on Environmental Data
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest updates on satellite data processing, new features, and research insights
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl">AirLens AI</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
                Advanced satellite NO₂ downscaling platform for environmental researchers and institutions. 
                Transform coarse satellite data into high-resolution insights for better air quality monitoring.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>contact@satelliteno2.org</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>Environmental Research Center, University Campus</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Research</h4>
              <ul className="space-y-3">
                {footerLinks.research.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links and Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 AirLens AI Platform. All rights reserved.</p>
              <p className="text-sm">Built for the environmental research community</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;