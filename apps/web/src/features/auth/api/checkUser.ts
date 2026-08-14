import { api } from '#/lib/axios'

export const checkUser = async ({
  email,
}: {
  email: string
}): Promise<{ exists: boolean }> => {
  try {
    const response = await api.post('/auth/check', { email })
    return response.data.data
  } catch (error) {
    console.error('Error checking user:', error)
    throw error
  }
}
