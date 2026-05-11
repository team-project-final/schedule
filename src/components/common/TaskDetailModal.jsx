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
    addComment(task.id, {
      author: user.login,
      text: comment.trim(),
      timestamp: new Date().toISOString(),
    })
    setComment('')
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(14,47,80,0.55)' }}
      onClick={onClose}
    >
      <div
        className="max-w-xl w-full max-h-[85vh] overflow-y-auto"
        style={{
          background: 'var(--paper)',
          backgroundImage:
            'linear-gradient(var(--ink-grid) 0.5px, transparent 0.5px),' +
            'linear-gradient(90deg, var(--ink-grid) 0.5px, transparent 0.5px)',
          backgroundSize: '16px 16px, 16px 16px',
          border: '1px solid var(--ink)',
          boxShadow: '0 24px 48px rgba(14,47,80,0.30), 0 0 0 8px var(--paper) inset, 0 0 0 9px var(--ink-faint) inset',
        }}
        onClick={e => e.stopPropagation()}
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
                <span style={{ color: 'var(--oxblood)' }}>PART</span>
                {' · '}{task.id.toUpperCase()} · {task.week} · STEP {task.stepNumber} · {member?.handle}
              </p>
              <h3
                className="font-display font-bold uppercase tracking-wide leading-tight"
                style={{ fontSize: '24px', color: 'var(--ink)' }}
              >
                {task.name}
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

          <div className="mb-4"><StatusBadge status={task.status} /></div>

          {/* Spec table */}
          <table className="titleblock-meta w-full mb-5">
            <tbody>
              <tr><td className="k">Goal</td><td className="v" style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-mono)' }}>{task.goal || '—'}</td></tr>
              <tr><td className="k">Duration</td><td className="v">{task.durationDays}d</td></tr>
              <tr><td className="k">Period</td><td className="v">{task.plannedStart} → {task.plannedEnd}</td></tr>
              <tr>
                <td className="k">Priority</td>
                <td className="v" style={{ color: task.priority === 'P0' ? 'var(--oxblood)' : 'var(--ink)' }}>
                  {task.priority || 'P0'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Comments */}
          <div
            className="font-mono text-[10px] tracking-mono mb-2"
            style={{ color: 'var(--ink-soft)' }}
          >
            <span style={{ color: 'var(--oxblood)' }}>§NOTES</span> · COMMENTS ({task.comments?.length || 0})
          </div>
          <CommentList comments={task.comments} />

          {user && (
            <div className="mt-3 flex gap-2">
              <input
                className="input-ink flex-1"
                placeholder="코멘트 추가..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
              />
              <button onClick={handleAdd} className="btn-ink">ADD</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
