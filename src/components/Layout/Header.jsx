import { NavLink } from 'react-router-dom'
import LoginButton from '../Auth/LoginButton'

const navItems = [
  { to: '/',          num: '§02', label: 'PLAN',    sub: 'gantt' },
  { to: '/kanban',    num: '§03', label: 'PARTS',   sub: 'kanban' },
  { to: '/weekly/W1', num: '§01', label: 'WEEKLY',  sub: 'sheet' },
  { to: '/settings',  num: '§99', label: 'CONFIG',  sub: 'settings' },
]

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-6 border-b border-paper px-6 lg:px-10 py-3"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl leading-none tracking-wider">SYN</span>
          <span className="font-mono text-[10px] tracking-mono" style={{ color: 'rgba(244,238,220,0.55)' }}>
            DRAWINGS · CYANOTYPE
          </span>
        </div>

        <nav className="flex gap-1">
          {navItems.map(({ to, num, label, sub }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group flex items-baseline gap-2 px-3 py-1.5 font-mono text-[11px] tracking-mono-tight transition-colors border ${
                  isActive
                    ? 'border-paper bg-paper text-ink'
                    : 'border-transparent hover:border-paper'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: 'var(--paper)', color: 'var(--ink)' }
                  : { color: 'var(--paper)' }
              }
            >
              <span
                className="font-mono text-[9px]"
                style={{ color: 'inherit', opacity: 0.6 }}
              >
                {num}
              </span>
              <span className="font-display font-bold tracking-wider">{label}</span>
              <span
                className="font-mono text-[9px] hidden lg:inline"
                style={{ color: 'inherit', opacity: 0.5 }}
              >
                / {sub}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="hidden md:inline font-mono text-[10px] tracking-mono"
          style={{ color: 'rgba(244,238,220,0.55)' }}
        >
          REV 3.0 · 2026-05-12 → 06-15 · 22 WORKDAYS
        </span>
        <LoginButton />
      </div>
    </header>
  )
}
