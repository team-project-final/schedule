export default function ProgressBar({ percent, size = 'md' }) {
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5'
  return (
    <div className={`w-full bg-slate-200 rounded-full ${h}`}>
      <div className={`${h} rounded-full transition-all duration-500 ${percent === 100 ? 'bg-green-600' : 'bg-blue-600'}`} style={{ width: `${percent}%` }} />
    </div>
  )
}
