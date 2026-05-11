import { getProgressPercent } from '../../utils/statusUtils'
import useStore from '../../stores/store'

export default function Footer() {
  const tasks = useStore(s => s.tasks)
  const percent = getProgressPercent(tasks)

  return (
    <footer
      className="border-t mt-10"
      style={{ background: 'var(--paper)', borderColor: 'var(--ink)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
        <div
          className="grid grid-cols-2 md:grid-cols-4 border"
          style={{ borderColor: 'var(--ink)' }}
        >
          <Cell k="Drawn"    v="2026-05-11" />
          <Cell k="Revision" v="3.0 — 5-week" />
          <Cell k="Range"    v="05/12 → 06/15" stamp />
          <Cell k="Progress">
            <div className="flex items-center gap-3">
              <div className="w-28 h-[3px]" style={{ background: 'var(--ink-faint)' }}>
                <div
                  className="h-[3px] transition-all"
                  style={{ width: `${percent}%`, background: 'var(--ink)' }}
                />
              </div>
              <span className="font-mono text-xs font-semibold" style={{ color: 'var(--ink)' }}>
                {percent}%
              </span>
            </div>
          </Cell>
        </div>
        <p
          className="mt-3 font-mono text-[9px] tracking-mono text-center"
          style={{ color: 'var(--ink-soft)' }}
        >
          — END OF DRAWING SET · SYN-DRAWINGS · CYANOTYPE EDITION · v3.0 · 22 WORKDAYS + 1 PRESENTATION —
        </p>
      </div>
    </footer>
  )
}

function Cell({ k, v, stamp, children }) {
  return (
    <div
      className="px-4 py-3"
      style={{ borderRight: '1px solid var(--ink-faint)' }}
    >
      <div
        className="font-mono text-[9px] tracking-mono mb-1"
        style={{ color: 'var(--ink-soft)' }}
      >
        {k}
      </div>
      {v && (
        <div
          className={stamp ? 'stamp-script' : 'font-mono text-xs font-semibold'}
          style={{ color: stamp ? 'var(--oxblood)' : 'var(--ink)' }}
        >
          {stamp ? `${v} ✎` : v}
        </div>
      )}
      {children}
    </div>
  )
}
