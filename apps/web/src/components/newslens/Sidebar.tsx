import { useState, useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import {
  Newspaper,
  Compass,
  Bookmark,
  Menu,
  X,
  User,
  TrendingUp,
} from 'lucide-react'
import { Button } from '#/components/ui/button'

const NAV_ITEMS = [
  { label: 'Feed', href: '/feed', icon: Newspaper },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Trending', href: '/trending', icon: TrendingUp },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur-md md:hidden">
        <Link to="/feed" className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <img
              src="../../../images/newslens.svg"
              alt="Newslens Logo"
              className="h-5 w-5"
            />
          </div>
          <span className="font-bold tracking-tight text-zinc-900">
            NewsLens
          </span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="rounded-lg text-zinc-600 hover:bg-zinc-100"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <aside className="hidden h-screen w-64 flex-col border-r border-zinc-200/80 bg-white md:sticky md:top-0 md:flex">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-xs md:hidden"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl md:hidden"
            >
              <div className="flex justify-end p-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg text-zinc-500 hover:bg-zinc-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent() {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link to="/feed" className="flex items-center gap-2 px-2 pt-2">
          <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <img
              src="../../../images/newslens.svg"
              alt="Newslens Logo"
              className="h-5 w-5"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            NewsLens
          </span>
        </Link>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? 'text-white' : 'text-zinc-500'}`}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-100 pt-4">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-zinc-900">
              My Profile
            </span>
            <span className="text-[10px] text-zinc-500">Account settings</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Sidebar
