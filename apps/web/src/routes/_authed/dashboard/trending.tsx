import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/trending')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Trending</div>
}
