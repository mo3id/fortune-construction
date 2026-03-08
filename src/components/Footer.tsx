import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

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

const SOCIAL = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
]

export default function Footer() {
    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer id="footer" className="bg-navy-900 text-white">
            {/* Map + Info bar */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Map Embed */}
                <div className="h-64 lg:h-80 bg-navy-800 relative overflow-hidden">
                    <iframe
                        title="Fortune Construction Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124596.50703698217!2d33.72137755312498!3d-13.985649200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d5b6a9fa6c67%3A0x13d7c85fb2c8a8e0!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2s!4v1700000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(80%) invert(90%) contrast(90%)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 pointer-events-none border-b-4 border-orange-500" />
                </div>

                {/* Contact quick info */}
                <div className="bg-navy-800 p-10 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold mb-6">Find Us in Lilongwe</h3>
                    <div className="space-y-4">
                        <a href="https://maps.google.com" className="flex items-start gap-3 text-white/60 hover:text-orange-400 transition-colors group">
                            <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Plot 123, Area 4, Lilongwe, Malawi</span>
                        </a>
                        <a href="tel:+26512345678" className="flex items-center gap-3 text-white/60 hover:text-orange-400 transition-colors">
                            <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">+265 1 234 5678</span>
                        </a>
                        <a href="mailto:info@fortuneconstruction.mw" className="flex items-center gap-3 text-white/60 hover:text-orange-400 transition-colors">
                            <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">info@fortuneconstruction.mw</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-6">
                            <img
                                src="/Logo-new-01.png"
                                alt="Fortune Construction Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Building Malawi&apos;s future with integrity, expertise, and commitment to excellence since 2004.
                        </p>

                        {/* Social */}
                        <div className="flex gap-3">
                            {SOCIAL.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-9 h-9 bg-white/5 hover:bg-orange-500 rounded-sm flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title}>
                            <p className="text-white font-semibold text-sm tracking-widest uppercase mb-5">{title}</p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => scrollTo(link.href)}
                                            className="text-white/40 hover:text-orange-400 text-sm transition-colors text-left"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <p className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Stay Updated</p>
                        <p className="text-white/40 text-sm mb-4 leading-relaxed">
                            Subscribe for project news and industry updates from our team.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-sm transition-colors text-sm font-semibold">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs">
                        &copy; {new Date().getFullYear()} Fortune Construction Limited. All rights reserved. Registered in Malawi.
                    </p>
                    <div className="flex gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
                            <button key={link} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                                {link}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
