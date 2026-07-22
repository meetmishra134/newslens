import { motion } from 'motion/react'

const STEPS = [
  {
    id: 1,
    title: 'Discover',
    description:
      'Explore news tailored to your interests from trusted publishers.',
  },
  {
    id: 2,
    title: 'Compare',
    description: 'See different perspectives on the same story side by side.',
  },
  {
    id: 3,
    title: 'Understand',
    description: 'Get AI-powered summaries and insights in seconds.',
  },
]
const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-4 py-24 md:py-32"
    >
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-primary rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium">
          How it works
        </span>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Understand every story in three simple steps.
        </h2>

        <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
          NewsLens helps you discover, compare and understand the news without
          switching between dozens of websites.
        </p>
      </div>

      {/* ---------------- Desktop ---------------- */}
      <div className="mt-20 hidden md:grid md:grid-cols-3 md:gap-8">
        {STEPS.map((step, index) => (
          <div key={step.id} className="relative">
            {/* connector */}
            {index !== STEPS.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                className="absolute top-30 left-full h-0.5 w-8 bg-linear-to-r from-red-200 via-red-300 to-red-200"
              />
            )}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="rounded-3xl border border-zinc-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="bg-primary mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white">
                {step.id}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-zinc-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">{step.description}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ---------------- Mobile ---------------- */}
      <div className="mt-16 space-y-8 md:hidden">
        {STEPS.map((step, index) => (
          <div key={step.id} className="relative">
            {/* connector */}
            {index !== STEPS.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                className="absolute top-full left-1/2 h-8 w-px -translate-x-1/2 bg-linear-to-b from-red-200 via-red-300 to-red-200"
              />
            )}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-center"
            >
              <div className="bg-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-white">
                {step.id}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">{step.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
