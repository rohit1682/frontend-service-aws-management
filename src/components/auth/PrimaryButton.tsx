import type { PropsWithChildren } from 'react'
import { type PrimaryButtonProps } from '../../types'

function PrimaryButton({ children, className, ...props }: PropsWithChildren<PrimaryButtonProps>) {
  return (
    <button
      {...props}
      className={
        (className ? className + ' ' : '') + 
        'w-full rounded-xl bg-gradient-to-r from-slate-700 to-gray-800 text-white py-3 font-semibold shadow-lg hover:shadow-xl hover:from-slate-800 hover:to-gray-900 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg'
      }
    >
      {children}
    </button>
  )
}

export default PrimaryButton


