import { MapPin, Phone, Mail } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'

interface SiteSettings {
    companyName: string; phone: string; email: string; address: string;
}

export function FooterMap() {
    const { data: settings } = useQuery<SiteSettings>({
        queryKey: ['settings'],
        queryFn: () => apiFetch<SiteSettings>('/settings'),
        staleTime: 60_000,
    })

    const address = settings?.address || SITE.address
    const phone = settings?.phone || SITE.phone
    const email = settings?.email || SITE.email
    const companyName = settings?.companyName || SITE.name

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-slate-900 dark:bg-black border-b border-white/5">
            {/* Map Embed */}
            <div className="h-80 lg:h-auto relative overflow-hidden group">
                <iframe
                    title={`${companyName} Location`}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124596.50703698217!2d33.72137755312498!3d-13.985649200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d5b6a9fa6c67%3A0x13d7c85fb2c8a8e0!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%) opacity(0.2)' }}
                    className="group-hover:opacity-40 transition-opacity duration-1000"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500/30" />
            </div>

            {/* Contact quick info */}
            <div className="p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-teal-500/20 to-transparent" />
                
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-teal-500 mb-4 block">Regional Presence</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">Visit Our Headquarters</h3>
                
                <div className="space-y-8">
                    {[
                        { icon: <MapPin className="w-5 h-5" />, label: 'Physical Address', value: address, href: SITE.mapsUrl },
                        { icon: <Phone className="w-5 h-5" />, label: 'Direct Line', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
                        { icon: <Mail className="w-5 h-5" />, label: 'Support Email', value: email, href: `mailto:${email}` },
                    ].map((item, i) => (
                        <a 
                            key={i}
                            href={item.href || '#'} 
                            className="flex items-start gap-5 group/item max-w-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-500 group-hover/item:bg-teal-600 group-hover/item:text-white transition-all duration-500">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                                <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">{item.value}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
