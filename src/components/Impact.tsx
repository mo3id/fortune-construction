import { useEffect, useRef, useState } from 'react'
import { Route, Home, Clock, CheckCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeader } from './ui/SectionHeader'
import { MetricCard } from './impact/MetricCard'
import { ImpactCTA } from './impact/ImpactCTA'

const METRICS = [
    {
        icon: <Route className="w-8 h-8" />,
        target: 1500,
        suffix: '+',
        label: 'KM of Roads Paved',
        description: 'Connecting communities across all regions of Malawi with durable, engineered roads.',
        color: 'bg-teal-500',
    },
    {
        icon: <Home className="w-8 h-8" />,
        target: 2000,
        suffix: '+',
        label: 'Families Housed',
        description: 'Quality residential and social housing projects delivered on time and on budget.',
        color: 'bg-navy-800',
    },
    {
        icon: <Clock className="w-8 h-8" />,
        target: 20,
        suffix: '+',
        label: 'Years of Experience',
        description: 'Two decades of expertise in civil, structural, and commercial construction.',
        color: 'bg-teal-500',
    },
    {
        icon: <CheckCircle className="w-8 h-8" />,
        target: 500,
        suffix: '+',
        label: 'Successful Projects',
        description: 'A proven track record of successful delivery for government and private clients.',
        color: 'bg-navy-800',
    },
]

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
            <Container>
                <SectionHeader
                    subtitle="Our Impact"
                    title="Two Decades of Building a Stronger Malawi"
                    description="Our numbers tell a story of commitment, craftsmanship, and community transformation."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {METRICS.map((metric, i) => (
                        <MetricCard key={metric.label} metric={metric} index={i} isVisible={isVisible} />
                    ))}
                </div>

                <ImpactCTA />
            </Container>
        </section>
    )
}
