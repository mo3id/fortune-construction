import { Route, Building2, Layers } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { SectionHeader } from './ui/SectionHeader'
import { Container } from './ui/Container'
import { ServiceCard } from './services/ServiceCard'
import { WhyUs } from './services/WhyUs'
import { Service } from '@/types'
import { apiFetch } from '@/lib/apiClient'

const ACCENT_COLORS = ['border-teal-500', 'border-navy-800', 'border-teal-400']
const ICONS = [<Route className="w-10 h-10" />, <Building2 className="w-10 h-10" />, <Layers className="w-10 h-10" />]

interface ApiService { _id: string; title: string; tagline: string; description: string; features: string[]; bgImage: string; order: number }

const FALLBACK: Service[] = [
    { icon: <Route className="w-10 h-10" />, title: 'Roads & Infrastructure', tagline: 'Connecting Malawi, Mile by Mile', description: "From rural feeder roads to major national highways, we engineer and construct road infrastructure that withstands Malawi's diverse terrain.", features: ['Highway Construction', 'Drainage Systems', 'Bridges & Culverts', 'Road Rehabilitation'], accentColor: 'border-teal-500', bgImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80' },
    { icon: <Building2 className="w-10 h-10" />, title: 'Building & Commercial Construction', tagline: 'Spaces That Work and Inspire', description: 'We deliver commercial offices, government facilities, schools, hospitals, and residential estates.', features: ['Commercial Offices', 'Government Facilities', 'Residential Estates', 'Educational Institutions'], accentColor: 'border-navy-800', bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { icon: <Layers className="w-10 h-10" />, title: 'Bridges & Structural Works', tagline: 'Engineering That Endures Generations', description: 'Complex structural projects demand exceptional engineering. Our teams plan, design, and construct bridges and structural works.', features: ['RC Bridge Construction', 'Steel Structures', 'Retaining Walls', 'Structural Rehabilitation'], accentColor: 'border-teal-400', bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
]

export default function Services() {
    const { data: apiServices } = useQuery<ApiService[]>({
        queryKey: ['services'],
        queryFn: () => apiFetch<ApiService[]>('/services'),
        staleTime: 60_000,
    })

    const services: Service[] = apiServices?.length
        ? apiServices.map((s, i) => ({
            icon: ICONS[i % ICONS.length],
            title: s.title,
            tagline: s.tagline,
            description: s.description,
            features: s.features,
            accentColor: ACCENT_COLORS[i % ACCENT_COLORS.length],
            bgImage: s.bgImage,
        }))
        : FALLBACK

    return (
        <section id="services" className="section-padding bg-white">
            <Container>
                <SectionHeader
                    subtitle="What We Build"
                    title="Comprehensive Construction Services"
                    description="From groundbreaking to handover, Fortune Construction delivers full-scope construction across Malawi's most critical sectors."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>

                <WhyUs />
            </Container>
        </section>
    )
}
