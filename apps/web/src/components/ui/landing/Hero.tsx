const Hero = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:py-30 ">
      <div className="container flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center leading-tight">
          Every Perspective. One Lens.
        </h1>
        <p className="mt-4 text-base text-center max-w-xl md:max-w-2xl mx-auto text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-700 leading-relaxed">
          Aggregate news from trusted publishers, compare viewpoints side by
          side, and discover the full story with AI-powered summaries and trend
          analysis.
        </p>
        <button className="mt-6 rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-[#c93f3e]">
          Get Started
        </button>
      </div>
    </section>
  )
}

export default Hero
