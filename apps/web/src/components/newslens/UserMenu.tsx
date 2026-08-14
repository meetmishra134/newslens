import { useUser, useClerk } from '@clerk/react'
import { Link, useRouterState } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { User, Settings, LogOut } from 'lucide-react'

const dropdownLinks = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const UserMenu = ({ streak = 3 }: { streak?: number }) => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

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
      // console.log('Dropdown is open, adding event listener')
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [pathname])

  const initials =
    user?.fullName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U'

  return (
    <div className="flex items-center gap-3">
      {streak > 0 && (
        <div className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5">
          <span className="text-sm">🔥</span>
          <span className="text-sm font-medium text-red-700">{streak}</span>
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-label="User menu"
          aria-expanded={isDropdownOpen}
          className="mt-1.5 h-8 w-8 cursor-pointer overflow-hidden rounded-full ring-2 ring-red-200 transition-all hover:ring-red-400 focus:outline-none"
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName ?? 'User'}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-red-50 text-xs font-medium text-red-700">
              {initials}
            </div>
          )}
        </motion.button>
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
              <div className="border-t border-neutral-300 pt-1">
                <button
                  onClick={() => signOut({ redirectUrl: '/login' })}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UserMenu
