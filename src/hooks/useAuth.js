import { useEffect } from 'react'
import useStore from '../stores/store'

// PAT-based auth — OAuth proxy 없이 직접 GitHub API 호출.
// 권한 게이트: team-project-final/storyboard 레포 collaborator만 통과 (PatLoginModal 참조).
export function useAuth() {
  const user = useStore(s => s.user)
  const setUser = useStore(s => s.setUser)
  const clearUser = useStore(s => s.clearUser)

  // Restore session on mount
  useEffect(() => {
    if (user) return
    const stored = sessionStorage.getItem('gh_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore corrupt */ }
    }
  }, [user, setUser])

  /** Called by PatLoginModal after PAT 검증 + collaborator 확인 통과 */
  const login = (profile) => {
    setUser(profile)
  }

  const logout = () => {
    sessionStorage.removeItem('gh_token')
    sessionStorage.removeItem('gh_user')
    clearUser()
  }

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isCollaborator: !!user?.isCollaborator,
  }
}
