import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Trending', id: 'trending' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header className="py-4">
      <nav className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between rounded-full border border-white/50 bg-white/70 px-5 py-3 backdrop-blur-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <img
              src="../../../../images/newslens.svg"
              alt="NewsLens Logo"
              className="h-8 w-8"
            />
            <h1 className="text-[20px]">
              <span className="text-zinc-900 font-medium">News</span>
              <span className="text-primary font-medium">Lens</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[15px] text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <Link
            to="/login"
            className="hidden md:block bg-primary hover:bg-[#c93f3e] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Get started
          </Link>

          <button
            className="md:hidden text-zinc-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute left-4 right-4 z-10 mt-3 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl shadow-lg px-5 py-4 flex flex-col space-y-1 ">
            {NAV_LINKS.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 px-3 py-3 rounded-xl transition-colors ${index !== NAV_LINKS.length - 1 ? 'border-b border-zinc-200' : ''} `}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-zinc-100">
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c93f3e]"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
