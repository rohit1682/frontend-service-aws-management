import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-3 p-4 bg-slate-900 text-slate-200">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-600/30">
          <div className="w-7 h-7 grid place-items-center rounded-md bg-slate-800" aria-hidden>🏢</div>
          <div className="font-semibold">Your Company</div>
        </div>
        <nav className="flex flex-col gap-1">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'px-3 py-2 rounded-lg bg-slate-800 text-white' : 'px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-600/20'}>
            Dashboard
          </NavLink>
          <NavLink to="/accounts" className={({ isActive }) => isActive ? 'px-3 py-2 rounded-lg bg-slate-800 text-white' : 'px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-600/20'}>
            Accounts
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'px-3 py-2 rounded-lg bg-slate-800 text-white' : 'px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-600/20'}>
            Reports
          </NavLink>
        </nav>
        <div className="mt-auto pt-2 border-t border-slate-600/30">
          <NavLink to="/my-account" className={({ isActive }) => isActive ? 'px-3 py-2 rounded-lg bg-slate-800 text-white' : 'px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-600/20'}>
            My Account
          </NavLink>
        </div>
      </aside>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout


