import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_app/settings')({
  component: Settings,
})

function Settings() {
  return <div>Hello "/_authed/_app/settings"!</div>
}
