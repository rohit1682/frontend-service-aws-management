import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function PrimaryButton({ children, className, ...props }: PropsWithChildren<PrimaryButtonProps>) {
  return (
    <button
      {...props}
      className={(className ? className + ' ' : '') + 'w-full rounded-lg bg-slate-900 text-white py-2 font-medium hover:bg-slate-800 transition-colors disabled:opacity-70'}
    >
      {children}
    </button>
  )
}

export default PrimaryButton


