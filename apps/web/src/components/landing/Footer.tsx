const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20">
        <h2 className="text-3xl font-bold">
          <span className="text-zinc-900">News</span>
          <span className="text-primary">Lens</span>
        </h2>

        <p className="mt-4 text-center text-zinc-600">
          Every Perspective. One Lens.
        </p>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <a href="#features" className="hover:text-primary text-zinc-600">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary text-zinc-600">
            How it Works
          </a>
          <a href="#explore" className="hover:text-primary text-zinc-600">
            Explore
          </a>
        </nav>

        <div className="mt-12 w-full border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          © 2026 NewsLens • Built by Meet Mishra
        </div>
      </div>
    </footer>
  )
}

export default Footer
