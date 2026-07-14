import Features from '#/components/ui/landing/Features'
import Footer from '#/components/ui/landing/Footer'
import Hero from '#/components/ui/landing/Hero'
import HowItWorks from '#/components/ui/landing/HowItWorks'
import Navbar from '#/components/ui/landing/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FEE2E2_0%,#FEF2F2_20%,#FFFFFF_60%,#F9FAFB_100%)] ">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
