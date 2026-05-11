import { useParams } from 'react-router-dom'
import WeeklyView from '../components/WeeklyView/WeeklyView'

export default function WeeklyPage() {
  const { weekId } = useParams()
  return <WeeklyView weekId={weekId} />
}
