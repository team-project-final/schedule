import KanbanBoard from '../components/KanbanBoard/KanbanBoard'

export default function KanbanPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">칸반 보드</h2>
      <KanbanBoard />
    </div>
  )
}
