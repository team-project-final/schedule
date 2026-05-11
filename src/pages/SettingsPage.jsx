import { useState } from 'react'
import useStore from '../stores/store'

export default function SettingsPage() {
  const members = useStore(s => s.members)
  const updateMemberName = useStore(s => s.updateMemberName)
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')

  const startEdit = (member) => { setEditing(member.id); setDraft(member.name || '') }
  const save = (memberId) => { updateMemberName(memberId, draft.trim()); setEditing(null); setDraft('') }
  const cancel = () => { setEditing(null); setDraft('') }

  return (
    <div className="max-w-2xl mx-auto">
      <header
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 pb-6 mb-6"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <div>
          <h1
            className="font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(40px, 7vw, 90px)', color: 'var(--ink)' }}
          >
            Sheet 99<br />
            Config
          </h1>
          <p
            className="font-script italic mt-3"
            style={{ fontSize: '20px', color: 'var(--oxblood)' }}
          >
            — drawing legend · member names
          </p>
          <p
            className="font-mono text-[11px] tracking-mono mt-4"
            style={{ color: 'var(--ink-soft)' }}
          >
            각 담당자의 표시 이름을 설정합니다. 비우면 핸들(@handle)로 표시. 브라우저 localStorage에 저장됩니다.
          </p>
        </div>
        <table className="titleblock-meta self-start w-full">
          <tbody>
            <tr><td className="k">Drawing No.</td><td className="v">SYN-CFG</td></tr>
            <tr><td className="k">Members</td><td className="v">{members.length}</td></tr>
            <tr><td className="k">Storage</td><td className="v">localStorage</td></tr>
          </tbody>
        </table>
      </header>

      <div style={{ border: '1px solid var(--ink)' }}>
        {members.map((member, i) => (
          <div
            key={member.id}
            className="flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: i < members.length - 1 ? '1px solid var(--ink-faint)' : 'none',
              background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-2)',
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || member.handle)}&size=36&background=ECE3CB&color=0E2F50`}
                alt=""
                style={{ width: 36, height: 36, border: '1px solid var(--ink)' }}
              />
              <div className="leading-tight">
                {editing === member.id ? (
                  <input
                    className="input-ink w-44"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') save(member.id)
                      if (e.key === 'Escape') cancel()
                    }}
                    placeholder="이름 입력..."
                    autoFocus
                  />
                ) : (
                  <div
                    className="font-mono text-[13px]"
                    style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}
                  >
                    {member.name || (
                      <span className="font-script italic" style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>
                        — unnamed
                      </span>
                    )}
                  </div>
                )}
                <span
                  className="font-mono text-[9px] tracking-mono"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {member.handle} · {member.role || '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {editing === member.id ? (
                <>
                  <button onClick={() => save(member.id)} className="btn-ink">SAVE</button>
                  <button onClick={cancel} className="btn-outline">×</button>
                </>
              ) : (
                <button onClick={() => startEdit(member)} className="btn-outline">
                  {member.name ? 'EDIT' : 'NAME'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p
        className="font-mono text-[9px] tracking-mono mt-4"
        style={{ color: 'var(--ink-soft)' }}
      >
        * 이 브라우저에만 저장됩니다 — 동기화 X
      </p>
    </div>
  )
}
