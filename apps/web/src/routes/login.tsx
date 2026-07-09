import LoginForm from '#/components/auth/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#FFF1F2_0%,#FFF7ED_28%,#FFFFFF_62%,#F8FAFC_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-red-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <LoginForm />
    </div>
  )
}
