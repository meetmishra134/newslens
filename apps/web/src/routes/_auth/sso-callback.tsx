import Loader from '#/components/ui/loader'
import { AuthenticateWithRedirectCallback } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sso-callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Loader />
      <AuthenticateWithRedirectCallback />
    </>
  )
}
