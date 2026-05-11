import { useState } from 'react'
import GanttTimeline from './GanttTimeline'
import GanttRow from './GanttRow'
import TaskDetailModal from '../common/TaskDetailModal'
import useStore from '../../stores/store'

export default function GanttChart() {
  const members = useStore(s => s.members)
  const tasks = useStore(s => s.tasks)
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="overflow-x-auto" style={{ border: '1px solid var(--ink)' }}>
        <div className="flex">
          <div
            className="w-56 flex-shrink-0 sticky left-0 z-20 px-4 py-3 font-display font-bold tracking-wider"
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              borderRight: '1px solid var(--ink)',
              fontSize: '14px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '0.04em',
            }}
          >
            TRACK
          </div>
          <GanttTimeline />
        </div>
        {members.map(m => (
          <GanttRow
            key={m.id}
            member={m}
            tasks={tasks.filter(t => t.memberId === m.id)}
            onTaskClick={setSelected}
          />
        ))}
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-5 mt-4 pt-3 font-mono text-[11px] tracking-mono"
        style={{
          color: 'var(--ink-soft)',
          borderTop: '1px dashed var(--ink-faint)',
        }}
      >
        <LegendItem label="CYANOTYPE · producer (W1~W3)">
          <span className="inline-block w-6 h-3" style={{ background: 'var(--ink)', border: '1px solid var(--ink)' }} />
        </LegendItem>
        <LegendItem label="OXBLOOD · consumer (W4)">
          <span className="inline-block w-6 h-3" style={{ background: 'var(--oxblood)', border: '1px solid var(--oxblood)' }} />
        </LegendItem>
        <LegendItem label="OUTLINE · 안정화 / E2E (W5)">
          <span className="inline-block w-6 h-3" style={{ background: 'var(--paper)', border: '1px solid var(--ink)' }} />
        </LegendItem>
        <LegendItem label="HATCHING · holiday (5/25 · 6/3)">
          <span
            className="inline-block w-6 h-3"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, var(--ink-faint) 0, var(--ink-faint) 1px, transparent 1px, transparent 4px)',
              border: '1px solid var(--ink)',
            }}
          />
        </LegendItem>
        <LegendItem label="★ PRESENTATION 6/15 (코드 동결)">
          <span className="dwg-diamond presentation" />
        </LegendItem>
      </div>

      {selected && <TaskDetailModal task={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function LegendItem({ children, label }) {
  return (
    <span className="flex items-center gap-2">
      {children}
      <span>{label}</span>
    </span>
  )
}
