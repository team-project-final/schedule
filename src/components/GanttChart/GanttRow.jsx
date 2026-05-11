import GanttBar from './GanttBar'
import MemberAvatar from '../common/MemberAvatar'
import { TOTAL_BUSINESS_DAYS, DAY_WIDTH } from '../../utils/dateUtils'

export default function GanttRow({ member, tasks, onTaskClick }) {
  return (
    <div className="flex border-b border-slate-100 hover:bg-slate-50/50">
      <div className="w-48 flex-shrink-0 px-3 py-2 border-r border-slate-200 bg-white sticky left-0 z-10">
        <MemberAvatar member={member} size={24} />
      </div>
      <div className="relative" style={{ width: TOTAL_BUSINESS_DAYS * DAY_WIDTH, height: 34 }}>
        {tasks.map(t => <GanttBar key={t.id} task={t} onClick={onTaskClick} />)}
      </div>
    </div>
  )
}
