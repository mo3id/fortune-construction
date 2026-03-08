import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function Newsletter() {
    return (
        <div>
            <p className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Stay Updated</p>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
                Subscribe for project news and industry updates from our team.
            </p>
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border-white/10 rounded-sm text-white placeholder:text-white/20 focus-visible:border-teal-500 focus-visible:ring-teal-500/20 dark:bg-white/5 h-10"
                />
                <Button
                    className="bg-teal-500 hover:bg-teal-600 text-white rounded-sm font-semibold shrink-0"
                    size="sm"
                >
                    Go
                </Button>
            </div>
        </div>
    )
}
