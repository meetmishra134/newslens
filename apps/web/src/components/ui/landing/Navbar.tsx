import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Explore', id: 'explore' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [moved, setMoved] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    if (latest > 0.02) {
      setMoved(true)
    } else {
      setMoved(false)
    }
  })
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    })

    setIsOpen(false)
  }

  return (
    <header className="sticky top-4 z-50 px-4">
      <motion.nav
        animate={{
          y: moved ? 8 : 0,
          scale: moved ? 0.98 : 1,
        }}
        transition={{ type: 'spring', visualDuration: 0.3, bounce: 0.1 }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="flex items-center justify-between rounded-full border border-white/50 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <img
              src="../../../../images/newslens.svg"
              alt="NewsLens Logo"
              className="h-8 w-8"
            />

            <h1 className="text-[20px]">
              <span className="font-medium text-zinc-900">News</span>
              <span className="font-medium text-primary">Lens</span>
            </h1>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative cursor-pointer text-[15px] text-zinc-600 transition-colors hover:text-zinc-900
                after:absolute after:-bottom-1 after:left-0 after:h-0.5
                after:w-0 after:rounded-full after:bg-primary
                after:transition-all after:duration-300
                hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </div>

          <Link
            to="/login"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c93f3e] md:block"
          >
            Get Started
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-zinc-800 md:hidden"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-3 md:hidden"
            >
              <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-xl backdrop-blur-xl">
                {NAV_LINKS.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`block w-full px-5 py-4 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 ${
                      index !== NAV_LINKS.length - 1
                        ? 'border-b border-zinc-200'
                        : ''
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <div className="border-t border-zinc-200 p-4">
                  <Link
                    to="/login"
                    className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c93f3e]"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}

export default Navbar
