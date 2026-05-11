import { useEffect } from 'react'
import useStore from '../stores/store'

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || ''
const REDIRECT_URI = `${window.location.origin}/schedule/login/callback`

export function useAuth() {
  const user = useStore(s => s.user)
  const setUser = useStore(s => s.setUser)
  const clearUser = useStore(s => s.clearUser)

  useEffect(() => {
    const stored = sessionStorage.getItem('gh_user')
    if (stored && !user) setUser(JSON.parse(stored))
  }, [])

  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`
  }

  const logout = () => {
    sessionStorage.removeItem('gh_token')
    sessionStorage.removeItem('gh_user')
    clearUser()
  }

  return { user, login, logout, isAuthenticated: !!user }
}
