import { HERO_STATS } from '@/lib/constants'

export function HeroStats() {
    return (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8 max-w-3xl mx-auto">
            {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                    <p className="font-display text-2xl md:text-3xl font-bold text-orange-400">{stat.value}</p>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}
