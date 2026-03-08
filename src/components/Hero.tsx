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
            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6">
                    Building <span className="text-orange-400 italic">Malawi&apos;s</span>
                    <br />
                    Future.
                </h1>

                <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
                    Two decades of excellence in civil engineering and landmark construction projects across the nation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={() => scrollTo('#contact')}
                        className="h-12 px-8 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base"
                    >
                        Start Your Project
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

                <HeroStats />
            </div>

            {/* Scroll indicator */}
            <button
                onClick={() => scrollTo('#impact')}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-orange-400 transition-colors animate-bounce"
                aria-label="Scroll down"
            >
                <ArrowDown className="w-6 h-6" />
            </button>
        </section>
    )
}
