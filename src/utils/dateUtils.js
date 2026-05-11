export const PROJECT_START = '2026-05-12'
export const PROJECT_END = '2026-06-06'
export const DAY_WIDTH = 48

// 공휴일 목록 (토/일 외 추가 휴일)
const HOLIDAYS = new Set([
  '2026-05-25', // 공휴일
  '2026-06-03', // 공휴일
])

function isWorkday(date) {
  const dow = date.getDay()
  if (dow === 0 || dow === 6) return false // 토/일
  const dateStr = date.toISOString().split('T')[0]
  if (HOLIDAYS.has(dateStr)) return false // 공휴일
  return true
}

// 영업일 목록 생성 (주말 + 공휴일 제외)
export function getBusinessDays(start, end) {
  const days = []
  const current = new Date(start)
  const e = new Date(end)
  while (current <= e) {
    if (isWorkday(current)) {
      days.push(new Date(current))
    }
    current.setDate(current.getDate() + 1)
  }
  return days
}

export const BUSINESS_DAYS = getBusinessDays(PROJECT_START, PROJECT_END)
export const TOTAL_BUSINESS_DAYS = BUSINESS_DAYS.length

// 날짜 → 영업일 인덱스
export function getBusinessDayOffset(dateStr) {
  const target = new Date(dateStr).toISOString().split('T')[0]
  const idx = BUSINESS_DAYS.findIndex(d => d.toISOString().split('T')[0] === target)
  return idx >= 0 ? idx : 0
}

// 두 날짜 사이 영업일 수
export function getBusinessDaysBetween(start, end) {
  return getBusinessDays(start, end).length
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}

// N 영업일 후 날짜
export function addBusinessDays(startDate, days) {
  const d = new Date(startDate)
  let count = 0
  while (count < days - 1) {
    d.setDate(d.getDate() + 1)
    if (isWorkday(d)) count++
  }
  return d.toISOString().split('T')[0]
}
