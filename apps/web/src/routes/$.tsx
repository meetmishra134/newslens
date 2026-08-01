import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: NotFoundComponent,
})

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <h2 className="text-sm font-bold sm:text-lg md:text-xl lg:text-3xl">
        Page Not Found
      </h2>
    </div>
  )
}
