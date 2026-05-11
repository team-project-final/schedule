import { Draggable } from '@hello-pangea/dnd'
import useStore from '../../stores/store'

export default function KanbanCard({ task, index, onClick }) {
  const member = useStore(s => s.getMember(task.memberId))
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          className={`bg-white rounded-lg border p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow ${snapshot.isDragging ? 'shadow-lg border-blue-300' : 'border-slate-200'}`}
          onClick={() => onClick(task)}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-slate-400">{task.week}</span>
            <span className={`text-[10px] font-mono ${task.priority === 'P0' ? 'text-red-500 font-semibold' : 'text-slate-400'}`}>{task.priority}</span>
          </div>
          <p className="text-sm font-medium text-slate-800 mb-2">{task.name}</p>
          <div className="flex items-center gap-1.5">
            <img src={member?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.handle||'')}&size=20&background=e2e8f0&color=475569`} className="w-5 h-5 rounded-full" alt="" />
            <span className="text-[11px] text-slate-500">{member?.handle}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}
