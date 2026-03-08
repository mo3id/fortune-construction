import { Route, Building2, Layers } from 'lucide-react'
import { SectionHeader } from './ui/SectionHeader'
import { Container } from './ui/Container'
import { ServiceCard } from './services/ServiceCard'
import { WhyUs } from './services/WhyUs'
import { Service } from '@/types'

const SERVICES: Service[] = [
    {
        icon: <Route className="w-10 h-10" />,
        title: 'Roads & Infrastructure',
        tagline: 'Connecting Malawi, Mile by Mile',
        description:
            "From rural feeder roads to major national highways, we engineer and construct road infrastructure that withstands Malawi's diverse terrain and climate. Our civil engineering team applies international standards to every kilometre.",
        features: ['Highway Construction', 'Drainage Systems', 'Bridges & Culverts', 'Road Rehabilitation'],
        accentColor: 'border-orange-500',
        bgImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
    },
    {
        icon: <Building2 className="w-10 h-10" />,
        title: 'Building & Commercial Construction',
        tagline: 'Spaces That Work and Inspire',
        description:
            'We deliver commercial offices, government facilities, schools, hospitals, and residential estates. Our building teams combine technical precision with local material expertise to produce enduring structures on schedule.',
        features: ['Commercial Offices', 'Government Facilities', 'Residential Estates', 'Educational Institutions'],
        accentColor: 'border-navy-500',
        bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    },
    {
        icon: <Layers className="w-10 h-10" />,
        title: 'Bridges & Structural Works',
        tagline: 'Engineering That Endures Generations',
        description:
            'Complex structural projects demand exceptional engineering. Our experienced teams plan, design, and construct bridges, retaining walls, and structural works that meet the highest safety and durability standards across Malawi.',
        features: ['RC Bridge Construction', 'Steel Structures', 'Retaining Walls', 'Structural Rehabilitation'],
        accentColor: 'border-gold',
        bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
]

export default function Services() {
    return (
        <section id="services" className="section-padding bg-white">
            <Container>
                <SectionHeader
                    subtitle="What We Build"
                    title="Comprehensive Construction Services"
                    description="From groundbreaking to handover, Fortune Construction delivers full-scope construction across Malawi's most critical sectors."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {SERVICES.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>

                <WhyUs />
            </Container>
        </section>
    )
}
