import { Flag, Award, TrendingUp, Globe, Zap, Star } from 'lucide-react'

interface TimelineEvent {
    year: string
    title: string
    description: string
    icon: React.ReactNode
    highlight?: boolean
}

const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        year: '2004',
        title: 'Company Founded',
        description: 'Fortune Construction was established in Lilongwe with a vision to transform infrastructure development in Malawi through professional excellence.',
        icon: <Flag className="w-5 h-5" />,
        highlight: false,
    },
    {
        year: '2008',
        title: 'First Major Government Contract',
        description: 'Awarded the M2 Road Rehabilitation Project — a milestone contract that cemented our reputation as a reliable government partner.',
        icon: <Award className="w-5 h-5" />,
        highlight: true,
    },
    {
        year: '2012',
        title: 'Expansion to Northern Region',
        description: 'Opened regional offices in Mzuzu, enabling delivery of infrastructure projects throughout northern Malawi including rural road networks.',
        icon: <TrendingUp className="w-5 h-5" />,
        highlight: false,
    },
    {
        year: '2015',
        title: 'International Partnerships',
        description: 'Formed strategic partnerships with international engineering firms, bringing world-class expertise and modern construction techniques to Malawi.',
        icon: <Globe className="w-5 h-5" />,
        highlight: true,
    },
    {
        year: '2019',
        title: '100th Bridge Completed',
        description: 'A historic milestone — the completion of our 100th bridge project, strengthening connectivity for rural communities across the country.',
        icon: <Zap className="w-5 h-5" />,
        highlight: false,
    },
    {
        year: '2024',
        title: '20 Years of Excellence',
        description: 'Celebrating two decades of landmark construction — 500+ projects, 1,500+ km of roads, and 2,000+ families housed across Malawi.',
        icon: <Star className="w-5 h-5" />,
        highlight: true,
    },
]

export default function Timeline() {
    return (
        <section id="timeline" className="section-padding bg-navy-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <p className="text-orange-400 font-semibold text-sm tracking-[0.2em] uppercase mb-4">Our Story</p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                        A Legacy Built Year by Year
                    </h2>
                    <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        From a humble beginning in 2004 to becoming Malawi&apos;s trusted construction leader — this is our journey.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {TIMELINE_EVENTS.map((event, i) => (
                            <div
                                key={event.year}
                                className={`reveal reveal-delay-${(i % 4) + 1} relative flex flex-col md:flex-row gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline node */}
                                <div
                                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-sm flex items-center justify-center z-10 transition-all ${event.highlight
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                            : 'bg-navy-600 text-white/60 border border-white/10'
                                        }`}
                                >
                                    {event.icon}
                                </div>

                                {/* Year label (desktop center) */}
                                <div className={`hidden md:flex items-center justify-center w-1/2 ${i % 2 === 0 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                                    <span className={`font-display text-5xl font-bold ${event.highlight ? 'text-orange-400' : 'text-white/20'}`}>
                                        {event.year}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                                    <div className="bg-white/5 border border-white/10 rounded-sm p-6 hover:bg-white/[0.08] transition-colors">
                                        <span className="md:hidden font-display text-3xl font-bold text-orange-400 block mb-2">{event.year}</span>
                                        <h3 className="font-display text-xl font-bold text-white mb-3">{event.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
