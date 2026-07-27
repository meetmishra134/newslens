import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ClerkProvider } from '@clerk/react'
import { Toaster } from './components/ui/sonner'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl={
        import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
      }
      signUpFallbackRedirectUrl={
        import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
      }
    >
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </ClerkProvider>,
  )
}
