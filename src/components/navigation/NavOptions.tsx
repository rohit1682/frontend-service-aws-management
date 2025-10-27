import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

export type NavItem = {
  to?: string
  label: string
  end?: boolean
  icon?: ReactNode
  onClick?: () => void
}

type NavOptionsProps = {
  items: NavItem[]
  className?: string
  onItemClick?: () => void
}

function NavOptions({ items, className, onItemClick }: NavOptionsProps) {
  const base = 'block w-full px-3 py-2 rounded-lg text-slate-300 transition-all duration-200 ease-out hover:text-white hover:bg-slate-600/20 hover:scale-105'
  const active = 'block w-full px-3 py-2 rounded-lg bg-slate-800 text-white transition-all duration-200 ease-out hover:scale-105'
  
  return (
    <nav className={className}>
      {items.map(({ to, label, end, icon, onClick }, index) => {
        const key = to || `action-${index}`
        const handleClick = () => {
          if (onClick) onClick()
          if (onItemClick) onItemClick()
        }
        
        if (to) {
          return (
            <NavLink key={key} to={to} end={end} className={({ isActive }) => (isActive ? active : base)} onClick={handleClick}>
              <span className="inline-flex items-center gap-2">
                {icon ? <span className="text-lg leading-none" aria-hidden>{icon}</span> : null}
                <span>{label}</span>
              </span>
            </NavLink>
          )
        } else {
          return (
            <button key={key} className={base + ' text-left'} onClick={handleClick}>
              <span className="inline-flex items-center gap-2">
                {icon ? <span className="text-lg leading-none" aria-hidden>{icon}</span> : null}
                <span>{label}</span>
              </span>
            </button>
          )
        }
      })}
    </nav>
  )
}

export default NavOptions
