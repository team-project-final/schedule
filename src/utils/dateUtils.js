export const PROJECT_START = '2026-05-12'
export const PROJECT_END = '2026-06-06'

export function getDaysBetween(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1
}

export const TOTAL_DAYS = getDaysBetween(PROJECT_START, PROJECT_END)
export const DAY_WIDTH = 40

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getDayOffset(dateStr) {
  const start = new Date(PROJECT_START)
  const target = new Date(dateStr)
  return Math.floor((target - start) / (1000 * 60 * 60 * 24))
}
