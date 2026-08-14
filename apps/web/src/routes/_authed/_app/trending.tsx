import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_app/trending')({
  component: Trending,
})

function Trending() {
  return <div>Trending</div>
}
