import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container, SectionHeader, PageHero } from '@fortune/shared-ui'
import PartnersSection from '@/components/PartnersSection'
import { ShieldCheck, HardHat, Leaf, Award, Download } from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'

interface HSEContent {
    policies?: { items?: { title: string; description: string; icon?: string }[] }
    safetyStats?: { items?: { value: string; label: string }[] }
    certifications?: { title?: string; subtitle?: string; description?: string; items?: { title: string; image?: string }[] }
}

const POLICY_ICON_MAP: Record<string, ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-10 h-10" />,
    HardHat: <HardHat className="w-10 h-10" />,
    Leaf: <Leaf className="w-10 h-10" />,
}

function isImageUrl(str?: string) {
    if (!str) return false
    return str.startsWith('http') || str.startsWith('/') || str.startsWith('data:')
}

function renderPolicyIcon(icon?: string) {
    if (!icon) return <ShieldCheck className="w-10 h-10" />
    if (isImageUrl(icon)) return <img src={icon} alt="" className="w-10 h-10 object-contain" />
    return POLICY_ICON_MAP[icon] || <ShieldCheck className="w-10 h-10" />
}

export default function HSEPage() {
    const { data: hseContent } = usePageContent<HSEContent>('hse')

    const policies = hseContent?.policies?.items?.length ? hseContent.policies.items : [
        { title: 'Health & Safety', description: 'Our "Zero Harm" policy ensures rigorous training, daily site briefings, and strict adherence to international safety protocols. Every worker returns home safely, every day.', icon: 'ShieldCheck' },
        { title: 'Quality Control', description: 'We source premium materials, conduct exhaustive structural testing, and utilize advanced engineering technologies to guarantee the longevity and resilience of our infrastructure.', icon: 'HardHat' },
        { title: 'Environmental Policy', description: "Dedicated to preserving Malawi's natural beauty, we minimize construction waste, optimize resource efficiency, and actively implement sustainable building practices.", icon: 'Leaf' },
    ]

    const stats = hseContent?.safetyStats?.items?.length ? hseContent.safetyStats.items : [
        { value: '1M+', label: 'Man-hours Without LTI' },
        { value: '100%', label: 'Workers HSE Certified' },
        { value: 'ISO', label: '9001:2015 Compliant' },
    ]

    const certs = hseContent?.certifications
    const certItems = certs?.items?.length ? certs.items : [
        { title: 'ISO 9001:2015' },
        { title: 'ISO 14001:2015' },
        { title: 'ISO 45001:2018' },
        { title: 'NEBOSH Certified' },
    ]

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title={<>Uncompromising Commitment to <span className="text-teal-500">Safety & Quality</span></>}
                description="At Fortune Construction, excellence is not just about what we build, but how we build it. Protecting our people, our communities, and our environment is our highest priority."
                imageSrc="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Safety First at Fortune Construction"
            />

            {/* Core Policies */}
            <section className="section-padding bg-navy-50">
                <Container>
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {policies.map((policy, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-sm card-hover border border-navy-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-8 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                                    {renderPolicyIcon(policy.icon)}
                                </div>
                                <h3 className="text-2xl font-display font-bold text-navy-800 mb-4">{policy.title}</h3>
                                <p className="text-navy-600 leading-relaxed font-light">{policy.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Safety Stats Banner */}
            <section className="py-20 bg-navy-900 text-white relative overflow-hidden border-y border-teal-500/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=2000&auto=format&fit=crop&fm=webp')] bg-cover bg-center opacity-5 mix-blend-overlay" />
                <Container className="relative z-10">
                    <div className={`grid grid-cols-1 md:grid-cols-${stats.length} gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center`}>
                        {stats.map((stat, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="pt-8 md:pt-0">
                                <div className="text-5xl md:text-6xl font-display font-bold text-teal-400 mb-3 drop-shadow-lg">{stat.value}</div>
                                <div className="text-sm tracking-widest uppercase text-teal-50/70 font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Certifications */}
            <section className="section-padding bg-white">
                <Container>
                    <SectionHeader
                        subtitle={certs?.subtitle || "Recognized Excellence"}
                        title={certs?.title || "Our Accreditations"}
                        description={certs?.description || "We operate strictly according to international standards for quality management and occupational safety."}
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {certItems.map((cert, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="aspect-square bg-navy-50 border border-navy-100 rounded-sm flex items-center justify-center p-8 shadow-sm hover:shadow-xl hover:border-teal-500 transition-all cursor-pointer group"
                            >
                                <div className="text-center opacity-60 group-hover:opacity-100 group-hover:text-teal-600 transition-all">
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.title} className="w-16 h-16 mx-auto mb-4 object-contain" />
                                    ) : (
                                        <Award className="w-16 h-16 mx-auto mb-4" />
                                    )}
                                    <span className="font-bold text-sm uppercase tracking-wider">{cert.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Partners Grid */}
            <PartnersSection variant="detailed" />

            {/* Download Policy */}
            <section className="py-24 px-6 bg-navy-50 text-center border-t border-navy-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800 mb-6">Review Our Full HSE Policy</h2>
                    <p className="text-navy-600 mb-10 text-lg font-light leading-relaxed">
                        Transparency is key to our operations. Download our comprehensive Health, Safety, and Environmental policy document to understand our standards in detail.
                    </p>
                    <button className="btn-primary py-5 px-10 text-lg">
                        <Download className="w-6 h-6 mr-3" /> Download Policy PDF
                    </button>
                </div>
            </section>
        </div>
    )
}
