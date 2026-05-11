import { useAuth } from '../../hooks/useAuth'

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || ''

export default function LoginButton() {
  const { user, login, logout, isAuthenticated } = useAuth()

  // No CLIENT_ID configured → hide login UI so we never bounce to a 404'd
  // GitHub OAuth URL (`https://github.com/login/oauth/authorize?client_id=`).
  // Read-only viewing still works without auth.
  if (!isAuthenticated && !CLIENT_ID) {
    return (
      <span
        className="hidden md:inline font-mono text-[9px] tracking-mono"
        style={{ color: 'rgba(244,238,220,0.45)' }}
        title="OAuth CLIENT_ID 미설정 — read-only 모드"
      >
        READ-ONLY
      </span>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={user.avatar_url}
          alt=""
          className="w-6 h-6"
          style={{ border: '1px solid var(--paper)' }}
        />
        <span
          className="font-mono text-[11px] tracking-wider"
          style={{ color: 'var(--paper)' }}
        >
          {user.login}
        </span>
        <button
          onClick={logout}
          className="font-mono text-[9px] tracking-mono ml-1 transition-colors"
          style={{ color: 'rgba(244,238,220,0.55)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFC9A8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,238,220,0.55)')}
        >
          LOGOUT
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={login}
      className="font-mono text-[10px] tracking-mono flex items-center gap-1.5 px-3 py-1.5 transition-colors"
      style={{
        color: 'var(--paper)',
        background: 'transparent',
        border: '1px solid var(--paper)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--paper)'
        e.currentTarget.style.color = 'var(--ink)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--paper)'
      }}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      LOGIN
    </button>
  )
}
