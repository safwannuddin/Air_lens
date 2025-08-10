import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <Hero />
      <Features />
    </main>
  )
}