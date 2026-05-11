import useStore from '../../stores/store'

export default function KanbanFilters({ filters, onChange }) {
  const members = useStore(s => s.members)
  return (
    <div
      className="flex flex-wrap items-center gap-3 mb-4 px-4 py-2"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-2)' }}
    >
      <span
        className="font-mono text-[10px] tracking-mono"
        style={{ color: 'var(--ink-soft)' }}
      >
        FILTER
      </span>
      <select
        className="input-ink"
        value={filters.memberId || ''}
        onChange={e => onChange({ ...filters, memberId: e.target.value || null })}
      >
        <option value="">ALL MEMBERS</option>
        {members.map(m => <option key={m.id} value={m.id}>{m.handle}</option>)}
      </select>
      <select
        className="input-ink"
        value={filters.week || ''}
        onChange={e => onChange({ ...filters, week: e.target.value || null })}
      >
        <option value="">ALL WEEKS</option>
        {['W1','W2','W3','W4','W5'].map(w => <option key={w} value={w}>{w}</option>)}
      </select>
      {(filters.memberId || filters.week) && (
        <button
          className="btn-outline"
          onClick={() => onChange({ memberId: null, week: null })}
        >
          CLEAR
        </button>
      )}
    </div>
  )
}
