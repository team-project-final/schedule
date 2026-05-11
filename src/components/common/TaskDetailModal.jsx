import { useState } from 'react'
import StatusBadge from './StatusBadge'
import CommentList from './CommentList'
import useStore from '../../stores/store'

export default function TaskDetailModal({ task, onClose }) {
  const [comment, setComment] = useState('')
  const user = useStore(s => s.user)
  const addComment = useStore(s => s.addComment)
  const member = useStore(s => s.getMember(task.memberId))

  const handleAdd = () => {
    if (!comment.trim() || !user) return
    addComment(task.id, { author: user.login, text: comment.trim(), timestamp: new Date().toISOString() })
    setComment('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-slate-500 font-mono mb-1">{task.week} · Step {task.stepNumber} · {member?.handle}</p>
              <h3 className="text-lg font-bold text-slate-900">{task.name}</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
          </div>
          <StatusBadge status={task.status} />
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="font-medium text-slate-600">Goal:</span> {task.goal}</p>
            <p><span className="font-medium text-slate-600">Duration:</span> <span className="font-mono">{task.durationDays}일</span></p>
            <p><span className="font-medium text-slate-600">기간:</span> <span className="font-mono">{task.plannedStart} ~ {task.plannedEnd}</span></p>
            <p><span className="font-medium text-slate-600">Priority:</span> <span className={task.priority === 'P0' ? 'text-red-600 font-semibold' : ''}>{task.priority}</span></p>
          </div>
          <hr className="my-4 border-slate-200" />
          <h4 className="font-semibold text-slate-800 mb-2">코멘트</h4>
          <CommentList comments={task.comments} />
          {user && (
            <div className="mt-3 flex gap-2">
              <input className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="코멘트 추가..." value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} />
              <button onClick={handleAdd} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">추가</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
