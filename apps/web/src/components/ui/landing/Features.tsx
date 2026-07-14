import {
  LayoutGrid,
  Sparkles,
  TrendingUp,
  UserCircle,
  Bookmark,
  Smile,
} from 'lucide-react'

const features = [
  {
    icon: <LayoutGrid className="h-6 w-6 text-primary" />,
    title: 'Compare perspectives',
    desc: 'Read the same story from multiple trusted publishers side by side.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: 'AI summaries',
    desc: 'Understand every article instantly with concise AI-powered summaries.',
  },
  {
    icon: <Smile className="h-6 w-6 text-primary" />,
    title: 'Sentiment analysis',
    desc: 'Understand the tone and emotion behind every headline.',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Trending stories',
    desc: 'Discover what people are reading across trusted news sources.',
  },
  {
    icon: <UserCircle className="h-6 w-6 text-primary" />,
    title: 'Personalized feed',
    desc: 'News tailored to your interests, language and location.',
  },
  {
    icon: <Bookmark className="h-6 w-6 text-primary" />,
    title: 'Bookmarks',
    desc: 'Save important stories and continue reading anytime.',
  },
]

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-primary">
          Why NewsLens?
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          <span className="block">Everything you need.</span>
          <span className="mt-3 block text-primary">Nothing you don't.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
          Built for people who want to stay informed without drowning in
          headlines.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-100">
              {feature.icon}
            </div>

            <h3 className="mt-6 text-xl font-semibold text-zinc-900">
              {feature.title}
            </h3>

            <p className="mt-3 leading-7 text-zinc-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
