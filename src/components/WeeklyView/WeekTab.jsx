import { NavLink } from 'react-router-dom'
export default function WeekTab() {
  return (
    <div className="flex gap-1 mb-6">
      {['W1','W2','W3','W4','W5'].map(w => (
        <NavLink key={w} to={`/weekly/${w}`}
          className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
          {w}
        </NavLink>
      ))}
    </div>
  )
}
