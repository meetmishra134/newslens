import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Feed</div>
}
