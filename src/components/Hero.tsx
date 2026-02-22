import { ArrowDown, PlayCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const VIDEOS = [
    '/assets/videos/vedio1.mp4',
    '/assets/videos/vedio2.mp4',
    '/assets/videos/vedio3.mp4',
]

export default function Hero() {
    const [currentVideo, setCurrentVideo] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % VIDEOS.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const scrollToNext = () => {
        document.querySelector('#impact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
        >
            {/* Video Background Slider */}
            <div className="absolute inset-0 z-0">
                {VIDEOS.map((src, index) => (
                    <video
                        key={src}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100' : 'opacity-0'
                            }`}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                ))}

                {/* Fallback & Overlay to ensure readability while videos load */}
                <div className="absolute inset-0 z-10 bg-navy-900/40" />
            </div>

            {/* Dark overlay - gradient */}
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
                <h1
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6"
                    style={{ animationDelay: '0.1s' }}
                >
                    Building <span className="text-orange-400 italic">Malawi&apos;s</span>
                    <br />
                    Future.
                </h1>

                <p
                    className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed"
                    style={{ animationDelay: '0.2s' }}
                >
                    Two decades of excellence in civil engineering and landmark construction projects across the nation.
                </p>


                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onClick={scrollToContact} className="btn-primary text-base">
                        Start Your Project
                    </button>
                    <button
                        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-outline text-base"
                    >
                        <PlayCircle className="w-5 h-5" />
                        View Our Work
                    </button>
                </div>

                {/* Stats bar */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8 max-w-3xl mx-auto">
                    {[
                        { value: '1,500+', label: 'KM of Roads' },
                        { value: '2,000+', label: 'Home Units' },
                        { value: '20+', label: 'Years Exp.' },
                        { value: '500+', label: 'Projects' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="font-display text-2xl md:text-3xl font-bold text-orange-400">{stat.value}</p>
                            <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={scrollToNext}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-orange-400 transition-colors animate-bounce"
                aria-label="Scroll down"
            >
                <ArrowDown className="w-6 h-6" />
            </button>
        </section>
    )
}
