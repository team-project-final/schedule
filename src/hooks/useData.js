import useStore from '../stores/store'
import { getProgressPercent } from '../utils/statusUtils'

export function useMembers() {
  return useStore((s) => s.members)
}

export function useTasks(filters = {}) {
  const tasks = useStore((s) => s.tasks)
  let filtered = tasks
  if (filters.memberId) filtered = filtered.filter(t => t.memberId === filters.memberId)
  if (filters.week) filtered = filtered.filter(t => t.week === filters.week)
  if (filters.status) filtered = filtered.filter(t => t.status === filters.status)
  return filtered
}

export function useSchedule() {
  return useStore((s) => s.schedule)
}

export function useProgress(filters = {}) {
  const tasks = useTasks(filters)
  return getProgressPercent(tasks)
}
