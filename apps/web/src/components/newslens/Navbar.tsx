import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { LogOut, Settings, User } from 'lucide-react'

const navLinks = [
  { name: 'My Feed', href: '/dashboard/feed' },
  { name: 'Explore', href: '/dashboard/explore' },
  { name: 'Trending', href: '/dashboard/trending' },
  { name: 'Bookmarks', href: '/dashboard/bookmarks' },
]
const dropdownLinks = [
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Logout', icon: LogOut },
]

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      console.log('Dropdown is open, adding event listener')
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-background border-border sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img
            src="../../../images/newslens.svg"
            alt="Newslens Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold">Newslens</h1>
        </div>
        <nav className="flex items-center space-x-10">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="relative text-[15px] font-medium after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-zinc-900 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="relative" ref={dropdownRef}>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-muted h-9 w-9 cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-zinc-300 focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-label="User menu"
          />
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ transformOrigin: 'top right' }}
                className="border-border absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border bg-white p-1.5 shadow-lg"
              >
                {dropdownLinks.map((link, idx) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={idx}
                      to={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition-transform hover:translate-x-1 hover:bg-zinc-100"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </motion.div>
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Navbar
