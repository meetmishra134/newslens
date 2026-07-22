import LoginForm from '#/components/auth/LoginForm'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#FFF7F7_0%,#FFFFFF_45%,#F8FAFC_100%)] px-4">
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-200/25 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  )
}
