import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import membersData from '../data/members.json'
import tasksData from '../data/tasks.json'
import scheduleData from '../data/schedule.json'

const useStore = create(
  persist(
    (set, get) => ({
      members: membersData,
      tasks: tasksData,
      schedule: scheduleData,
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      updateMemberName: (memberId, name) => set((state) => ({
        members: state.members.map(m =>
          m.id === memberId ? { ...m, name: name || null } : m
        ),
      })),

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
    }),
    {
      name: 'synapse-schedule-store',
      partialize: (state) => ({ members: state.members }),
    }
  )
)

export default useStore
