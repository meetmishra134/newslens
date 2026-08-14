import Loader from '#/components/ui/loader'
import { useAuth } from '@clerk/react'
import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <Loader />
  }

  return <Navigate to={isSignedIn ? '/feed' : '/login'} replace />
}
