import { Image } from '@/components/ui/Image';
import { motion } from 'framer-motion'
import { Container } from './ui/Container'
import { SectionHeader } from './ui/SectionHeader'

const PARTNERS = [
    { name: 'Ministry of Works', type: 'Government', logo: 'https://ui-avatars.com/api/?name=MoW&background=06162d&color=fff&size=128' },
    { name: 'Malawi Telecom', type: 'Corporate', logo: 'https://ui-avatars.com/api/?name=MTL&background=00c3b6&color=fff&size=128' },
    { name: 'National Bank', type: 'Corporate', logo: 'https://ui-avatars.com/api/?name=NB&background=06162d&color=fff&size=128' },
    { name: 'UN Development', type: 'International NGOs', logo: 'https://ui-avatars.com/api/?name=UNDP&background=00c3b6&color=fff&size=128' },
    { name: 'Roads Authority', type: 'Government', logo: 'https://ui-avatars.com/api/?name=RA&background=06162d&color=fff&size=128' },
    { name: 'Water Board', type: 'Government', logo: 'https://ui-avatars.com/api/?name=WB&background=00c3b6&color=fff&size=128' },
]

interface PartnersSectionProps {
    variant?: 'simple' | 'detailed'
}

export default function PartnersSection({ variant = 'simple' }: PartnersSectionProps) {
    if (variant === 'simple') {
        return (
            <section className="py-12 bg-white overflow-hidden border-y border-navy-50">
                <Container>
                    <div className="text-center mb-8 reveal">
                        <p className="text-navy-400 font-bold text-sm tracking-widest uppercase">Trusted by industry leaders</p>
                    </div>
                    {/* CSS Marquee animation */}
                    <div className="flex space-x-12 animate-[marquee_20s_linear_infinite]">
                        {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                            <div key={i} className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <Image src={partner.logo} alt={partner.name} className="h-16 w-16 rounded-full object-cover" />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        )
    }

    return (
        <section className="section-padding bg-navy-50">
            <Container>
                <SectionHeader
                    subtitle="Our Network"
                    title="Trusted Partnerships"
                    description="We collaborate with government bodies, corporate entities, and international NGOs to deliver excellence across Malawi."
                />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {PARTNERS.map((partner, i) => (
                        <motion.div 
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
                        >
                            <Image 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="h-20 w-20 rounded-full object-cover mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" 
                            />
                            <h4 className="font-bold text-navy-800 text-sm mb-1">{partner.name}</h4>
                            <span className="text-xs text-teal-500 font-medium">{partner.type}</span>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
