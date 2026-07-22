import Explore from '#/components/landing/Explore'
import Features from '#/components/landing/Features'
import Footer from '#/components/landing/Footer'
import HowItWorks from '#/components/landing/HowItWorks'
import Navbar from '#/components/landing/Navbar'
import Hero from '#/components/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FEE2E2_0%,#FEF2F2_20%,#FFFFFF_60%,#F9FAFB_100%)]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Explore />
      </main>
      <Footer />
    </div>
  )
}
