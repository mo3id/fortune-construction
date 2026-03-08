import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const CONTACT_INFO = [
    {
        icon: <Phone className="w-5 h-5" />,
        label: 'Phone',
        value: '+265 1 234 5678',
        href: 'tel:+26512345678',
    },
    {
        icon: <Mail className="w-5 h-5" />,
        label: 'Email',
        value: 'info@fortuneconstruction.mw',
        href: 'mailto:info@fortuneconstruction.mw',
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: 'Address',
        value: 'Area 4, Lilongwe, Malawi',
        href: 'https://maps.google.com',
    },
    {
        icon: <Clock className="w-5 h-5" />,
        label: 'Working Hours',
        value: 'Mon – Fri: 7:30am – 5:00pm',
        href: null,
    },
]

export function ContactInfo() {
    return (
        <div className="lg:col-span-2 space-y-6 reveal">
            <div className="bg-navy-800 rounded-sm p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Fortune Construction</h3>
                <p className="text-white/50 text-sm mb-8">Malawi&apos;s premier construction company since 2004.</p>

                <div className="space-y-6">
                    {CONTACT_INFO.map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                            <div className="text-orange-400 mt-0.5 flex-shrink-0">{item.icon}</div>
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-white text-sm hover:text-orange-400 transition-colors">
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

            <div className="bg-orange-500 rounded-sm p-6 text-white text-center md:text-left">
                <p className="font-display text-lg font-bold mb-2">Need a Quote Fast?</p>
                <p className="text-white/80 text-sm mb-4">Call us directly for urgent project enquiries.</p>
                <a href="tel:+26512345678" className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors">
                    <Phone className="w-4 h-4" /> Call Now
                </a>
            </div>
        </div>
    )
}
