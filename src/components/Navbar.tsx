import { useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
    { label: 'About', href: '#impact' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const { isNavScrolled, isMobileMenuOpen, setNavScrolled, setMobileMenuOpen } = useUIStore()

    const handleScroll = useCallback(() => {
        setNavScrolled(window.scrollY > 50)
    }, [setNavScrolled])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isNavScrolled
                    ? 'bg-navy-900/95 backdrop-blur-md shadow-lg py-3'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <button onClick={() => scrollTo('#hero')} className="flex items-center">
                    <img
                        src="/Logo-new-01.png"
                        alt="Fortune Construction Logo"
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </button>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="nav-link text-white/70 hover:text-white text-sm font-medium transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo('#contact')}
                        className="btn-primary text-sm px-6 py-3"
                    >
                        Get a Quote
                    </button>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-white/70 hover:text-orange-400 text-base font-medium transition-colors text-left py-2"
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo('#contact')}
                        className="btn-primary text-sm mt-2"
                    >
                        Get a Quote
                    </button>
                </div>
            )}
        </header>
    )
}
