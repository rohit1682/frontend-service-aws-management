import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  error?: string | null
}

function TextField({ label, id, error, className, ...props }: TextFieldProps) {
  return (
    <div className="form-field-hover">
      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        className={
          (className ? className + ' ' : '') + 
          'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-slate-700 focus:ring-4 focus:ring-slate-100 hover:border-gray-400 hover:shadow-md'
        }
      />
      {error ? <p className="text-red-600 text-sm mt-2 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p> : null}
    </div>
  )
}

export default TextField


