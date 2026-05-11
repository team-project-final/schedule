import { STATUS_CONFIG } from '../../utils/statusUtils'
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status]
  if (!config) return null
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
      {config.label}
    </span>
  )
}
