import { useState } from 'react'
import useStore from '../stores/store'

export default function SettingsPage() {
  const members = useStore(s => s.members)
  const updateMemberName = useStore(s => s.updateMemberName)
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')

  const startEdit = (member) => {
    setEditing(member.id)
    setDraft(member.name || '')
  }

  const save = (memberId) => {
    updateMemberName(memberId, draft.trim())
    setEditing(null)
    setDraft('')
  }

  const cancel = () => {
    setEditing(null)
    setDraft('')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-2">팀원 이름 설정</h2>
      <p className="text-sm text-slate-500 mb-6">
        각 담당자의 표시 이름을 설정합니다. 이름을 비우면 핸들(@handle)로 표시됩니다.
        <br />설정은 브라우저에 저장되어 다음 방문 시에도 유지됩니다.
      </p>

      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
        {members.map(member => (
          <div key={member.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || member.handle)}&size=36&background=e2e8f0&color=475569`}
                alt="" className="w-9 h-9 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  {editing === member.id ? (
                    <input
                      className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
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
                    <span className="text-sm font-medium text-slate-800">
                      {member.name || <span className="text-slate-400 italic">이름 미설정</span>}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{member.handle} &middot; {member.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {editing === member.id ? (
                <>
                  <button onClick={() => save(member.id)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">저장</button>
                  <button onClick={cancel}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-md hover:bg-slate-200">취소</button>
                </>
              ) : (
                <button onClick={() => startEdit(member)}
                  className="px-3 py-1 border border-slate-300 text-slate-600 text-xs rounded-md hover:bg-slate-50">
                  {member.name ? '수정' : '이름 설정'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        * 설정은 이 브라우저의 localStorage에 저장됩니다.
      </p>
    </div>
  )
}
