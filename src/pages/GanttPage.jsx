import GanttChart from '../components/GanttChart/GanttChart'
import ProgressBar from '../components/common/ProgressBar'
import { useProgress } from '../hooks/useData'

export default function GanttPage() {
  const progress = useProgress()
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">프로젝트 타임라인</h2>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>전체 진행률</span>
          <div className="w-32"><ProgressBar percent={progress} size="sm" /></div>
          <span className="font-mono font-semibold">{progress}%</span>
        </div>
      </div>
      <GanttChart />
    </div>
  )
}
