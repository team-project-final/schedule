import { STATUS_CONFIG } from '../../utils/statusUtils'

const STATUS_STYLE = {
  not_started: { bg: 'var(--paper)',   fg: 'var(--ink-soft)', border: 'var(--ink-faint)', dot: 'var(--grey)' },
  in_progress: { bg: 'var(--ink)',     fg: 'var(--paper)',    border: 'var(--ink)',       dot: 'var(--paper)' },
  done:        { bg: 'var(--oxblood)', fg: 'var(--paper)',    border: 'var(--oxblood)',   dot: 'var(--paper)' },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status]
  const s = STATUS_STYLE[status]
  if (!config || !s) return null
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase"
      style={{
        padding: '2px 8px',
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.border}`,
        letterSpacing: '0.14em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{ width: '6px', height: '6px', background: s.dot, display: 'inline-block' }}
      />
      {config.label}
    </span>
  )
}
