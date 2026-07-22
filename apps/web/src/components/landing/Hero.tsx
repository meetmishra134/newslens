import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: '1300px auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
      }}
      className="relative flex min-h-screen items-center bg-white px-4 pt-40 pb-24"
      id="hero"
    >
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <div className="group relative z-1 inline-flex overflow-hidden rounded-full p-px">
          <div className="absolute inset-0 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#ef4444_80deg,transparent_140deg,transparent_360deg)]" />

          <div className="relative z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <Sparkles className="h-4 w-4 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />

            <span className="text-sm font-medium text-red-600">
              AI-powered news aggregation
            </span>
          </div>
        </div>
        <h1 className="mt-3 text-center text-5xl leading-tight font-extrabold tracking-normal md:text-7xl">
          <span className="text-zinc-900">Every Perspective</span>
          <br />
          <span className="text-primary">One Lens</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl bg-linear-to-r from-gray-500 to-gray-700 bg-clip-text text-center text-base leading-relaxed text-transparent md:max-w-2xl md:text-lg">
          Aggregate news from trusted publishers, compare viewpoints side by
          side, and understand the full story with AI-powered insights.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="bg-primary rounded-full px-7 py-5 font-medium text-white hover:bg-[#c93f3e]">
            Get Started
          </Button>

          <Button className="rounded-full border border-neutral-300 bg-gray-100 px-7 py-5 font-medium text-gray-800 shadow-sm hover:bg-gray-200">
            Dashboard
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
