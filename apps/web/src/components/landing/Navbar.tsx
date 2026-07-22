import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from 'motion/react'

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Explore', id: 'explore' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [moved, setMoved] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setMoved(latest > 20)
  })

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    })
    setIsOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-5">
      <motion.nav
        animate={{
          y: moved ? 6 : 0,
          width: moved ? '95%' : '100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 28,
        }}
        className="mx-auto max-w-7xl"
      >
        <div
          className={`flex items-center justify-between rounded-full border px-7 py-3 transition-all duration-300 ${
            moved
              ? 'border-zinc-200/70 bg-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl'
              : 'border-white/60 bg-white/65 backdrop-blur-md'
          } `}
        >
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/newslens.svg"
              alt="NewsLens"
              className="h-9 w-9"
            />

            <h1 className="text-lg tracking-tight">
              <span className="font-semibold text-zinc-900">News</span>
              <span className="text-primary font-semibold">Lens</span>
            </h1>
          </Link>

          {/* Desktop */}

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[15px] font-medium text-zinc-500 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-linear-to-r after:from-red-500 after:to-red-400 after:transition-all after:duration-300 hover:text-zinc-900 hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}

          <Link
            to="/login"
            className="hidden rounded-full bg-linear-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-red-500/30 md:block"
          >
            Get Started
          </Link>

          {/* Mobile */}

          <button
            onClick={() => setIsOpen((p) => !p)}
            className="text-zinc-700 md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="mt-3 md:hidden"
            >
              <div className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/90 shadow-xl backdrop-blur-xl">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full border-b border-zinc-100 px-6 py-4 text-left text-zinc-700 transition hover:bg-zinc-50"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="p-5">
                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded-full bg-linear-to-r from-red-500 to-red-600 py-3 font-medium text-white"
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
