import { useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/utils'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
    const { isNavScrolled, isMobileMenuOpen, setNavScrolled, setMobileMenuOpen } = useUIStore()
    const location = useLocation()

    // On pages other than home, we want the navbar to always have a background to ensure visibility
    const isHomePage = location.pathname === '/'
    const shouldShowBackground = isNavScrolled || !isHomePage

    const handleScroll = useCallback(() => {
        setNavScrolled(window.scrollY > 50)
    }, [setNavScrolled])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        // Trigger once on mount to set correct state
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                shouldShowBackground
                    ? 'bg-white shadow-lg py-4 border-b border-navy-100'
                    : 'bg-transparent py-6 border-b border-transparent'
            )}
        >
            <Container className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <img
                        src="/Logo-new-01.png"
                        alt="Fortune Construction Logo"
                        className={cn("h-10 md:h-12 w-auto object-contain transition-all duration-300", 
                            !shouldShowBackground && "brightness-0 invert" // Make logo white on transparent bg
                        )}
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.href
                        return (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={cn(
                                    "text-sm font-bold transition-colors duration-300 tracking-wide uppercase",
                                    isActive 
                                        ? "text-teal-500" // Active link
                                        : shouldShowBackground 
                                            ? "text-navy-700 hover:text-teal-500" // Light bg state (scrolled or inner page)
                                            : "text-white/90 hover:text-white" // Transparent bg state
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <Link to="/contact">
                        <Button
                            size="sm"
                            className={cn(
                                "px-6 py-2.5 h-auto rounded-sm font-bold transition-all duration-300 uppercase tracking-wider",
                                shouldShowBackground 
                                    ? "bg-teal-500 hover:bg-teal-600 text-white shadow-md shadow-teal-500/20" 
                                    : "bg-white hover:bg-teal-50 text-teal-600"
                            )}
                        >
                            Get a Quote
                        </Button>
                    </Link>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 transition-colors"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className={cn("w-6 h-6", shouldShowBackground ? "text-navy-900" : "text-white")} />
                    ) : (
                        <Menu className={cn("w-6 h-6", shouldShowBackground ? "text-navy-900" : "text-white")} />
                    )}
                </button>
            </Container>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-navy-100 px-6 py-6 flex flex-col gap-4 shadow-2xl">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.href
                        return (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "text-lg font-bold transition-colors text-left py-2 uppercase tracking-wide",
                                    isActive ? "text-teal-500" : "text-navy-700 hover:text-teal-500"
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4">
                        <Button
                            size="sm"
                            className="h-12 rounded-sm bg-teal-500 hover:bg-teal-600 text-white font-bold w-full text-lg uppercase tracking-wider shadow-md shadow-teal-500/20"
                        >
                            Get a Quote
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    )
}
