import useStore from '../../stores/store'

export default function KanbanFilters({ filters, onChange }) {
  const members = useStore(s => s.members)
  return (
    <div className="flex gap-3 mb-4">
      <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white" value={filters.memberId || ''} onChange={e => onChange({ ...filters, memberId: e.target.value || null })}>
        <option value="">전체 담당자</option>
        {members.map(m => <option key={m.id} value={m.id}>{m.handle}</option>)}
      </select>
      <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white" value={filters.week || ''} onChange={e => onChange({ ...filters, week: e.target.value || null })}>
        <option value="">전체 주차</option>
        {['W1','W2','W3','W4'].map(w => <option key={w} value={w}>{w}</option>)}
      </select>
    </div>
  )
}
