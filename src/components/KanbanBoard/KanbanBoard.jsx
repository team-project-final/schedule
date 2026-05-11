import { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from './KanbanColumn'
import KanbanFilters from './KanbanFilters'
import TaskDetailModal from '../common/TaskDetailModal'
import useStore from '../../stores/store'
import { STATUS } from '../../utils/statusUtils'

const COLUMNS = [STATUS.NOT_STARTED, STATUS.IN_PROGRESS, STATUS.DONE]

export default function KanbanBoard() {
  const tasks = useStore(s => s.tasks)
  const updateTaskStatus = useStore(s => s.updateTaskStatus)
  const user = useStore(s => s.user)
  const [filters, setFilters] = useState({ memberId: null, week: null })
  const [selected, setSelected] = useState(null)

  const filtered = tasks.filter(t => {
    if (filters.memberId && t.memberId !== filters.memberId) return false
    if (filters.week && t.week !== filters.week) return false
    return true
  })

  const handleDragEnd = (result) => {
    if (!result.destination || !user) return
    updateTaskStatus(result.draggableId, result.destination.droppableId)
  }

  return (
    <>
      <KanbanFilters filters={filters} onChange={setFilters} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {COLUMNS.map(s => <KanbanColumn key={s} status={s} tasks={filtered.filter(t => t.status === s)} onCardClick={setSelected} />)}
        </div>
      </DragDropContext>
      {!user && <p className="text-xs text-slate-400 mt-3">* 드래그로 상태 변경은 GitHub 로그인 후 가능합니다</p>}
      {selected && <TaskDetailModal task={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
