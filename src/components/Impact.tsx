import { useEffect, useRef, useState } from 'react'
import { Route, Home, Clock, CheckCircle } from 'lucide-react'

interface MetricItem {
    icon: React.ReactNode
    target: number
    suffix: string
    label: string
    description: string
    color: string
}

const METRICS: MetricItem[] = [
    {
        icon: <Route className="w-8 h-8" />,
        target: 1500,
        suffix: '+',
        label: 'KM of Roads Paved',
        description: 'Connecting communities across all regions of Malawi with durable, engineered roads.',
        color: 'bg-orange-500',
    },
    {
        icon: <Home className="w-8 h-8" />,
        target: 2000,
        suffix: '+',
        label: 'Families Housed',
        description: 'Quality residential and social housing projects delivered on time and on budget.',
        color: 'bg-navy-600',
    },
    {
        icon: <Clock className="w-8 h-8" />,
        target: 20,
        suffix: '+',
        label: 'Years of Experience',
        description: 'Two decades of expertise in civil, structural, and commercial construction.',
        color: 'bg-orange-500',
    },
    {
        icon: <CheckCircle className="w-8 h-8" />,
        target: 500,
        suffix: '+',
        label: 'Successful Projects',
        description: 'A proven track record of successful delivery for government and private clients.',
        color: 'bg-navy-600',
    },
]

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return
        const duration = 2000
        const start = Date.now()
        const timer = setInterval(() => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress >= 1) {
                setCount(target)
                clearInterval(timer)
            }
        }, 16)
        return () => clearInterval(timer)
    }, [isVisible, target])

    return (
        <span>
            {count.toLocaleString()}{suffix}
        </span>
    )
}

export default function Impact() {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="impact" ref={sectionRef} className="section-padding bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <p className="section-subtitle">Our Impact</p>
                    <h2 className="section-title max-w-2xl mx-auto">
                        Two Decades of Building a Stronger Malawi
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        Our numbers tell a story of commitment, craftsmanship, and community transformation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {METRICS.map((metric, i) => (
                        <div
                            key={metric.label}
                            className={`reveal reveal-delay-${i + 1} bg-white rounded-sm border border-gray-100 p-8 card-hover text-center shadow-sm`}
                        >
                            <div className={`${metric.color} w-16 h-16 rounded-sm flex items-center justify-center text-white mx-auto mb-6`}>
                                {metric.icon}
                            </div>
                            <p className="font-display text-5xl font-bold text-navy-700 mb-2">
                                <AnimatedCounter target={metric.target} suffix={metric.suffix} isVisible={isVisible} />
                            </p>
                            <p className="font-semibold text-gray-900 mb-3 text-sm tracking-wide uppercase">{metric.label}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{metric.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 bg-navy-800 rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                            Ready to build something remarkable?
                        </p>
                        <p className="text-white/60 text-base">Join hundreds of satisfied clients across Malawi.</p>
                    </div>
                    <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary whitespace-nowrap"
                    >
                        Discuss Your Project
                    </button>
                </div>
            </div>
        </section>
    )
}
