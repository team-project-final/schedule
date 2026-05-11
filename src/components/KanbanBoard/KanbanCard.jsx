import { Draggable } from '@hello-pangea/dnd'
import useStore from '../../stores/store'

const WEEK_VARIANT = {
  W1: 'producer', W2: 'producer', W3: 'producer',
  W4: 'consumer',
  W5: 'outline',
}

export default function KanbanCard({ task, index, onClick }) {
  const member = useStore(s => s.getMember(task.memberId))
  const variant = WEEK_VARIANT[task.week] || 'producer'

  const stripe = variant === 'consumer' ? 'var(--oxblood)' : 'var(--ink)'
  const bgTint = variant === 'consumer'
    ? 'linear-gradient(90deg, rgba(122,36,38,0.04), transparent 60%)'
    : 'transparent'

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="cursor-pointer anim-fade kanban-card"
          onClick={() => onClick(task)}
          style={{
            background: 'var(--paper)',
            backgroundImage: bgTint,
            border: '1px solid var(--ink)',
            boxShadow: snapshot.isDragging
              ? '4px 4px 0 0 var(--ink)'
              : `inset 4px 0 0 0 ${stripe}`,
            padding: '10px 12px',
            animationDelay: `${Math.min(index * 24, 400)}ms`,
            transition: 'box-shadow 160ms ease',
          }}
          data-variant={variant}
        >
          {/* Top row : assembly number + revision stamp */}
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="font-mono text-[9px] tracking-mono"
              style={{ color: 'var(--ink-soft)' }}
            >
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{task.id.toUpperCase()}</span>
              <span style={{ margin: '0 6px' }}>·</span>
              <span>{task.week}</span>
            </span>
            <span
              className="font-mono text-[9px] tracking-mono font-semibold"
              style={{ color: task.priority === 'P0' ? 'var(--oxblood)' : 'var(--ink-soft)' }}
            >
              {task.priority || 'P0'}
            </span>
          </div>

          {/* Name */}
          <p
            className="font-mono text-[12px] mb-2 leading-snug"
            style={{ color: 'var(--ink)' }}
          >
            {task.name}
          </p>

          {/* Bottom row : assignee + duration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img
                src={member?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.handle || '')}&size=20&background=ECE3CB&color=0E2F50`}
                alt=""
                className="w-4 h-4"
                style={{ border: '1px solid var(--ink)', borderRadius: '0' }}
              />
              <span
                className="font-mono text-[10px]"
                style={{ color: 'var(--ink-soft)', letterSpacing: '0.04em' }}
              >
                {member?.handle}
              </span>
            </div>
            <span
              className="font-mono text-[9px] tracking-mono"
              style={{ color: 'var(--ink-soft)' }}
            >
              {task.durationDays}d
            </span>
          </div>
        </div>
      )}
    </Draggable>
  )
}
