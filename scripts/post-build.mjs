import { mkdirSync, copyFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

// SPA route pre-rendering for GitHub Pages.
// We copy dist/index.html into every known client-side route so that direct URLs
// return HTTP 200 (instead of 404 + 404.html JS redirect). The React app then
// takes over and React Router resolves the route. This eliminates the
// "kanban:1 Failed to load resource: 404" console noise on deep links.
//
// 404.html is still kept as a fallback for unknown routes.

const dist = resolve(process.cwd(), 'dist')
const indexPath = join(dist, 'index.html')

if (!existsSync(indexPath)) {
  console.error('post-build: dist/index.html not found — run `vite build` first')
  process.exit(1)
}

const ROUTES = [
  'kanban',
  'settings',
  'weekly/W1',
  'weekly/W2',
  'weekly/W3',
  'weekly/W4',
  'weekly/W5',
  'weekly',          // redirects to W1 client-side
  'login/callback',  // GitHub OAuth redirect target (when CLIENT_ID 설정 시)
]

let copied = 0
for (const route of ROUTES) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  const dest = join(dir, 'index.html')
  copyFileSync(indexPath, dest)
  copied++
}

console.log(`post-build: pre-rendered ${copied} SPA routes (HTTP 200 on direct URLs)`)
