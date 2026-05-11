import { useState } from 'react'
import StatusBadge from '../common/StatusBadge'
import MemberAvatar from '../common/MemberAvatar'
import { getProgressPercent } from '../../utils/statusUtils'

export default function MemberAccordion({ member, tasks, onTaskClick }) {
  const [open, setOpen] = useState(false)
  const progress = getProgressPercent(tasks)

  return (
    <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 transition-colors"
        onClick={() => setOpen(!open)}
        style={{
          borderBottom: open ? '1px solid var(--ink-faint)' : 'none',
          background: open ? 'var(--paper-2)' : 'var(--paper)',
        }}
      >
        <div className="flex items-center gap-3">
          <MemberAvatar member={member} size={32} />
          <div className="text-left">
            <div className="font-mono text-[12px] font-semibold tracking-wider uppercase"
                 style={{ color: 'var(--ink)' }}>
              {member.handle}
            </div>
            <div className="font-mono text-[9px] tracking-mono"
                 style={{ color: 'var(--ink-soft)' }}>
              {member.role || ''} · {tasks.length} TASKS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-[3px]" style={{ background: 'var(--ink-faint)' }}>
              <div className="h-[3px]" style={{ width: `${progress}%`, background: 'var(--ink)' }} />
            </div>
            <span className="font-mono text-[11px] font-semibold w-10 text-right"
                  style={{ color: 'var(--ink)' }}>
              {progress}%
            </span>
          </div>
          <span
            className="font-mono text-[14px] inline-block transition-transform"
            style={{ color: 'var(--ink)', transform: open ? 'rotate(180deg)' : 'none' }}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div>
          {tasks.map(t => (
            <button
              key={t.id}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-[var(--paper-2)]"
              style={{ borderBottom: '1px solid var(--ink-faint)' }}
              onClick={() => onTaskClick(t)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="font-mono text-[9px] tracking-mono shrink-0"
                  style={{
                    color: 'var(--paper)',
                    background: 'var(--ink)',
                    padding: '2px 6px',
                  }}
                >
                  S{String(t.stepNumber).padStart(2, '0')}
                </span>
                <span
                  className="font-mono text-[9px] tracking-mono shrink-0"
                  style={{ color: t.priority === 'P0' ? 'var(--oxblood)' : 'var(--ink-soft)' }}
                >
                  {t.priority || 'P0'}
                </span>
                <span className="font-mono text-[12px] truncate" style={{ color: 'var(--ink)' }}>
                  {t.name}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="hidden md:inline font-mono text-[10px]"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {t.plannedStart?.slice(5)} → {t.plannedEnd?.slice(5)}
                </span>
                <StatusBadge status={t.status} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
