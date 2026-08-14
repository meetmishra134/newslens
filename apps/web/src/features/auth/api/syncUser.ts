import { api } from '#/lib/axios'

export const syncUser = async ({ token }: { token: string | null }) => {
  try {
    if (!token) {
      throw new Error('No authentication token available')
    }
    const response = await api.post(
      '/auth/sync',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error syncing user:', error)
  }
}
