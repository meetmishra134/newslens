import Hero from '#/components/ui/landing/Hero'
import Navbar from '#/components/ui/landing/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FEE2E2_0%,#FEF2F2_20%,#FFFFFF_60%,#F9FAFB_100%)] ">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
