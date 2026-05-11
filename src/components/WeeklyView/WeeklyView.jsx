import { useState } from 'react'
import WeekTab from './WeekTab'
import MemberAccordion from './MemberAccordion'
import TaskDetailModal from '../common/TaskDetailModal'
import useStore from '../../stores/store'

const WEEK_HOLIDAY = {
  W3: { date: '05/25', label: '부처님오신날' },
  W4: { date: '06/03', label: '제9회 전국동시지방선거' },
}

export default function WeeklyView({ weekId }) {
  const members = useStore(s => s.members)
  const tasks = useStore(s => s.tasks)
  const schedule = useStore(s => s.schedule)
  const [selected, setSelected] = useState(null)
  const week = schedule.weeks.find(w => w.id === weekId)
  const weekTasks = tasks.filter(t => t.week === weekId)
  const holiday = WEEK_HOLIDAY[weekId]
  const sheetIndex = ['W1', 'W2', 'W3', 'W4', 'W5'].indexOf(weekId) + 1

  return (
    <>
      {/* — Titleblock — */}
      <header className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 pb-6 mb-6"
              style={{ borderBottom: '1px solid var(--ink)' }}>
        <div>
          <h1
            className="font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)', color: 'var(--ink)' }}
          >
            Sheet 0{sheetIndex}<br />
            Weekly · {weekId}
          </h1>
          {week && (
            <p
              className="font-script italic mt-3 leading-tight"
              style={{ fontSize: '24px', color: 'var(--oxblood)' }}
            >
              — {week.name}
            </p>
          )}
          <p
            className="font-mono text-[11px] tracking-mono mt-4 max-w-[60ch]"
            style={{ color: 'var(--ink-soft)' }}
          >
            한 주는 한 시트. 좌측 거대한 주차 번호가 인덱스이고, 본문은 담당자 카드 아코디언이다.
            {holiday && (
              <>
                {' '}{holiday.date}({holiday.label})은 영업일에서 제외 — hatching 도장으로 표시.
              </>
            )}
          </p>
        </div>
        <table className="titleblock-meta self-start w-full">
          <tbody>
            <tr><td className="k">Drawing No.</td><td className="v">SYN-{weekId}</td></tr>
            <tr><td className="k">Period</td><td className="v">{week?.startDate?.slice(5)} → {week?.endDate?.slice(5)}</td></tr>
            <tr><td className="k">Tracks</td><td className="v">{members.length}명</td></tr>
            <tr><td className="k">Tasks</td><td className="v">{weekTasks.length}</td></tr>
            <tr><td className="k">Holiday</td><td className="v" style={{ color: holiday ? 'var(--oxblood)' : 'var(--ink-soft)' }}>{holiday ? `${holiday.date} ${holiday.label}` : '—'}</td></tr>
            <tr><td className="k">Drafted by</td><td className="v stamp">velka ✎</td></tr>
          </tbody>
        </table>
      </header>

      {/* — Week tab strip — */}
      <WeekTab />

      {/* — Week summary card — */}
      {week && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 mb-6"
             style={{ border: '1px solid var(--ink)' }}>
          <div className="p-5" style={{ background: 'var(--paper-2)', borderRight: '1px solid var(--ink-faint)' }}>
            <div className="font-mono text-[10px] tracking-mono mb-2" style={{ color: 'var(--ink-soft)' }}>
              GOALS — {week.goals.length} ITEMS
            </div>
            <ul className="space-y-1.5">
              {week.goals.map((g, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px]" style={{ color: 'var(--oxblood)' }}>◇</span>
                  <span className="font-mono text-[12px]" style={{ color: 'var(--ink)' }}>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <div className="font-mono text-[10px] tracking-mono mb-2" style={{ color: 'var(--ink-soft)' }}>
              SUCCESS CRITERIA — {week.successCriteria.length} CHECKS · GATE
            </div>
            <ul className="space-y-1.5">
              {week.successCriteria.map((sc, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-[12px] inline-flex items-center justify-center w-4 h-4 border"
                    style={{
                      borderColor: 'var(--ink)',
                      background: sc.checked ? 'var(--ink)' : 'var(--paper)',
                      color: 'var(--paper)',
                    }}
                  >
                    {sc.checked ? '✓' : ''}
                  </span>
                  <span
                    className="font-mono text-[12px]"
                    style={{
                      color: sc.checked ? 'var(--ink-soft)' : 'var(--ink)',
                      textDecoration: sc.checked ? 'line-through' : 'none',
                    }}
                  >
                    {sc.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* — Member breakdown — */}
      <div className="font-mono text-[10px] tracking-mono mb-3 flex items-baseline gap-3"
           style={{ color: 'var(--ink-soft)' }}>
        <span style={{ color: 'var(--oxblood)' }}>§{sheetIndex}.{members.length}</span>
        <span className="font-display text-[20px] font-bold tracking-wider"
              style={{ color: 'var(--ink)' }}>
          PARTS · BY OWNER
        </span>
        <span className="ml-auto">{weekTasks.length} TASKS · {members.length} TRACKS</span>
      </div>

      <div className="space-y-2">
        {members.map(m => {
          const mt = weekTasks.filter(t => t.memberId === m.id)
          return mt.length ? (
            <MemberAccordion key={m.id} member={m} tasks={mt} onTaskClick={setSelected} />
          ) : null
        })}
      </div>

      {selected && <TaskDetailModal task={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
