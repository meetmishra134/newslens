import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_app/bookmarks')({
  component: Bookmarks,
})

function Bookmarks() {
  return <div>Bookmarks</div>
}
