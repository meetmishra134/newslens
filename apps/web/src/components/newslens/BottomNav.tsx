// src/components/newslens/BottomNav.tsx
import { Link } from '@tanstack/react-router'
import { Home, Compass, TrendingUp, Bookmark } from 'lucide-react'

const navItems = [
  { label: 'Feed', href: '/feed', icon: Home },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Trending', href: '/trending', icon: TrendingUp },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
]

const BottomNav = () => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-zinc-200 bg-white/90 backdrop-blur-xl md:hidden">
      <div className="pb-safe flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors"
            activeProps={{
              className:
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[#E24B4A]',
            }}
            inactiveProps={{
              className:
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-zinc-400',
            }}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-zinc-400'}`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-zinc-400'}`}
                >
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
