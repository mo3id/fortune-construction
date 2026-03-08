import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

const CONTACT_INFO = [
    {
        icon: <Phone className="w-5 h-5" />,
        label: 'Phone',
        value: SITE.phone,
        href: SITE.phoneHref,
    },
    {
        icon: <Mail className="w-5 h-5" />,
        label: 'Email',
        value: SITE.email,
        href: SITE.emailHref,
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: 'Address',
        value: SITE.address,
        href: SITE.mapsUrl,
    },
    {
        icon: <Clock className="w-5 h-5" />,
        label: 'Working Hours',
        value: SITE.workingHours,
        href: null,
    },
]

export function ContactInfo() {
    return (
        <div className="lg:col-span-2 space-y-6 reveal">
            <div className="bg-navy-800 rounded-sm p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">{SITE.name}</h3>
                <p className="text-white/50 text-sm mb-8">{SITE.tagline}</p>

                <div className="space-y-6">
                    {CONTACT_INFO.map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                            <div className="text-teal-400 mt-0.5 flex-shrink-0">{item.icon}</div>
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-white text-sm hover:text-teal-400 transition-colors">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-white text-sm">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-teal-500 rounded-sm p-6 text-white text-center md:text-left">
                <p className="font-display text-lg font-bold mb-2">Need a Quote Fast?</p>
                <p className="text-white/80 text-sm mb-4">Call us directly for urgent project enquiries.</p>
                <Button
                    asChild
                    className="bg-white text-teal-500 hover:bg-white/90 font-semibold rounded-sm h-10 px-5"
                >
                    <a href={SITE.phoneHref}>
                        <Phone className="w-4 h-4" />
                        Call Now
                    </a>
                </Button>
            </div>
        </div>
    )
}
