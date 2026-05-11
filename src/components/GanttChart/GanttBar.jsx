import { DAY_WIDTH, getBusinessDayOffset, getBusinessDaysBetween } from '../../utils/dateUtils'

const WEEK_RANGES = {
  W1: ['2026-05-12', '2026-05-15'],
  W2: ['2026-05-18', '2026-05-22'],
  W3: ['2026-05-26', '2026-05-29'],
  W4: ['2026-06-01', '2026-06-05'],
  W5: ['2026-06-08', '2026-06-12'],
}

function getBarVariant(task) {
  // W4 = consumer (oxblood)
  // W5 = outline (안정화 / E2E)
  // W1~W3 = producer (cyanotype solid)
  if (task.week === 'W4') return 'consumer'
  if (task.week === 'W5') return 'outline'
  return 'producer'
}

function isCarryOver(task) {
  const range = WEEK_RANGES[task.week]
  if (!range) return false
  return task.plannedEnd > range[1]
}

export default function GanttBar({ task, onClick }) {
  const startIdx = getBusinessDayOffset(task.plannedStart)
  const spanDays = getBusinessDaysBetween(task.plannedStart, task.plannedEnd)
  const left = startIdx * DAY_WIDTH + 2
  const width = spanDays * DAY_WIDTH - 4
  if (width <= 0) return null

  const variant = getBarVariant(task)
  const carryOver = isCarryOver(task)

  // status modifier — done은 outline 처리 (이미 완료 표시)
  const isDone = task.status === 'done'

  let bg, fg, border
  if (variant === 'producer') {
    bg = isDone ? 'var(--ink-faint)' : 'var(--ink)'
    fg = isDone ? 'var(--ink)' : 'var(--paper)'
    border = 'var(--ink)'
  } else if (variant === 'consumer') {
    bg = isDone ? 'rgba(122,36,38,0.15)' : 'var(--oxblood)'
    fg = isDone ? 'var(--oxblood)' : 'var(--paper)'
    border = 'var(--oxblood)'
  } else {
    // outline (W5)
    bg = 'var(--paper)'
    fg = 'var(--ink)'
    border = 'var(--ink)'
  }

  return (
    <div
      className="absolute font-mono text-[11px] font-medium flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      style={{
        left,
        width,
        top: 16,
        height: 24,
        background: bg,
        color: fg,
        border: `1px solid ${border}`,
        borderStyle: carryOver ? 'dashed' : 'solid',
        padding: '0 8px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}
      onClick={() => onClick(task)}
      title={`${task.name}\n${task.plannedStart} ~ ${task.plannedEnd} (${spanDays}영업일)${carryOver ? ' · 잔무 이월' : ''}`}
    >
      <span className="truncate">{task.name}</span>
    </div>
  )
}
