import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '#/components/newslens/footer'
import Navbar from '#/components/newslens/Navbar'
import BottomNav from '#/components/newslens/BottomNav'

export const Route = createFileRoute('/_authed/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <Navbar />
      <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8">
        {/* pb-24 on mobile adds space so content isn't hidden behind bottom nav */}
        <Outlet />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomNav />
    </div>
  )
}
