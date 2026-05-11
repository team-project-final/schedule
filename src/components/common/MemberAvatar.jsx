export default function MemberAvatar({ member, size = 32 }) {
  const displayName = member.name || member.handle
  const src = member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=${size}&background=e2e8f0&color=475569`
  return (
    <div className="flex items-center gap-2">
      <img src={src} alt={displayName} className="rounded-full" style={{ width: size, height: size }} />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">{displayName}</span>
        {member.name && <span className="text-[10px] text-slate-400">{member.handle}</span>}
      </div>
    </div>
  )
}
