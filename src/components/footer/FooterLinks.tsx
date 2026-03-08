const FOOTER_LINKS = {
    Company: [
        { label: 'About Us', href: '#impact' },
        { label: 'Services', href: '#services' },
        { label: 'Our Projects', href: '#projects' },
        { label: 'Partners', href: '#partners' },
        { label: 'Contact', href: '#contact' },
    ],
    Services: [
        { label: 'Roads & Infrastructure', href: '#services' },
        { label: 'Commercial Buildings', href: '#services' },
        { label: 'Bridges & Structures', href: '#services' },
        { label: 'Project Management', href: '#services' },
        { label: 'Site Supervision', href: '#services' },
    ],
}

export function FooterLinks() {
    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                <div key={title}>
                    <p className="text-white font-semibold text-sm tracking-widest uppercase mb-5">{title}</p>
                    <ul className="space-y-3">
                        {links.map((link) => (
                            <li key={link.label}>
                                <button
                                    onClick={() => scrollTo(link.href)}
                                    className="text-white/40 hover:text-teal-400 text-sm transition-colors text-left"
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}
