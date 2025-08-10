'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">EP</span>
          </div>
          <span className="text-white font-semibold text-xl">EventPulse</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#use-cases" className="text-gray-300 hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#resources" className="text-gray-300 hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="#login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            <Link href="#features" className="block text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="block text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#use-cases" className="block text-gray-300 hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#resources" className="block text-gray-300 hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="#login" className="block text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <button className="w-full bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}