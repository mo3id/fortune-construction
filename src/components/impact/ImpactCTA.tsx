import { Button } from '@/components/ui/Button'

export function ImpactCTA() {
    return (
        <div className="mt-16 bg-navy-800 rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Ready to build something remarkable?
                </p>
                <p className="text-white/60 text-base">Join hundreds of satisfied clients across Malawi.</p>
            </div>
            <Button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-8 rounded-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold whitespace-nowrap"
            >
                Discuss Your Project
            </Button>
        </div>
    )
}
