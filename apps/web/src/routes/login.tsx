import LoginForm from '#/components/auth/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-12">
      <LoginForm />
    </div>
  )
}
