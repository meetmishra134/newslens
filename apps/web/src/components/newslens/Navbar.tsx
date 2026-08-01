import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

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
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-background border-border sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-350 items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="../../../images/newslens.svg"
            alt="Newslens Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold">Newslens</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="/feed" className="text-sm font-medium hover:underline">
            My Feed
          </a>
          <a href="/explore" className="text-sm font-medium hover:underline">
            Explore
          </a>
          <a href="/trending" className="text-sm font-medium hover:underline">
            Trending
          </a>
          <a href="/bookmarks" className="text-sm font-medium hover:underline">
            Bookmarks
          </a>
        </nav>
        <div className="relative">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-muted h-8 w-8 cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-zinc-300 focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-label="User menu"
          />
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ transformOrigin: 'top right' }}
                className="border-border absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border bg-white p-1.5 shadow-lg"
              >
                <a
                  href="/profile"
                  className="block rounded-lg px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block rounded-lg px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block rounded-lg px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Logout
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Navbar
