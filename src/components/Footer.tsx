import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Container } from './ui/Container'
import { FooterMap } from './footer/FooterMap'
import { FooterLinks } from './footer/FooterLinks'
import { Newsletter } from './footer/Newsletter'

const SOCIAL = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
]

export default function Footer() {
    return (
        <footer id="footer" className="bg-navy-900 text-white">
            <FooterMap />

            {/* Main footer */}
            <div className="py-16">
                <Container>
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
                        <FooterLinks />

                        {/* Newsletter */}
                        <Newsletter />
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
                </Container>
            </div>
        </footer>
    )
}
