import { useState } from 'react'
import WeekTab from './WeekTab'
import MemberAccordion from './MemberAccordion'
import TaskDetailModal from '../common/TaskDetailModal'
import useStore from '../../stores/store'

export default function WeeklyView({ weekId }) {
  const members = useStore(s => s.members)
  const tasks = useStore(s => s.tasks)
  const schedule = useStore(s => s.schedule)
  const [selected, setSelected] = useState(null)
  const week = schedule.weeks.find(w => w.id === weekId)
  const weekTasks = tasks.filter(t => t.week === weekId)

  return (
    <>
      <WeekTab />
      {week && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
          <h3 className="font-semibold text-slate-800 mb-1">{week.name}</h3>
          <p className="text-sm text-slate-500 font-mono mb-3">{week.startDate} ~ {week.endDate}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {week.goals.map((g, i) => <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md">{g}</span>)}
          </div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">성공 기준</h4>
          <ul className="space-y-1">
            {week.successCriteria.map((sc, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={sc.checked} readOnly className="rounded" />
                <span className={sc.checked ? 'text-slate-400 line-through' : 'text-slate-700'}>{sc.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {members.map(m => {
        const mt = weekTasks.filter(t => t.memberId === m.id)
        return mt.length ? <MemberAccordion key={m.id} member={m} tasks={mt} onTaskClick={setSelected} /> : null
      })}
      {selected && <TaskDetailModal task={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
