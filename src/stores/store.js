import { create } from 'zustand'
import membersData from '../data/members.json'
import tasksData from '../data/tasks.json'
import scheduleData from '../data/schedule.json'

const useStore = create((set, get) => ({
  members: membersData,
  tasks: tasksData,
  schedule: scheduleData,
  user: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  updateTaskStatus: (taskId, newStatus) => set((state) => ({
    tasks: state.tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    ),
  })),

  addComment: (taskId, comment) => set((state) => ({
    tasks: state.tasks.map(t =>
      t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t
    ),
  })),

  getMember: (memberId) => get().members.find(m => m.id === memberId),
}))

export default useStore
