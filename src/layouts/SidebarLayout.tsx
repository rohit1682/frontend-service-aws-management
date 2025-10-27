import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import NavOptions, { type NavItem } from '../components/navigation/NavOptions'
import { useAuth } from '../context/AuthContext'

function SidebarLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true)
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen relative bg-white">
      {/* Floating hamburger opener */}
      {!open && (
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="app-sidebar"
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-40 jiggle-hover rounded-xl bg-slate-900 text-white shadow-lg px-3 py-2 transition-transform duration-200 hover:scale-110"
        >
          <span className="text-xl">☰</span>
        </button>
      )}

      {/* Sidebar panel */}
      <aside
        id="app-sidebar"
        className={
          (open ? 'translate-x-0' : '-translate-x-full') +
          ' fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 will-change-transform bg-slate-900 text-slate-200 p-4 flex flex-col gap-3'
        }
      >
        <div className="flex items-center gap-2 pb-4 border-b border-slate-600/30">
          <img src="/Logo.png" alt="Company Logo" className="w-7 h-7 object-contain" />
          <div className="font-semibold text-sm sm:text-base truncate">Workmates</div>
          {/* Close (X) button */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            ×
          </button>
        </div>

        {isAuthenticated ? (
          <NavOptions
            className="flex flex-col gap-1"
            items={[
              { to: '/dashboard', label: 'Dashboard', icon: '📊' },
              { to: '/accounts', label: 'Accounts', icon: '👥' },
              { to: '/reports', label: 'Reports', icon: '📈' },
              { to: '/user-onboard', label: 'User Onboard', icon: '🚀' },
            ] satisfies NavItem[]}
          />
        ) : (
          <NavOptions
            className="flex flex-col gap-1"
            items={[
              { to: '/', label: 'Home', end: true, icon: '🏠' },
            ] satisfies NavItem[]}
          />
        )}
        <div className="mt-auto pt-2 border-t border-slate-600/30">
          {isAuthenticated ? (
            <NavOptions
              items={[
                { to: '/my-account', label: 'My Account', icon: '⚙️' },
                { label: 'Logout', icon: '🚪', onClick: logout }
              ] satisfies NavItem[]}
            />
          ) : (
            <NavOptions
              items={[
                { to: '/login', label: 'Log in', icon: '🔑' },
                { to: '/signup', label: 'Sign up', icon: '📝' },
              ] satisfies NavItem[]}
            />
          )}
        </div>
      </aside>

      {/* Backdrop when open (for small screens) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Content area; add left padding on large screens so content is not covered */}
      <main
        className={
          (open
            ? 'translate-x-64 w-[calc(100%-16rem)] pl-10 '
            : 'translate-x-0 w-full pl-20 ')
          + 'transition-[transform,width] duration-300 ease-out pr-4 sm:pr-6 relative z-10 box-border'
        }
      >
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout


