import type { PropsWithChildren } from 'react'
import NavOptions, { type NavItem } from '../components/NavOptions'

function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-3 p-4 bg-slate-900 text-slate-200">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-600/30">
          <div className="w-7 h-7 grid place-items-center rounded-md bg-slate-800" aria-hidden>🏢</div>
          <div className="font-semibold">Your Company</div>
        </div>
        <NavOptions
          className="flex flex-col gap-1"
          items={[
            { to: '/', label: 'Dashboard', end: true, icon: '📊' },
            { to: '/accounts', label: 'Accounts', icon: '👥' },
            { to: '/reports', label: 'Reports', icon: '📈' },
          ] satisfies NavItem[]}
        />
        <div className="mt-auto pt-2 border-t border-slate-600/30">
          <NavOptions
            items={[{ to: '/my-account', label: 'My Account', icon: '⚙️' }] satisfies NavItem[]}
          />
        </div>
      </aside>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout


