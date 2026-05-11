import { NavLink } from 'react-router-dom'
import LoginButton from '../Auth/LoginButton'

const navItems = [
  { to: '/', label: 'Gantt' },
  { to: '/kanban', label: 'Kanban' },
  { to: '/weekly/W1', label: 'Weekly' },
]

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-slate-900">Synapse Schedule</h1>
        <nav className="flex gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <LoginButton />
    </header>
  )
}
