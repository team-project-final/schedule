import { Droppable } from '@hello-pangea/dnd'
import KanbanCard from './KanbanCard'
import { STATUS_CONFIG } from '../../utils/statusUtils'

export default function KanbanColumn({ status, tasks, onCardClick }) {
  const config = STATUS_CONFIG[status]
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
        <h3 className="font-semibold text-slate-700 text-sm">{config.label}</h3>
        <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}
            className={`min-h-[200px] rounded-lg p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-slate-50'}`}>
            {tasks.map((t, i) => <KanbanCard key={t.id} task={t} index={i} onClick={onCardClick} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
