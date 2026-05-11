export default function MemberAvatar({ member, size = 32 }) {
  const src = member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.handle)}&size=${size}&background=e2e8f0&color=475569`
  return (
    <div className="flex items-center gap-2">
      <img src={src} alt={member.handle} className="rounded-full" style={{ width: size, height: size }} />
      <span className="text-sm font-medium text-slate-700">{member.handle}</span>
    </div>
  )
}
