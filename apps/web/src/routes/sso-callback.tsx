import { AuthenticateWithRedirectCallback } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sso-callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthenticateWithRedirectCallback />
}
