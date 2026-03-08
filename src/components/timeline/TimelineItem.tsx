import { cn } from '@/lib/utils'
import { TimelineItemProps } from '@/types'

export function TimelineItem({ event, index }: TimelineItemProps) {
    const isEven = index % 2 === 0

    return (
        <div
            className={cn(
                `reveal reveal-delay-${(index % 4) + 1}`,
                "relative flex flex-col md:flex-row gap-8 md:gap-16",
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
        >
            {/* Timeline node */}
            <div
                className={cn(
                    "absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-sm flex items-center justify-center z-10 transition-all",
                    event.highlight
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                        : 'bg-navy-600 text-white/60 border border-white/10'
                )}
            >
                {event.icon}
            </div>

            {/* Year label (desktop center) */}
            <div className={cn(
                "hidden md:flex items-center justify-center w-1/2",
                isEven ? 'justify-end pr-16' : 'justify-start pl-16'
            )}>
                <span className={cn(
                    "font-display text-5xl font-bold",
                    event.highlight ? 'text-teal-400' : 'text-white/20'
                )}>
                    {event.year}
                </span>
            </div>

            {/* Content */}
            <div className={cn(
                "ml-20 md:ml-0 md:w-1/2",
                isEven ? 'md:pl-16' : 'md:pr-16'
            )}>
                <div className="bg-white/5 border border-white/10 rounded-sm p-6 hover:bg-white/[0.08] transition-colors">
                    <span className="md:hidden font-display text-3xl font-bold text-teal-400 block mb-2">{event.year}</span>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{event.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{event.description}</p>
                </div>
            </div>
        </div>
    )
}
