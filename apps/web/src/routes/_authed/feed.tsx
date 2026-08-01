import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/feed"!</div>
}
