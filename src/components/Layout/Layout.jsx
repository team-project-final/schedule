import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>
      <Header />
      <main className="flex-1 px-4 lg:px-8 py-6 lg:py-10">
        <div className="relative max-w-[1400px] mx-auto">
          {/* corner marks (decorative diamonds) */}
          <span className="sheet-corner-mark" style={{ top: '-8px', left: '-8px' }} aria-hidden />
          <span className="sheet-corner-mark" style={{ top: '-8px', right: '-8px' }} aria-hidden />
          <span className="sheet-corner-mark" style={{ bottom: '-8px', left: '-8px' }} aria-hidden />
          <span className="sheet-corner-mark" style={{ bottom: '-8px', right: '-8px' }} aria-hidden />
          <div className="sheet p-6 lg:p-10">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
