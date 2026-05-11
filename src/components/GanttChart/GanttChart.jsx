import { useState } from 'react'
import GanttTimeline from './GanttTimeline'
import GanttRow from './GanttRow'
import TaskDetailModal from '../common/TaskDetailModal'
import useStore from '../../stores/store'

export default function GanttChart() {
  const members = useStore(s => s.members)
  const tasks = useStore(s => s.tasks)
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
        <div className="flex">
          <div className="w-48 flex-shrink-0 px-3 py-2 border-r border-slate-200 bg-slate-50 sticky left-0 z-20 text-xs font-semibold text-slate-500">담당자</div>
          <GanttTimeline />
        </div>
        {members.map(m => <GanttRow key={m.id} member={m} tasks={tasks.filter(t => t.memberId === m.id)} onTaskClick={setSelected} />)}
      </div>
      {selected && <TaskDetailModal task={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
