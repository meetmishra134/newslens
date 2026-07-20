import { BookOpen, Clock3, Flame } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const week = [
  { day: 'M', active: true },
  { day: 'T', active: true },
  { day: 'W', active: true },
  { day: 'T', active: true },
  { day: 'F', active: true },
  { day: 'S', active: false },
  { day: 'S', active: false },
]

const Explore = () => {
  return (
    <section id="explore" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-primary">
          Reading Streak
        </div>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Build a habit.
          <br />
          <span className="text-primary">Stay informed every day.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Reading isn't just about today's headlines. NewsLens helps you build a
          consistent habit with streaks, weekly insights and personalized
          recommendations.
        </p>
      </motion.div>

      {/* Product Preview */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-4xl border border-red-100 bg-linear-to-br from-red-50 via-white to-red-50 shadow-sm"
      >
        <div className="grid gap-16 p-2 md:p-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <div className="flex gap-3">
              {week.map((item, index) => (
                <motion.div
                  key={`${item.day}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-medium text-zinc-500">
                    {item.day}
                  </span>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold ${
                      item.active
                        ? 'border-primary bg-primary text-white'
                        : 'border-zinc-200 bg-white text-zinc-500'
                    }`}
                  >
                    {item.day}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 18,
              }}
              className="mt-12 flex items-end gap-4"
            >
              <span className="text-7xl font-bold text-primary">5</span>

              <Flame className="mb-3 h-14 w-14 fill-orange-500 text-orange-500" />

              <div className="mb-3">
                <p className="text-2xl font-semibold text-zinc-900">
                  Day Streak
                </p>

                <p className="text-zinc-600">
                  Keep reading to maintain your streak.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <StatCard
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              title="Articles read this week"
              value="23"
            />

            <StatCard
              icon={<Clock3 className="h-5 w-5 text-primary" />}
              title="Reading time"
              value="4h 20m"
            />

            <StatCard
              title="Favourite category"
              value={
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Technology
                </span>
              }
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

type StatCardProps = {
  icon?: ReactNode
  title: string
  value: ReactNode
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-zinc-700">{title}</span>
      </div>

      <div className="font-semibold text-zinc-900">{value}</div>
    </motion.div>
  )
}

export default Explore
