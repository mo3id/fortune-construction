import { MapPin, Phone, Mail } from 'lucide-react'
import { SITE } from '@/lib/constants'

export function FooterMap() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Map Embed */}
            <div className="h-64 lg:h-80 bg-navy-800 relative overflow-hidden">
                <iframe
                    title={`${SITE.name} Location`}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124596.50703698217!2d33.72137755312498!3d-13.985649200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d5b6a9fa6c67%3A0x13d7c85fb2c8a8e0!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(80%) invert(90%) contrast(90%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 pointer-events-none border-b-4 border-orange-500" />
            </div>

            {/* Contact quick info */}
            <div className="bg-navy-800 p-10 flex flex-col justify-center">
                <h3 className="font-display text-2xl font-bold mb-6">Find Us in Lilongwe</h3>
                <div className="space-y-4">
                    <a href={SITE.mapsUrl} className="flex items-start gap-3 text-white/60 hover:text-orange-400 transition-colors">
                        <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{SITE.address}</span>
                    </a>
                    <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/60 hover:text-orange-400 transition-colors">
                        <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className="text-sm">{SITE.phone}</span>
                    </a>
                    <a href={SITE.emailHref} className="flex items-center gap-3 text-white/60 hover:text-orange-400 transition-colors">
                        <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className="text-sm">{SITE.email}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
