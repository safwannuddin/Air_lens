'use client'

const features = [
  {
    icon: '🎯',
    title: 'AI Campaign Generation',
    description: 'Create culturally-aware marketing campaigns that resonate with diverse festival audiences automatically.'
  },
  {
    icon: '🌍',
    title: 'Cultural Intelligence',
    description: 'Leverage regional insights and cultural nuances to maximize engagement across different demographics.'
  },
  {
    icon: '📱',
    title: 'Multi-Platform Content',
    description: 'Generate optimized content for Instagram, TikTok, Twitter, and Facebook with platform-specific formatting.'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Track campaign performance and audience engagement with comprehensive analytics and insights.'
  },
  {
    icon: '🎨',
    title: 'Brand Consistency',
    description: 'Maintain your festival\'s unique voice and visual identity across all generated content.'
  },
  {
    icon: '⚡',
    title: 'Instant Deployment',
    description: 'Schedule and deploy campaigns across multiple platforms with one-click automation.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Festival Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create, manage, and optimize your festival marketing campaigns with AI-powered precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}