import { Link } from '@tanstack/react-router'
import { Bookmark, Compass, Newspaper, TrendingUp } from 'lucide-react'
import UserMenu from './UserMenu'
import { useState } from 'react'
import { motion } from 'motion/react'

const navLinks = [
  { name: 'Feed', href: '/feed', icon: Newspaper },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
]

const Navbar = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <header className="bg-background/80 sticky top-0 z-50 h-16 w-full border-b-2 border-neutral-300/90 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-between px-6">
        <Link to="/feed" className="flex shrink-0 items-center gap-2">
          <img src="/images/newslens.svg" alt="NewsLens" className="h-8 w-8" />
          <span className="text-[18px] font-medium">
            <span className="text-zinc-900">News</span>
            <span className="text-primary">Lens</span>
          </span>
        </Link>
        <nav className="hidden items-center p-1 md:flex">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {({ isActive }) => (
                <>
                  {hovered === idx && !isActive && (
                    <motion.span
                      layoutId="navbar-hover"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-zinc-100"
                    />
                  )}

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="bg-primary/10 absolute inset-0 rounded-full"
                    />
                  )}

                  <link.icon
                    className={`relative z-10 h-4 w-4 transition-colors ${
                      isActive ? 'text-primary' : 'text-zinc-400'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span
                    className={`relative z-10 text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-zinc-500'
                    }`}
                  >
                    {link.name}
                  </span>
                </>
              )}
            </Link>
          ))}
        </nav>
        <UserMenu />
      </div>
    </header>
  )
}

export default Navbar
