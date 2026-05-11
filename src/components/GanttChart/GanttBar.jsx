import { DAY_WIDTH, getDayOffset } from '../../utils/dateUtils'

const colors = { not_started: 'bg-slate-300', in_progress: 'bg-blue-500', done: 'bg-green-500' }

export default function GanttBar({ task, onClick }) {
  const left = getDayOffset(task.plannedStart) * DAY_WIDTH + 2
  const width = (getDayOffset(task.plannedEnd) - getDayOffset(task.plannedStart) + 1) * DAY_WIDTH - 4
  return (
    <div className={`absolute h-6 rounded cursor-pointer hover:opacity-80 ${colors[task.status] || 'bg-slate-300'}`}
      style={{ left, width, top: 4 }} onClick={() => onClick(task)} title={task.name}>
      <span className="text-[10px] text-white font-medium px-1.5 truncate block leading-6">{task.name}</span>
    </div>
  )
}
