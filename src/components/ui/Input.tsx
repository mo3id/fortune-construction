import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 border rounded-sm text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors',
                        error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'
