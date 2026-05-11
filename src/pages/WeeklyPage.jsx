import { useParams } from 'react-router-dom'
import WeeklyView from '../components/WeeklyView/WeeklyView'

export default function WeeklyPage() {
  const { weekId } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">주차별 상세</h2>
      <WeeklyView weekId={weekId} />
    </div>
  )
}
