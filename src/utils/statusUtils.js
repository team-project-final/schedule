export const STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
}

export const STATUS_CONFIG = {
  not_started: { label: 'Not Started', color: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100' },
  in_progress: { label: 'In Progress', color: 'bg-blue-600', text: 'text-blue-700', bg: 'bg-blue-50' },
  done: { label: 'Done', color: 'bg-green-600', text: 'text-green-700', bg: 'bg-green-50' },
}

export function getProgressPercent(tasks) {
  if (!tasks.length) return 0
  const done = tasks.filter(t => t.status === STATUS.DONE).length
  return Math.round((done / tasks.length) * 100)
}
