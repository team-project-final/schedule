export default function ProgressBar({ percent, size = 'md' }) {
  const h = size === 'sm' ? 3 : 5
  const fill = percent === 100 ? 'var(--oxblood)' : 'var(--ink)'
  return (
    <div
      className="w-full"
      style={{
        height: `${h}px`,
        background: 'var(--ink-faint)',
        border: '1px solid var(--ink-faint)',
      }}
    >
      <div
        className="transition-all"
        style={{
          width: `${percent}%`,
          height: '100%',
          background: fill,
        }}
      />
    </div>
  )
}
