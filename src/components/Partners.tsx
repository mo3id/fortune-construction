import { useQuery } from '@tanstack/react-query'
import { Container, SectionHeader } from '@fortune/shared-ui'
import { PartnerLogo } from './partners/PartnerLogo'
import { TestimonialCard } from './partners/TestimonialCard'
import { apiFetch } from '@/lib/apiClient'

interface ApiPartner { _id: string; name: string; abbr: string; logo?: string; order: number }

const FALLBACK_PARTNERS = [
    { name: 'Ministry of Public Works', abbr: 'MPW', color: '#1e3a5f' },
    { name: 'African Development Bank', abbr: 'AfDB', color: '#c9a227' },
    { name: 'World Bank Group', abbr: 'WBG', color: '#1e3a5f' },
    { name: 'JICA Malawi', abbr: 'JICA', color: '#c9a227' },
    { name: 'EU Development', abbr: 'EU', color: '#1e3a5f' },
    { name: 'ROADS Authority', abbr: 'RA', color: '#c9a227' },
]

const COLORS = ['#1e3a5f', '#c9a227']

const TESTIMONIALS = [
    {
        quote: 'Fortune Construction delivered our road rehabilitation project on time and to the highest standard. Their professionalism and technical capability is unmatched in Malawi.',
        author: 'Principal Secretary',
        org: 'Ministry of Transport, Malawi',
        initials: 'PS',
    },
    {
        quote: "The bridge project was complex, but Fortune's engineering team navigated every challenge with expertise. We've worked with them on three major contracts and they consistently exceed expectations.",
        author: 'Regional Director',
        org: 'Roads Authority, Malawi',
        initials: 'RD',
    },
]

export default function Partners() {
    const { data: apiPartners } = useQuery<ApiPartner[]>({
        queryKey: ['partners'],
        queryFn: () => apiFetch<ApiPartner[]>('/partners'),
        staleTime: 60_000,
    })

    const partners = apiPartners?.length
        ? apiPartners.map((p, i) => ({ name: p.name, abbr: p.abbr, color: COLORS[i % COLORS.length], logo: p.logo }))
        : FALLBACK_PARTNERS

    return (
        <section id="partners" className="section-padding bg-white">
            <Container>
                <SectionHeader
                    subtitle="Trusted Partners"
                    title="Partnering with Institutions That Matter"
                    description="We work alongside leading government agencies, development banks, and international organisations."
                />

                {/* Partners grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {partners.map((partner, i) => (
                        <PartnerLogo key={partner.name} partner={partner} index={i} />
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard key={t.author} testimonial={t} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
