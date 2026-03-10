import { useState, useEffect } from 'react'
import { ArrowDown, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoBackground } from './hero/VideoBackground'
import { HeroStats } from './hero/HeroStats'
import { HERO_VIDEOS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Hero() {
    const [currentVideo, setCurrentVideo] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const scrollTo = (selector: string) =>
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
        >
            <VideoBackground currentIndex={currentVideo} />

            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-900/85 via-navy-800/60 to-navy-900/90" />

            {/* Decorative grid */}
            <div
                className="absolute inset-0 z-10 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    20 Years of Construction Excellence
                </div>

                <h1 className="font-display text-7xl md:text-9xl font-bold text-white leading-[0.85] mb-8 animate-fade-up tracking-tighter">
                    Crafting <span className="text-gradient">Visionary</span>
                    <br />
                    Infrastructure.
                </h1>

                <p className="text-white/70 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-up [animation-delay:200ms]">
                    Fortune Construction Limited delivers world-class civil engineering across Malawi, building the bedrock of national progress.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-up [animation-delay:400ms]">
                    <Button
                        onClick={() => scrollTo('#contact')}
                        className="h-14 px-10 rounded-sm bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold text-lg shadow-[0_0_20px_rgba(0,195,182,0.3)] transition-all duration-300 transform hover:scale-105"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => scrollTo('#projects')}
                        className={cn(
                            "h-12 px-8 rounded-sm text-base font-semibold gap-2",
                            "border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                        )}
                    >
                        <PlayCircle className="w-5 h-5" />
                        View Our Work
                    </Button>
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={() => scrollTo('#impact')}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-teal-400 transition-colors animate-bounce"
                aria-label="Scroll down"
            >
                <ArrowDown className="w-6 h-6" />
            </button>
        </section>
    )
}
