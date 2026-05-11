export default function CommentList({ comments }) {
  if (!comments?.length) return <p className="text-sm text-slate-400 italic">코멘트 없음</p>
  return (
    <div className="space-y-2">
      {comments.map((c, i) => (
        <div key={i} className="bg-slate-50 rounded-lg p-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">{c.author}</span>
            <span className="font-mono">{c.timestamp?.slice(0, 10)}</span>
          </div>
          <p className="text-sm text-slate-700">{c.text}</p>
        </div>
      ))}
    </div>
  )
}
