import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const GATE_REPO = 'team-project-final/storyboard'

/**
 * GitHub Personal Access Token (PAT) login.
 *
 * - OAuth proxy 없이 클라이언트에서 직접 GitHub API 호출 → 토큰 교환 인프라 불필요.
 * - 권한 게이트: GATE_REPO(team-project-final/storyboard)의 collaborator만 통과.
 *   (schedule 레포는 같은 owner라 storyboard collaborator는 schedule write도 가능)
 * - 토큰은 sessionStorage(`gh_token`)에 저장 — 탭 닫으면 휘발.
 */
export default function PatLoginModal({ onClose, onSuccess }) {
  const [pat, setPat] = useState('')
  const [status, setStatus] = useState('idle') // idle | validating | error
  const [error, setError] = useState('')

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleLogin = async () => {
    const token = pat.trim()
    if (!token) return
    setStatus('validating')
    setError('')

    try {
      // 1) PAT 유효성 + user info
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      })
      if (!userRes.ok) {
        throw new Error(userRes.status === 401
          ? 'PAT가 유효하지 않습니다 (401)'
          : `유저 정보 조회 실패 (HTTP ${userRes.status})`)
      }
      const user = await userRes.json()

      // 2) storyboard collaborator 확인 (204 = collaborator, 404 = 아님)
      const collabRes = await fetch(
        `https://api.github.com/repos/${GATE_REPO}/collaborators/${user.login}`,
        { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
      )
      if (collabRes.status === 404) {
        throw new Error(`${user.login}은 ${GATE_REPO} 레포 collaborator가 아닙니다`)
      }
      if (collabRes.status !== 204) {
        throw new Error(`권한 확인 실패 (HTTP ${collabRes.status})`)
      }

      // 3) 저장 + 성공 callback
      const profile = {
        login: user.login,
        avatar_url: user.avatar_url,
        isCollaborator: true,
      }
      sessionStorage.setItem('gh_token', token)
      sessionStorage.setItem('gh_user', JSON.stringify(profile))
      onSuccess(profile)
    } catch (e) {
      setStatus('error')
      setError(e.message)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(14,47,80,0.55)' }}
      onClick={onClose}
    >
      <div
        className="max-w-md w-full"
        style={{
          background: 'var(--paper)',
          backgroundImage:
            'linear-gradient(var(--ink-grid) 0.5px, transparent 0.5px),' +
            'linear-gradient(90deg, var(--ink-grid) 0.5px, transparent 0.5px)',
          backgroundSize: '16px 16px, 16px 16px',
          border: '1px solid var(--ink)',
          boxShadow: '0 24px 48px rgba(14,47,80,0.30), 0 0 0 8px var(--paper) inset, 0 0 0 9px var(--ink-faint) inset',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Drawing meta header */}
          <div
            className="flex items-baseline justify-between mb-4 pb-3"
            style={{ borderBottom: '1px solid var(--ink)' }}
          >
            <div>
              <p
                className="font-mono text-[10px] tracking-mono mb-1"
                style={{ color: 'var(--ink-soft)' }}
              >
                <span style={{ color: 'var(--oxblood)' }}>AUTH</span> · GITHUB PAT
              </p>
              <h3
                className="font-display font-bold uppercase tracking-wide leading-tight"
                style={{ fontSize: '24px', color: 'var(--ink)' }}
              >
                LOGIN · {GATE_REPO.split('/')[1].toUpperCase()} GATE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="font-mono"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                width: '28px',
                height: '28px',
                border: '1px solid var(--ink)',
                fontSize: '14px',
                lineHeight: 1,
              }}
              aria-label="close"
            >
              ✕
            </button>
          </div>

          <p
            className="font-mono text-[11px] leading-relaxed mb-4"
            style={{ color: 'var(--ink-soft)' }}
          >
            <strong style={{ color: 'var(--oxblood)' }}>{GATE_REPO}</strong> 레포의 owner 또는 collaborator만
            카드 status를 변경할 수 있습니다. GitHub Personal Access Token으로 인증하세요.
          </p>

          <input
            className="input-ink w-full mb-3"
            type="password"
            placeholder="ghp_... 또는 github_pat_..."
            value={pat}
            onChange={(e) => setPat(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            autoFocus
            disabled={status === 'validating'}
          />

          {error && (
            <div
              className="font-mono text-[11px] p-2 mb-3"
              style={{ background: 'var(--oxblood-soft)', color: 'var(--oxblood)', border: '1px solid var(--oxblood)' }}
            >
              ✗ {error}
            </div>
          )}

          <div className="flex gap-2 mb-5">
            <button
              onClick={handleLogin}
              disabled={status === 'validating' || !pat.trim()}
              className="btn-ink flex-1"
              style={{ opacity: status === 'validating' || !pat.trim() ? 0.5 : 1 }}
            >
              {status === 'validating' ? 'VERIFYING…' : 'VERIFY & LOGIN'}
            </button>
            <button onClick={onClose} className="btn-outline">CANCEL</button>
          </div>

          {/* PAT 생성 안내 */}
          <details
            className="font-mono text-[10px]"
            style={{ borderTop: '1px dashed var(--ink-faint)', paddingTop: '12px', color: 'var(--ink-soft)' }}
          >
            <summary
              className="cursor-pointer mb-2"
              style={{ color: 'var(--ink)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              § PAT 생성 가이드
            </summary>
            <ol className="space-y-1 pl-4" style={{ listStyle: 'decimal' }}>
              <li>GitHub → Settings → Developer settings</li>
              <li>Personal access tokens → <strong>Fine-grained tokens</strong> → "Generate new token"</li>
              <li>Resource owner: <strong style={{ color: 'var(--ink)' }}>team-project-final</strong></li>
              <li>Repository access: <strong style={{ color: 'var(--ink)' }}>storyboard, schedule</strong> 두 개 선택</li>
              <li>Repository permissions:<br/>· <code>Contents</code>: Read and write<br/>· <code>Metadata</code>: Read</li>
              <li>Generate → 토큰 복사 (한 번만 표시됨)</li>
              <li>여기 입력 → VERIFY</li>
            </ol>
            <p
              className="mt-3 pt-2"
              style={{ borderTop: '1px dashed var(--ink-faint)', color: 'var(--oxblood)' }}
            >
              ⚠ 토큰은 이 브라우저 세션(sessionStorage)에만 저장됩니다. 탭 닫으면 사라집니다.
              공용 PC에서 사용 금지.
            </p>
          </details>
        </div>
      </div>
    </div>,
    document.body
  )
}
