import { useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/utils'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { NAV_LINKS } from '@/lib/constants'
import { useScrollTo } from '@/hooks/useScrollTo'

export default function Navbar() {
    const { isNavScrolled, isMobileMenuOpen, setNavScrolled, setMobileMenuOpen } = useUIStore()
    const _scrollTo = useScrollTo()

    const handleScroll = useCallback(() => {
        setNavScrolled(window.scrollY > 50)
    }, [setNavScrolled])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const scrollTo = (href: string) => {
        _scrollTo(href)
        setMobileMenuOpen(false)
    }

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5',
                isNavScrolled
                    ? 'bg-navy-800/80 backdrop-blur-xl shadow-2xl py-3 border-white/10'
                    : 'bg-transparent py-6'
            )}
        >
            <Container className="flex items-center justify-between">
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
                    <Button
                        onClick={() => scrollTo('#contact')}
                        size="sm"
                        className="px-6 py-2.5 h-auto rounded-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold"
                    >
                        Get a Quote
                    </Button>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </Container>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-white/70 hover:text-teal-400 text-base font-medium transition-colors text-left py-2"
                        >
                            {link.label}
                        </button>
                    ))}
                    <Button
                        onClick={() => scrollTo('#contact')}
                        size="sm"
                        className="mt-2 h-10 rounded-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full"
                    >
                        Get a Quote
                    </Button>
                </div>
            )}
        </header>
    )
}
