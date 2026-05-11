import { BUSINESS_DAYS, TOTAL_BUSINESS_DAYS, DAY_WIDTH } from '../../utils/dateUtils'

export default function GanttTimeline() {
  return (
    <div className="flex border-b border-slate-200" style={{ width: TOTAL_BUSINESS_DAYS * DAY_WIDTH }}>
      {BUSINESS_DAYS.map((d, i) => {
        const dayNames = ['일','월','화','수','목','금','토']
        const isToday = d.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
        const isMonday = d.getDay() === 1
        return (
          <div
            key={i}
            className={`flex-shrink-0 text-center border-r ${isMonday ? 'border-slate-300' : 'border-slate-100'} ${isToday ? 'bg-blue-50' : ''}`}
            style={{ width: DAY_WIDTH }}
          >
            <div className="text-[10px] text-slate-400 font-mono">{dayNames[d.getDay()]}</div>
            <div className={`text-[11px] font-mono ${isToday ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}>
              {d.getMonth()+1}/{d.getDate()}
            </div>
          </div>
        )
      })}
    </div>
  )
}
