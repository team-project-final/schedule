import { DAY_WIDTH, getBusinessDayOffset, getBusinessDaysBetween } from '../../utils/dateUtils'

const colors = { not_started: 'bg-slate-300', in_progress: 'bg-blue-500', done: 'bg-green-500' }

export default function GanttBar({ task, onClick }) {
  const startIdx = getBusinessDayOffset(task.plannedStart)
  const spanDays = getBusinessDaysBetween(task.plannedStart, task.plannedEnd)
  const left = startIdx * DAY_WIDTH + 2
  const width = spanDays * DAY_WIDTH - 4

  if (width <= 0) return null

  return (
    <div
      className={`absolute h-6 rounded cursor-pointer hover:opacity-80 ${colors[task.status] || 'bg-slate-300'}`}
      style={{ left, width, top: 4 }}
      onClick={() => onClick(task)}
      title={`${task.name}\n${task.plannedStart} ~ ${task.plannedEnd} (${spanDays}영업일)`}
    >
      <span className="text-[10px] text-white font-medium px-1.5 truncate block leading-6">{task.name}</span>
    </div>
  )
}
