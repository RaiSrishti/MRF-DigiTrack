import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('global')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const monitorTabs = [
    { id: 'global', label: 'Global Monitors', icon: '🌍' },
    { id: 'regional', label: 'Regional Monitors', icon: '🗺️' },
    { id: 'national', label: 'National Monitors', icon: '🏛️' },
    { id: 'special', label: 'Special Reports', icon: '📊' }
  ]

  const newsItems = [
    {
      title: 'ECOSWEEE Projects Successfully Completed',
      date: '21 February 2025',
      excerpt: 'After having run twenty pilots across Europe in the past two years, the ECOSWEEE project has presented significant results...',
      category: 'Project Update'
    },
    {
      title: 'Plastic Monitoring with New Statistical Guidelines',
      date: '18 December 2024',
      excerpt: 'As the world gathers momentum toward addressing plastic pollution, robust data becomes the backbone of impactful policies...',
      category: 'Research'
    },
    {
      title: 'Electronic Waste Rising Five Times Faster',
      date: '20 March 2024',
      excerpt: 'The world\'s generation of electronic waste is rising five times faster than documented e-waste recycling...',
      category: 'Global Impact'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with animated background */}
      <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                MRF DigiTrack
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
                <Link to="/app/reports" className="text-gray-600 hover:text-primary-600 transition-colors">Reports</Link>
                <Link to="/app/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
                <Link to="/app/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
              </nav>
            </div>
            <nav className="flex items-center space-x-4">
              {user ? (
                <Link to="/app" className="btn btn-primary animate-pulse-slow">Go to Dashboard</Link>
              ) : (
                <Link to="/login" className="btn btn-primary hover:scale-105 transition-transform">Login</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] z-20"></div>
        <div className="relative z-30 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 animate-slide-top">Digital Tracking for Material Recovery Facilities</h2>
          <p className="text-xl mb-8 animate-slide-top animation-delay-200">Monitor, manage, and optimize your waste management operations with real-time data and analytics</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-top animation-delay-400">
            <Link to="/login" className="btn bg-white text-primary-700 hover:bg-gray-100 transform hover:scale-105 transition-all">
              Get Started
            </Link>
            <Link to="/app/about" className="btn border-2 border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Monitors Section with Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Monitors</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {monitorTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Monitor Cards - Content changes based on activeTab */}
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="card group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="text-primary-600 text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {monitorTabs.find(t => t.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Monitor Title {index + 1}</h3>
                  <p className="text-gray-600 mb-4">Detailed description of the monitor and its key findings...</p>
                  <Link to="/app/reports" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 group hover:bg-primary-50 transition-colors">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-700">Waste Intake Tracking</h3>
              <p className="text-gray-600">Record and monitor incoming waste materials with detailed categorization and weight tracking.</p>
            </div>
            <div className="card p-6 group hover:bg-primary-50 transition-colors">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-700">Sorting Management</h3>
              <p className="text-gray-600">Track sorting operations and material recovery rates with real-time updates.</p>
            </div>
            <div className="card p-6 group hover:bg-primary-50 transition-colors">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-700">Sales & Reporting</h3>
              <p className="text-gray-600">Generate comprehensive reports and manage sales of recovered materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with Animated Counters */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Impact Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-count">1000+</div>
              <div className="text-primary-100">Tons of Waste Processed</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-count">85%</div>
              <div className="text-primary-100">Recovery Rate</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-count">50+</div>
              <div className="text-primary-100">Active Facilities</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-count">24/7</div>
              <div className="text-primary-100">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <div key={index} className="card group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="text-sm text-primary-600 mb-2">{news.category}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">{news.title}</h3>
                  <div className="text-sm text-gray-500 mb-4">{news.date}</div>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <Link to="/app/news" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Enhanced Design */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-400">MRF DigiTrack</h3>
              <p className="text-gray-400">Digital solutions for efficient waste management and material recovery.</p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/app/reports" className="text-gray-400 hover:text-primary-400 transition-colors">Reports</Link></li>
                <li><Link to="/app/about" className="text-gray-400 hover:text-primary-400 transition-colors">About</Link></li>
                <li><Link to="/app/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-400">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/app/docs" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</Link></li>
                <li><Link to="/app/guides" className="text-gray-400 hover:text-primary-400 transition-colors">User Guides</Link></li>
                <li><Link to="/app/api" className="text-gray-400 hover:text-primary-400 transition-colors">API Reference</Link></li>
                <li><Link to="/app/support" className="text-gray-400 hover:text-primary-400 transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-400">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@mrfdigitrack.com
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 1234567890
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Your Location, City, State
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MRF DigiTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 