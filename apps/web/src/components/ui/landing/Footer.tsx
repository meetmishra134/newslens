import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-3xl font-bold">
              <span className="text-zinc-900">News</span>
              <span className="text-primary">Lens</span>
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              Every Perspective. One Lens.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Stay informed with trusted news, AI-powered summaries and
              side-by-side comparisons.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-900">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="#features"
                className="text-zinc-600 transition-colors hover:text-primary"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-zinc-600 transition-colors hover:text-primary"
              >
                How it Works
              </a>

              <a
                href="#trending"
                className="text-zinc-600 transition-colors hover:text-primary"
              >
                Trending
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="text-center">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-900">
              Connect
            </h3>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-zinc-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 md:flex-row">
            <p>© 2026 NewsLens. All rights reserved.</p>

            <p>
              Built with ❤️ by{' '}
              <span className="font-medium text-zinc-700">Meet Mishra</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
