import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_app/explore')({
  component: Explore,
})

function Explore() {
  return <div>Explore</div>
}
