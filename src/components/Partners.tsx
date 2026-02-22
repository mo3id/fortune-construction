const PARTNERS = [
    { name: 'Ministry of Public Works', abbr: 'MPW', color: '#1e3a5f' },
    { name: 'African Development Bank', abbr: 'AfDB', color: '#c9a227' },
    { name: 'World Bank Group', abbr: 'WBG', color: '#1e3a5f' },
    { name: 'JICA Malawi', abbr: 'JICA', color: '#c9a227' },
    { name: 'EU Development', abbr: 'EU', color: '#1e3a5f' },
    { name: 'ROADS Authority', abbr: 'RA', color: '#c9a227' },
    { name: 'National Construction', abbr: 'NCI', color: '#1e3a5f' },
    { name: 'Malawi Housing Corp', abbr: 'MHC', color: '#c9a227' },
]

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
    return (
        <section id="partners" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <p className="section-subtitle">Trusted Partners</p>
                    <h2 className="section-title max-w-2xl mx-auto">
                        Partnering with Institutions That Matter
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        We work alongside leading government agencies, development banks, and international organisations.
                    </p>
                </div>

                {/* Partners grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {PARTNERS.map((partner, i) => (
                        <div
                            key={partner.name}
                            className={`reveal reveal-delay-${(i % 4) + 1} partner-logo group border border-gray-100 rounded-sm p-6 flex flex-col items-center justify-center gap-3 cursor-pointer card-hover`}
                        >
                            <div
                                className="w-16 h-16 rounded-sm flex items-center justify-center text-white font-display font-bold text-xl"
                                style={{ backgroundColor: partner.color }}
                            >
                                {partner.abbr}
                            </div>
                            <p className="text-gray-400 text-xs text-center font-medium leading-tight group-hover:text-gray-600 transition-colors">
                                {partner.name}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.author} className="reveal bg-gray-50 rounded-sm p-8 border-l-4 border-orange-500">
                            <div className="text-orange-400 text-5xl font-serif leading-none mb-4">&ldquo;</div>
                            <p className="text-gray-600 italic text-base leading-relaxed mb-6">{t.quote}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-navy-600 rounded-sm flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-navy-700 text-sm">{t.author}</p>
                                    <p className="text-gray-400 text-xs">{t.org}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
