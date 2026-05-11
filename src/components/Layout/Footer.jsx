import { getProgressPercent } from '../../utils/statusUtils'
import useStore from '../../stores/store'

export default function Footer() {
  const tasks = useStore(s => s.tasks)
  const percent = getProgressPercent(tasks)
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-2 text-xs text-slate-400 flex justify-between items-center">
      <span>Synapse — 4주 팀 프로젝트</span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-slate-200 rounded-full">
          <div className="h-1.5 bg-blue-600 rounded-full transition-all" style={{width:`${percent}%`}} />
        </div>
        <span className="font-mono">{percent}%</span>
      </div>
    </footer>
  )
}
