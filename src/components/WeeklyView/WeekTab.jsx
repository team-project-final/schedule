import { NavLink } from 'react-router-dom'

const WEEKS = [
  { id: 'W1', label: '인프라+CRUD',         meta: '05/12→15 · 4d' },
  { id: 'W2', label: '핵심 기능',           meta: '05/18→22 · 5d' },
  { id: 'W3', label: '발행자+RRF+AI',       meta: '05/26→29 · 4d' },
  { id: 'W4', label: '소비자+운영',         meta: '06/01→05 · 4d' },
  { id: 'W5', label: 'E2E+발표 준비',       meta: '06/08→12 · 5d' },
]

export default function WeekTab() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6"
      style={{ border: '1px solid var(--ink)' }}
    >
      {WEEKS.map(({ id, label, meta }) => (
        <NavLink
          key={id}
          to={`/weekly/${id}`}
          className="group block px-4 py-3 transition-colors"
          style={({ isActive }) => ({
            background: isActive ? 'var(--ink)' : 'var(--paper)',
            color: isActive ? 'var(--paper)' : 'var(--ink)',
            borderRight: '1px solid var(--ink-faint)',
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display font-black text-3xl leading-none tracking-wider"
                  style={{ color: isActive ? 'var(--paper)' : 'var(--ink)' }}
                >
                  {id}
                </span>
                <span
                  className="font-mono text-[10px] tracking-mono"
                  style={{
                    color: isActive ? 'rgba(244,238,220,0.65)' : 'var(--ink-soft)',
                  }}
                >
                  {meta}
                </span>
              </div>
              <span
                className="font-mono text-[11px] truncate"
                style={{
                  color: isActive ? 'rgba(244,238,220,0.85)' : 'var(--ink-soft)',
                  letterSpacing: '0.04em',
                }}
                title={label}
              >
                — {label}
              </span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  )
}
