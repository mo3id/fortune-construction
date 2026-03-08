import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceCardProps } from '@/types'

export function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <div
            className={cn(
                `reveal reveal-delay-${index + 1}`,
                "group bg-white border border-gray-100 rounded-sm shadow-sm card-hover overflow-hidden flex flex-col"
            )}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.bgImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy-900/50" />
                <div className={cn(
                    "absolute top-4 left-4 w-1 h-12",
                    service.accentColor.replace('border-', 'bg-')
                )} />
                <div className="absolute bottom-4 left-6 text-white">
                    {service.icon}
                </div>
            </div>

            {/* Content */}
            <div className={cn("flex-1 p-8 border-l-4", service.accentColor)}>
                <p className="text-teal-500 text-xs font-semibold tracking-widest uppercase mb-2">{service.tagline}</p>
                <h3 className="font-display text-2xl font-bold text-navy-800 mb-4">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                    {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                            {feat}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 text-teal-500 font-semibold text-sm hover:gap-3 transition-all duration-200"
                >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
