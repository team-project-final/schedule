import { TOTAL_DAYS, DAY_WIDTH, PROJECT_START } from '../../utils/dateUtils'

export default function GanttTimeline() {
  const days = []
  const start = new Date(PROJECT_START)
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i)
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    days.push({ label: `${d.getMonth()+1}/${d.getDate()}`, dayName: ['일','월','화','수','목','금','토'][d.getDay()], isWeekend })
  }
  return (
    <div className="flex border-b border-slate-200" style={{ width: TOTAL_DAYS * DAY_WIDTH }}>
      {days.map((day, i) => (
        <div key={i} className={`flex-shrink-0 text-center border-r border-slate-100 ${day.isWeekend ? 'bg-slate-50' : ''}`} style={{ width: DAY_WIDTH }}>
          <div className="text-[10px] text-slate-400 font-mono">{day.dayName}</div>
          <div className="text-[11px] text-slate-600 font-mono">{day.label}</div>
        </div>
      ))}
    </div>
  )
}
