import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/explore')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Explore</div>
}
