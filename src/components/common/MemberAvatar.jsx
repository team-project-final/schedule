export default function MemberAvatar({ member, size = 32 }) {
  const displayName = member.name || member.handle
  const src =
    member.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=${size}&background=ECE3CB&color=0E2F50`
  return (
    <div className="flex items-center gap-2">
      <img
        src={src}
        alt={displayName}
        style={{
          width: size,
          height: size,
          border: '1px solid var(--ink)',
          borderRadius: 0,
        }}
      />
      <div className="flex flex-col leading-tight">
        <span
          className="font-mono text-[12px]"
          style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}
        >
          {displayName}
        </span>
        {member.name && (
          <span
            className="font-mono text-[9px] tracking-mono"
            style={{ color: 'var(--ink-soft)' }}
          >
            {member.handle}
          </span>
        )}
      </div>
    </div>
  )
}
