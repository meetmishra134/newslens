import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/bookmarks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Bookmarks</div>
}
