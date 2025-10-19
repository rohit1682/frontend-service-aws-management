import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  error?: string | null
}

function TextField({ label, id, error, className, ...props }: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        className={(className ? className + ' ' : '') + 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400'}
      />
      {error ? <p className="text-red-600 text-sm mt-1">{error}</p> : null}
    </div>
  )
}

export default TextField


