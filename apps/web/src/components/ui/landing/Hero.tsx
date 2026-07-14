import { Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section
      className="mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-4 py-20"
      id="hero"
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <div className="group relative inline-flex overflow-hidden rounded-full p-px z-1">
          <div className="absolute inset-0 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#ef4444_80deg,transparent_140deg,transparent_360deg)]" />

          <div className="relative z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <Sparkles className="h-4 w-4 text-red-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

            <span className="text-sm font-medium text-red-600">
              AI-powered news aggregation
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-normal text-center mt-3 leading-tight ">
          <span className="text-zinc-900">Every Perspective</span>
          <br />
          <span className="text-primary">One Lens</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-center max-w-xl md:max-w-2xl mx-auto text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-700 leading-relaxed">
          Aggregate news from trusted publishers, compare viewpoints side by
          side, and understand the full story with AI-powered insights.
        </p>
        <button className="mt-6 rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-[#c93f3e]">
          Get Started
        </button>
      </div>
    </section>
  )
}

export default Hero
