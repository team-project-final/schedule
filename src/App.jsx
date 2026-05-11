import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import GanttPage from './pages/GanttPage'
import KanbanPage from './pages/KanbanPage'
import WeeklyPage from './pages/WeeklyPage'
import OAuthCallback from './components/Auth/OAuthCallback'

export default function App() {
  return (
    <BrowserRouter basename="/schedule">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<GanttPage />} />
          <Route path="kanban" element={<KanbanPage />} />
          <Route path="weekly/:weekId" element={<WeeklyPage />} />
          <Route path="weekly" element={<Navigate to="/weekly/W1" replace />} />
        </Route>
        <Route path="login/callback" element={<OAuthCallback />} />
      </Routes>
    </BrowserRouter>
  )
}
