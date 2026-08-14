import Loader from '#/components/ui/loader'
import { useSyncUser } from '#/features/auth/hooks/useSyncUser'
import { useAuth } from '@clerk/react'
import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  component: AuthLayout,
})

function AuthLayout() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const { isLoading: isSyncing } = useSyncUser()
  if (!isLoaded) {
    return <Loader />
  }
  if (!isSignedIn || !userId) {
    return (
      <Navigate
        to="/login"
        search={{
          redirect: location.href,
        }}
        replace
      />
    )
  }

  return <>{isSyncing ? <Loader /> : <Outlet />}</>
}
