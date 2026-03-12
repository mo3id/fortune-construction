import { Image, PageHero } from '@fortune/shared-ui'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Target, Users, HardHat } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { usePageContent } from '@/hooks/usePageContent'
import { ReactNode } from 'react'

interface ApiTeamMember { _id: string; name: string; role: string; photo?: string; bio?: string; order: number }

interface AboutContent {
    vision?: { title?: string; description?: string }
    mission?: { title?: string; description?: string }
    timeline?: { title?: string; subtitle?: string; items?: { year: string; title: string; desc: string }[] }
    coreValues?: { title?: string; subtitle?: string; items?: { title: string; desc: string; icon?: string }[] }
}

const VALUE_ICON_MAP: Record<string, ReactNode> = {
    Shield: <Shield />,
    CheckCircle: <CheckCircle />,
    Users: <Users />,
}

function isImageUrl(str?: string) {
    if (!str) return false
    return str.startsWith('http') || str.startsWith('/') || str.startsWith('data:')
}

function renderIcon(icon?: string, fallback: ReactNode = <Shield />) {
    if (!icon) return fallback
    if (isImageUrl(icon)) return <img src={icon} alt="" className="w-8 h-8 object-contain" />
    return VALUE_ICON_MAP[icon] || fallback
}

const FALLBACK_LEADERS = [
    { name: "David Chen", role: "Managing Director", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop&fm=webp" },
    { name: "Sarah Banda", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop&fm=webp" },
    { name: "Michael Tembo", role: "Chief Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop&fm=webp" },
    { name: "Elena Phiri", role: "HSE Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop&fm=webp" }
]

export default function AboutPage() {
    const { data: apiTeam } = useQuery<ApiTeamMember[]>({
        queryKey: ['team'],
        queryFn: () => apiFetch<ApiTeamMember[]>('/team'),
        staleTime: 60_000,
    })

    const { data: aboutContent } = usePageContent<AboutContent>('about')

    const leaders = apiTeam?.length
        ? apiTeam.map(m => ({ name: m.name, role: m.role, img: m.photo || '' }))
        : FALLBACK_LEADERS

    const vision = aboutContent?.vision
    const mission = aboutContent?.mission
    const timeline = aboutContent?.timeline
    const coreValues = aboutContent?.coreValues

    const timelineItems = timeline?.items?.length ? timeline.items : [
        { year: '2006', title: 'Company Founded', desc: 'Established in Lilongwe as a specialized contractor for residential projects.' },
        { year: '2012', title: 'First Government Contract', desc: 'Awarded a major road infrastructure project, marking our entry into the public sector.' },
        { year: '2018', title: 'ISO Certification', desc: 'Achieved international recognition for quality management and safety standards.' },
        { year: '2026', title: 'National Leader', desc: 'Celebrating 20 years with over 150 completed landmark projects across Malawi.' }
    ]

    const valueItems = coreValues?.items?.length ? coreValues.items : [
        { icon: 'Shield', title: 'Safety First', desc: 'Zero compromises when it comes to the health and safety of our workforce and the public.' },
        { icon: 'CheckCircle', title: 'Uncompromising Quality', desc: 'Rigorous material testing and engineering precision in every phase of construction.' },
        { icon: 'Users', title: 'Community Impact', desc: 'Building sustainably and empowering local talent to foster long-term national development.' }
    ]

    return (
        <div className="flex flex-col w-full">
            <PageHero 
                title={<>Two Decades of Building <span className="text-teal-500">Malawi's Future</span></>}
                description="Since 2006, Fortune Construction has been a cornerstone of infrastructure development, delivering excellence through engineering precision and unwavering commitment to safety."
                imageSrc="https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Construction in Malawi"
            />

            {/* Vision & Mission */}
            <section className="section-padding bg-navy-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-10 md:p-14 rounded-sm shadow-xl shadow-navy-900/5 border-t-4 border-teal-500"
                    >
                        <Target className="w-12 h-12 text-teal-500 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800 mb-6">{vision?.title || 'Our Vision'}</h2>
                        <p className="text-navy-600 leading-relaxed text-lg font-light">
                            {vision?.description || 'To be the premier civil engineering and construction firm in East Africa, recognized for delivering world-class infrastructure that drives economic growth and improves the quality of life in the communities we serve.'}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-navy-900 p-10 md:p-14 rounded-sm shadow-xl"
                    >
                        <Shield className="w-12 h-12 text-teal-500 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{mission?.title || 'Our Mission'}</h2>
                        <p className="text-teal-50/80 leading-relaxed text-lg font-light">
                            {mission?.description || 'To provide exceptional construction services through innovation, rigorous quality control, and an uncompromising commitment to Health, Safety, and Environment (HSE) standards, ensuring every project stands the test of time.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Timeline */}
            <section className="section-padding bg-navy-50 border-t border-navy-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-subtitle"
                        >
                            {timeline?.subtitle || 'Our Journey'}
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="section-title"
                        >
                            {timeline?.title || 'A Legacy of Excellence'}
                        </motion.h2>
                    </div>

                    <div className="relative">
                        {/* Central Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500/50 via-teal-500 to-teal-500/50 transform md:-translate-x-1/2" />

                        {timelineItems.map((item, index) => (
                            <motion.div 
                                key={item.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-teal-500 transform -translate-x-[7px] md:-translate-x-1/2 mt-1.5 ring-8 ring-navy-50 z-10 shadow-lg shadow-teal-500/30" />
                                
                                {/* Empty Half for Spacing on Desktop */}
                                <div className="hidden md:block w-1/2" />
                                
                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                    <div className="bg-white p-8 rounded-sm shadow-xl border border-navy-100 card-hover group relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="text-teal-500 font-display font-bold text-3xl mb-2 tracking-wider drop-shadow-sm">{item.year}</div>
                                        <h3 className="text-xl font-bold text-navy-800 mb-3 group-hover:text-teal-600 transition-colors">{item.title}</h3>
                                        <p className="text-navy-600 font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-navy-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-subtitle">{coreValues?.subtitle || 'What Drives Us'}</span>
                        <h2 className="section-title">{coreValues?.title || 'Our Core Values'}</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {valueItems.map((value, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-sm card-hover shadow-sm border border-navy-100"
                            >
                                <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-8">
                                    {renderIcon(value.icon)}
                                </div>
                                <h3 className="text-xl font-display font-bold text-navy-800 mb-4">{value.title}</h3>
                                <p className="text-navy-600 font-light leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team Placeholder */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="section-subtitle">Our Leadership</span>
                        <h2 className="section-title">Led by Engineering Excellence</h2>
                        <p className="text-navy-600 max-w-2xl mx-auto text-lg mb-12 font-light">
                            Our leadership team brings together decades of global expertise and deep local knowledge to deliver projects that redefine Malawi's landscape.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {leaders.map((leader, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[3/4] rounded-sm overflow-hidden mb-6 relative shadow-lg">
                                    <Image 
                                        src={leader.img} 
                                        alt={leader.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <h3 className="font-display font-bold text-2xl mb-1 text-navy-800 group-hover:text-teal-600 transition-colors">{leader.name}</h3>
                                <p className="text-teal-600 text-sm font-bold uppercase tracking-wider">{leader.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
