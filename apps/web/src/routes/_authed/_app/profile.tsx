import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_app/profile')({
  component: Profile,
})

function Profile() {
  return <div>Hello "/_authed/_app/profile"!</div>
}
