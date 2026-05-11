import GanttChart from '../components/GanttChart/GanttChart'
import { useProgress } from '../hooks/useData'

export default function GanttPage() {
  const progress = useProgress()
  return (
    <>
      {/* — Titleblock — */}
      <header
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 pb-6 mb-6"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <div>
          <h1
            className="font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)', color: 'var(--ink)' }}
          >
            Sheet 02<br />
            Plan · 5W + 6/15
          </h1>
          <p
            className="font-script italic mt-3 leading-tight"
            style={{ fontSize: '24px', color: 'var(--oxblood)' }}
          >
            — full project schematic · 22 workdays + 1 presentation
          </p>
          <p
            className="font-mono text-[11px] tracking-mono mt-4 max-w-[68ch]"
            style={{ color: 'var(--ink-soft)' }}
          >
            가로축은 영업일 (1ch ≡ 1 영업일), 세로축은 트랙. cyanotype 막대 = producer (W1~W3),
            oxblood = consumer (W4), outline = 안정화 (W5). 발표일 6/15는 ★ 다이아몬드 마커 (코드 동결).
          </p>
        </div>
        <table className="titleblock-meta self-start w-full">
          <tbody>
            <tr><td className="k">Drawing No.</td><td className="v">SYN-PLAN-5W</td></tr>
            <tr><td className="k">Range</td><td className="v">05/12 → 06/15</td></tr>
            <tr><td className="k">Workdays</td><td className="v">22 + 1 demo</td></tr>
            <tr><td className="k">Holidays</td><td className="v" style={{ color: 'var(--oxblood)' }}>05/25 · 06/03</td></tr>
            <tr><td className="k">Progress</td><td className="v">{progress}%</td></tr>
            <tr><td className="k">Drafted by</td><td className="v stamp">velka ✎</td></tr>
          </tbody>
        </table>
      </header>

      <GanttChart />
    </>
  )
}
