import { useState } from 'react'
import StatusBadge from '../common/StatusBadge'
import ProgressBar from '../common/ProgressBar'
import MemberAvatar from '../common/MemberAvatar'
import { getProgressPercent } from '../../utils/statusUtils'

export default function MemberAccordion({ member, tasks, onTaskClick }) {
  const [open, setOpen] = useState(false)
  const progress = getProgressPercent(tasks)
  return (
    <div className="bg-white rounded-lg border border-slate-200 mb-2">
      <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50" onClick={() => setOpen(!open)}>
        <MemberAvatar member={member} size={28} />
        <div className="flex items-center gap-3">
          <div className="w-24"><ProgressBar percent={progress} size="sm" /></div>
          <span className="text-xs font-mono text-slate-500 w-10 text-right">{progress}%</span>
          <span className={`text-slate-400 transition-transform text-xs ${open ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-4 py-2 space-y-1">
          {tasks.map(t => (
            <div key={t.id} className="flex items-center justify-between py-2 px-2 hover:bg-slate-50 rounded cursor-pointer" onClick={() => onTaskClick(t)}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-6">S{t.stepNumber}</span>
                <span className="text-sm text-slate-700">{t.name}</span>
              </div>
              <StatusBadge status={t.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
