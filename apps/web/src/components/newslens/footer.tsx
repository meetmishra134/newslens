import { Link } from '@tanstack/react-router'
import { Newspaper, Send } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="h-12 border-t border-zinc-200/80 bg-white text-zinc-600">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <Link to="/feed" className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <Newspaper className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">
                NewsLens
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              Your personalized lens on global affairs. Stay informed with
              AI-curated news tailored to your perspectives.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-wider text-zinc-900 uppercase">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/feed"
                  className="transition-colors hover:text-zinc-900"
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="transition-colors hover:text-zinc-900"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmarks"
                  className="transition-colors hover:text-zinc-900"
                >
                  Saved Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Company Column */}
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-wider text-zinc-900 uppercase">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#privacy"
                  className="transition-colors hover:text-zinc-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="transition-colors hover:text-zinc-900"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-zinc-900"
                >
                  About NewsLens
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-1">
            <p className="text-sm font-semibold tracking-wider text-zinc-900 uppercase">
              Stay Updated
            </p>
            <p className="text-xs text-zinc-500">
              Get weekly curated summaries directly in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-1.5">
              <input
                type="email"
                placeholder="you@example.com"
                className="focus:border-primary focus:ring-primary h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-900 transition-all placeholder:text-zinc-400 focus:ring-1 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white transition-all hover:bg-zinc-800"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 text-xs text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} NewsLens Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
