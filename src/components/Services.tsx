import { Route, Building2, Layers, ArrowRight, Wrench, BarChart3, ShieldCheck } from 'lucide-react'

interface Service {
    icon: React.ReactNode
    title: string
    tagline: string
    description: string
    features: string[]
    accentColor: string
    bgImage: string
}

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

const WHY_US = [
    { icon: <Wrench className="w-5 h-5" />, title: 'Certified Engineering Teams', desc: 'Licensed engineers and qualified technicians on every project.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'On-Time Delivery', desc: 'Industry-leading project management ensuring schedule adherence.' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Quality Assurance', desc: 'Rigorous QA processes at every stage from foundation to finish.' },
]

export default function Services() {
    return (
        <section id="services" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <p className="section-subtitle">What We Build</p>
                    <h2 className="section-title max-w-2xl mx-auto">
                        Comprehensive Construction Services
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        From groundbreaking to handover, Fortune Construction delivers full-scope construction across Malawi&apos;s most critical sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {SERVICES.map((service, i) => (
                        <div
                            key={service.title}
                            className={`reveal reveal-delay-${i + 1} group bg-white border border-gray-100 rounded-sm shadow-sm card-hover overflow-hidden flex flex-col`}
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.bgImage}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-navy-900/50" />
                                <div className={`absolute top-4 left-4 w-1 h-12 ${service.accentColor.replace('border-', 'bg-')}`} />
                                <div className="absolute bottom-4 left-6 text-white">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 p-8 border-l-4 ${service.accentColor}`}>
                                <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-2">{service.tagline}</p>
                                <h3 className="font-display text-2xl font-bold text-navy-700 mb-4">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feat) => (
                                        <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition-all duration-200"
                                >
                                    Enquire Now <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why us strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {WHY_US.map((item) => (
                        <div key={item.title} className="reveal flex items-start gap-4 p-6 bg-gray-50 rounded-sm">
                            <div className="text-orange-500 mt-0.5 flex-shrink-0">{item.icon}</div>
                            <div>
                                <p className="font-semibold text-navy-700 mb-1">{item.title}</p>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
