import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    children: ReactNode
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'btn-primary',
        outline: 'btn-outline',
        ghost: 'bg-transparent text-navy-700 hover:bg-gray-100',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-4',
        lg: 'px-10 py-5 text-lg',
    }

    return (
        <button
            className={cn(
                variants[variant],
                size !== 'md' && sizes[size], // only apply if not default to allow css class control
                'disabled:opacity-60 disabled:cursor-not-allowed',
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Loading...</span>
                </>
            ) : children}
        </button>
    )
}
