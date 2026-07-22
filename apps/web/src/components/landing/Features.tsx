import {
  LayoutGrid,
  Sparkles,
  TrendingUp,
  UserCircle,
  Bookmark,
  Smile,
} from 'lucide-react'
import type { Variants } from 'motion/react'
import { motion } from 'motion/react'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
} satisfies Variants

const item = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
} satisfies Variants

const features = [
  {
    icon: <LayoutGrid className="text-primary h-6 w-6" />,
    title: 'Compare perspectives',
    desc: 'Read the same story from multiple trusted publishers side by side.',
  },
  {
    icon: <Sparkles className="text-primary h-6 w-6" />,
    title: 'AI summaries',
    desc: 'Understand every article instantly with concise AI-powered summaries.',
  },
  {
    icon: <Smile className="text-primary h-6 w-6" />,
    title: 'Sentiment analysis',
    desc: 'Understand the tone and emotion behind every headline.',
  },
  {
    icon: <TrendingUp className="text-primary h-6 w-6" />,
    title: 'Trending stories',
    desc: 'Discover what people are reading across trusted news sources.',
  },
  {
    icon: <UserCircle className="text-primary h-6 w-6" />,
    title: 'Personalized feed',
    desc: 'News tailored to your interests, language and location.',
  },
  {
    icon: <Bookmark className="text-primary h-6 w-6" />,
    title: 'Bookmarks',
    desc: 'Save important stories and continue reading anytime.',
  },
]

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-primary inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium">
          Why NewsLens?
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          <span className="block">Everything you need.</span>
          <span className="text-primary mt-3 block">Nothing you don't.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
          Built for people who want to stay informed without drowning in
          headlines.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            variants={item}
            key={feature.title}
            className="group rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-100">
              {feature.icon}
            </div>

            <h3 className="mt-6 text-xl font-semibold text-zinc-900">
              {feature.title}
            </h3>

            <p className="mt-3 leading-7 text-zinc-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Features
