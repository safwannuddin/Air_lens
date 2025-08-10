'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {mounted && [...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Latest integration just arrived</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Amplify Every
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Festival Moment
              </span>
              <br />
              with AI
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Transform your festival marketing with intelligent campaign generation, cultural insights, 
              and automated content that resonates with every audience.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Get Started Free
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 pt-8">
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Festivals Powered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">10M+</div>
              <div className="text-sm text-gray-400">Campaigns Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-400">Engagement Boost</div>
            </div>
          </div>
        </div>

        {/* Right Content - AI Visualization */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-96 h-96">
            {/* Main AI Head Silhouette */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            
            {/* Wireframe Head */}
            <div className="relative w-full h-full">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Head outline */}
                <path
                  d="M200 50 C250 50, 300 100, 300 200 C300 300, 250 350, 200 350 C150 350, 100 300, 100 200 C100 100, 150 50, 200 50"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                
                {/* Neural network lines */}
                {[...Array(20)].map((_, i) => (
                  <line
                    key={i}
                    x1={150 + Math.random() * 100}
                    y1={150 + Math.random() * 100}
                    x2={150 + Math.random() * 100}
                    y2={150 + Math.random() * 100}
                    stroke="url(#gradient2)"
                    strokeWidth="1"
                    opacity="0.6"
                    className="animate-pulse"
                    style={{
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  />
                ))}
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating elements */}
            {mounted && [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}