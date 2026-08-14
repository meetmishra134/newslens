import { useAuth } from '@clerk/react'
import { useQuery } from '@tanstack/react-query'
import { syncUser } from '../api/syncUser'

export const useSyncUser = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  return useQuery({
    queryKey: ['sync-user'],
    queryFn: async () => {
      const token = await getToken()
      return syncUser({ token })
    },
    enabled: isLoaded && isSignedIn,
  })
}
