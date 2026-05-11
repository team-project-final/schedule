import GanttBar from './GanttBar'
import MemberAvatar from '../common/MemberAvatar'
import { TOTAL_BUSINESS_DAYS, DAY_WIDTH } from '../../utils/dateUtils'

export default function GanttRow({ member, tasks, onTaskClick }) {
  return (
    <div className="flex" style={{ borderBottom: '1px solid var(--ink-faint)' }}>
      {/* Track label cell — sticky left */}
      <div
        className="w-56 flex-shrink-0 sticky left-0 z-10 px-4 py-3 flex items-center gap-3"
        style={{
          background: 'var(--paper-2)',
          borderRight: '1px solid var(--ink)',
          minHeight: '56px',
        }}
      >
        <MemberAvatar member={member} size={28} />
        <div className="min-w-0">
          <div
            className="font-mono text-[11px] font-semibold uppercase tracking-wider truncate"
            style={{ color: 'var(--ink)' }}
          >
            {member.handle}
          </div>
          <div
            className="font-mono text-[9px] tracking-mono truncate"
            style={{ color: 'var(--ink-soft)' }}
          >
            {(member.modules || []).slice(0, 2).join(' · ')}
          </div>
        </div>
      </div>

      {/* Timeline area */}
      <div
        className="relative"
        style={{
          width: TOTAL_BUSINESS_DAYS * DAY_WIDTH,
          height: '56px',
          backgroundImage:
            'linear-gradient(var(--ink-grid) 0.5px, transparent 0.5px),' +
            'linear-gradient(90deg, var(--ink-grid) 0.5px, transparent 0.5px)',
          backgroundSize: `${DAY_WIDTH}px ${DAY_WIDTH}px, ${DAY_WIDTH}px ${DAY_WIDTH}px`,
        }}
      >
        {tasks.map(t => (
          <GanttBar key={t.id} task={t} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  )
}
