import KanbanBoard from '../components/KanbanBoard/KanbanBoard'

export default function KanbanPage() {
  return (
    <>
      <header
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 pb-6 mb-6"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <div>
          <h1
            className="font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)', color: 'var(--ink)' }}
          >
            Sheet 03<br />
            Parts · Kanban
          </h1>
          <p
            className="font-script italic mt-3 leading-tight"
            style={{ fontSize: '24px', color: 'var(--oxblood)' }}
          >
            — assembly catalog · drag to update status
          </p>
          <p
            className="font-mono text-[11px] tracking-mono mt-4 max-w-[68ch]"
            style={{ color: 'var(--ink-soft)' }}
          >
            각 task = 부품 카드. 컬럼 = 조립 단계 (Not Started · In Progress · Done).
            GitHub 로그인 후 드래그로 상태 변경 가능. 필터로 담당자·주차 좁히기.
          </p>
        </div>
        <table className="titleblock-meta self-start w-full">
          <tbody>
            <tr><td className="k">Drawing No.</td><td className="v">SYN-PARTS</td></tr>
            <tr><td className="k">Title</td><td className="v">Parts Catalog · Kanban</td></tr>
            <tr><td className="k">Stages</td><td className="v">3 (NS · IP · DN)</td></tr>
            <tr><td className="k">Filter</td><td className="v">@member · W1~W5</td></tr>
            <tr><td className="k">Drafted by</td><td className="v stamp">velka ✎</td></tr>
          </tbody>
        </table>
      </header>
      <KanbanBoard />
    </>
  )
}
