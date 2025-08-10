'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0">
        {mounted && [...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Content */}
        <div className="space-y-8 lg:pr-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Latest integration just arrived</span>
          </div>

          {/* Main Headline - Exact match */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Amplify Every</span>
              <br />
              <span className="text-gray-400">Festival Moment</span>
              <br />
              <span className="text-white">with AI</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Transform your festival marketing with intelligent campaign generation, cultural insights, 
              and automated content that resonates with every audience.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Content - AI Head exactly like the image */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-[500px] h-[600px]">
            {/* Main wireframe head */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Head silhouette with wireframe effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 opacity-80"
                  style={{
                    clipPath: `polygon(
                      40% 10%, 60% 10%, 75% 25%, 80% 40%, 85% 60%, 
                      80% 75%, 70% 85%, 60% 90%, 40% 90%, 30% 85%, 
                      20% 75%, 15% 60%, 20% 40%, 25% 25%
                    )`,
                    background: `
                      linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%),
                      linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%),
                      linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
                      linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
                      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)
                    `,
                    backgroundSize: '20px 20px, 20px 20px, 20px 20px, 20px 20px, 100% 100%'
                  }}
                />
                
                {/* Wireframe lines overlay */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 600">
                  {/* Vertical lines */}
                  {[...Array(15)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={50 + i * 30}
                      y1="50"
                      x2={50 + i * 30}
                      y2="550"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                      opacity="0.6"
                    />
                  ))}
                  
                  {/* Horizontal lines */}
                  {[...Array(20)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="50"
                      y1={50 + i * 25}
                      x2="450"
                      y2={50 + i * 25}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                      opacity="0.6"
                    />
                  ))}
                  
                  {/* Facial feature lines */}
                  <circle cx="200" cy="200" r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <circle cx="300" cy="200" r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <path d="M200 280 Q250 300 300 280" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                </svg>
              </div>
            </div>

            {/* Floating particles around the head */}
            {mounted && [...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
      `}</style>
    </div>
  )
}