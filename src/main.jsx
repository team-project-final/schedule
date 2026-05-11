import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// NOTE: React StrictMode intentionally disabled — @hello-pangea/dnd has
// double-mount handling that conflicts with StrictMode's double-invoke
// in React 18+ dev/build, causing drag start/click event suppression in
// some browsers. Drag-and-drop + onClick correctness is more important
// than the dev-only double-render check for this app.
createRoot(document.getElementById('root')).render(<App />)
