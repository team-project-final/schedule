import { Droppable } from '@hello-pangea/dnd'
import KanbanCard from './KanbanCard'
import { STATUS_CONFIG } from '../../utils/statusUtils'

const STATUS_INK = {
  not_started: 'var(--grey)',
  in_progress: 'var(--ink)',
  done:        'var(--oxblood)',
}

const STATUS_NUM = {
  not_started: '§01',
  in_progress: '§02',
  done:        '§03',
}

export default function KanbanColumn({ status, tasks, onCardClick, isLast }) {
  const config = STATUS_CONFIG[status]
  const stripe = STATUS_INK[status] || 'var(--ink)'

  return (
    <div className="flex flex-col" style={{ borderRight: isLast ? 'none' : '1px solid var(--ink-faint)' }}>
      {/* Column header — drawing tag */}
      <div
        className="flex items-baseline gap-2 px-4 py-3"
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderBottom: '1px solid var(--ink)',
          boxShadow: `inset 0 -3px 0 0 ${stripe}`,
        }}
      >
        <span
          className="font-mono text-[10px] tracking-mono"
          style={{ color: 'rgba(244,238,220,0.6)' }}
        >
          {STATUS_NUM[status]}
        </span>
        <span className="font-display font-bold uppercase tracking-wider text-[15px]">
          {config.label}
        </span>
        <span
          className="ml-auto font-mono text-[10px] tracking-mono"
          style={{ color: 'rgba(244,238,220,0.7)' }}
        >
          {tasks.length} PARTS
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[300px] p-2 transition-colors space-y-2"
            style={{
              background: snapshot.isDraggingOver ? 'var(--paper-2)' : 'var(--paper)',
              backgroundImage:
                'linear-gradient(var(--ink-grid) 0.5px, transparent 0.5px),' +
                'linear-gradient(90deg, var(--ink-grid) 0.5px, transparent 0.5px)',
              backgroundSize: '16px 16px, 16px 16px',
            }}
          >
            {tasks.length === 0 && (
              <div className="text-center py-16 px-4 anim-fade">
                <div
                  className="inline-block px-5 py-3 mb-3"
                  style={{
                    border: '1px dashed var(--ink-faint)',
                    background: 'var(--paper)',
                  }}
                >
                  <div
                    className="font-script italic"
                    style={{ fontSize: '20px', color: 'var(--oxblood)' }}
                  >
                    — empty bin —
                  </div>
                </div>
                <div
                  className="font-mono text-[10px] tracking-mono"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  NO PARTS IN <strong style={{ color: 'var(--ink)' }}>{config.label}</strong>
                </div>
              </div>
            )}
            {tasks.map((t, i) => (
              <KanbanCard key={t.id} task={t} index={i} onClick={onCardClick} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
