import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../../stores/store'

export default function OAuthCallback() {
  const [status, setStatus] = useState('처리 중...')
  const navigate = useNavigate()
  const setUser = useStore(s => s.setUser)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) { setStatus('인증 코드 없음'); return }
    setStatus('토큰 교환 중... (프록시 필요)')
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-slate-600">{status}</p>
        <button onClick={() => navigate('/')} className="mt-4 text-sm text-blue-600 hover:underline">홈으로</button>
      </div>
    </div>
  )
}
