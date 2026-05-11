import { Draggable } from '@hello-pangea/dnd'
import useStore from '../../stores/store'
import { STATUS } from '../../utils/statusUtils'

const WEEK_VARIANT = {
  W1: 'producer', W2: 'producer', W3: 'producer',
  W4: 'consumer',
  W5: 'outline',
}

// Status transition map — what actions show on each status card.
const ACTIONS = {
  [STATUS.NOT_STARTED]: [
    { to: STATUS.IN_PROGRESS, label: '→ IN PROGRESS', variant: 'forward' },
  ],
  [STATUS.IN_PROGRESS]: [
    { to: STATUS.DONE,        label: '→ DONE',        variant: 'forward' },
    { to: STATUS.NOT_STARTED, label: '← RESET',       variant: 'backward' },
  ],
  [STATUS.DONE]: [
    { to: STATUS.NOT_STARTED, label: '← RESET',       variant: 'backward' },
  ],
}

export default function KanbanCard({ task, index, onClick }) {
  const member = useStore(s => s.getMember(task.memberId))
  const user = useStore(s => s.user)
  const updateTaskStatus = useStore(s => s.updateTaskStatus)
  const variant = WEEK_VARIANT[task.week] || 'producer'
  const actions = ACTIONS[task.status] || []

  const stripe = variant === 'consumer' ? 'var(--oxblood)' : 'var(--ink)'
  const bgTint = variant === 'consumer'
    ? 'linear-gradient(90deg, rgba(122,36,38,0.04), transparent 60%)'
    : 'transparent'

  const handleAction = (e, toStatus) => {
    e.stopPropagation()
    if (!user) {
      // No-op: visual disabled state already prevents the click.
      return
    }
    updateTaskStatus(task.id, toStatus)
  }

  // Stop bubbling so neither the card-onClick (modal open) nor the
  // draggable mousedown sensor fires when the user clicks an action button.
  const stopDrag = (e) => e.stopPropagation()

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="cursor-pointer kanban-card"
          onClick={() => onClick(task)}
          style={{
            background: 'var(--paper)',
            backgroundImage: bgTint,
            border: '1px solid var(--ink)',
            boxShadow: snapshot.isDragging
              ? '4px 4px 0 0 var(--ink)'
              : `inset 4px 0 0 0 ${stripe}`,
            padding: '10px 12px',
            transition: 'box-shadow 120ms ease',
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

          {/* Middle row : assignee + duration */}
          <div className="flex items-center justify-between mb-2">
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

          {/* Action buttons — status transitions (fallback for non-working dnd) */}
          {actions.length > 0 && (
            <div
              className="flex gap-1.5 pt-2"
              style={{ borderTop: '1px dashed var(--ink-faint)' }}
              onMouseDown={stopDrag}
              onClick={stopDrag}
            >
              {actions.map(({ to, label, variant: btnVariant }) => {
                const disabled = !user
                const isForward = btnVariant === 'forward'
                return (
                  <button
                    key={to}
                    type="button"
                    onClick={(e) => handleAction(e, to)}
                    disabled={disabled}
                    title={disabled ? '상태 변경은 GitHub 로그인 후 가능합니다' : `${task.status} → ${to}`}
                    className="kanban-action font-mono"
                    data-action={btnVariant}
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      padding: '4px 8px',
                      flex: isForward ? '1 1 auto' : '0 0 auto',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.45 : 1,
                      background: isForward ? 'var(--ink)' : 'var(--paper)',
                      color:      isForward ? 'var(--paper)' : 'var(--ink)',
                      border: '1px solid var(--ink)',
                      transition: 'background 120ms ease, color 120ms ease',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
