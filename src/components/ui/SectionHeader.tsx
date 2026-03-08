import { cn } from '@/lib/utils'

interface SectionHeaderProps {
    subtitle?: string
    title: string
    description?: string
    centered?: boolean
    className?: string
    dark?: boolean
}

export function SectionHeader({
    subtitle,
    title,
    description,
    centered = true,
    className,
    dark = false,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                'mb-12 reveal',
                centered ? 'text-center' : 'text-left',
                className
            )}
        >
            {subtitle && (
                <p className={cn(
                    "section-subtitle",
                    dark ? "text-orange-400" : "text-orange-500"
                )}>
                    {subtitle}
                </p>
            )}
            <h2 className={cn(
                "section-title mx-auto",
                centered && "max-w-2xl",
                dark ? "text-white" : "text-navy-700"
            )}>
                {title}
            </h2>
            {description && (
                <p className={cn(
                    "mt-4 mx-auto text-lg leading-relaxed",
                    centered && "max-w-xl",
                    dark ? "text-white/50" : "text-gray-500"
                )}>
                    {description}
                </p>
            )}
        </div>
    )
}
