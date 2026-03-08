import { AnimatedCounter } from './AnimatedCounter'
import { cn } from '@/lib/utils'
import { MetricCardProps } from '@/types'

export function MetricCard({ metric, index, isVisible }: MetricCardProps) {
    return (
        <div
            className={cn(
                `reveal reveal-delay-${index + 1}`,
                "bg-white rounded-sm border border-gray-100 p-8 card-hover text-center shadow-sm"
            )}
        >
            <div className={cn("w-16 h-16 rounded-sm flex items-center justify-center text-white mx-auto mb-6", metric.color)}>
                {metric.icon}
            </div>
            <p className="font-display text-5xl font-bold text-navy-700 mb-2">
                <AnimatedCounter target={metric.target} suffix={metric.suffix} isVisible={isVisible} />
            </p>
            <p className="font-semibold text-gray-900 mb-3 text-sm tracking-wide uppercase">{metric.label}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{metric.description}</p>
        </div>
    )
}
