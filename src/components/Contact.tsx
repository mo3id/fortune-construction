import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validation'
import { useUIStore } from '@/store/useUIStore'

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

export default function Contact() {
    const { isFormSubmitted, isFormSubmitting, setFormSubmitting, setFormSubmitted } = useUIStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setFormSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1800))
        console.log('Form data:', data)
        setFormSubmitting(false)
        setFormSubmitted(true)
        reset()
    }

    return (
        <section id="contact" className="section-padding bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <p className="section-subtitle">Get in Touch</p>
                    <h2 className="section-title max-w-2xl mx-auto">
                        Let&apos;s Build Something Great Together
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        Whether you have a project in mind or want to learn more about our capabilities, our team is ready to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
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

                        <div className="bg-orange-500 rounded-sm p-6 text-white">
                            <p className="font-display text-lg font-bold mb-2">Need a Quote Fast?</p>
                            <p className="text-white/80 text-sm mb-4">Call us directly for urgent project enquiries.</p>
                            <a href="tel:+26512345678" className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors">
                                <Phone className="w-4 h-4" /> Call Now
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3 reveal reveal-delay-2">
                        <div className="bg-white rounded-sm border border-gray-100 p-8 md:p-10 shadow-sm">
                            {isFormSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-navy-700 mb-3">Message Sent!</h3>
                                    <p className="text-gray-500 text-base max-w-sm leading-relaxed mb-8">
                                        Thank you for reaching out. Our team will review your enquiry and respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => useUIStore.getState().resetForm()}
                                        className="btn-primary"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                                    <h3 className="font-display text-2xl font-bold text-navy-700 mb-2">Project Enquiry</h3>
                                    <p className="text-gray-400 text-sm mb-6">All fields are required. We&apos;ll respond within 24 hours.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Your full name"
                                                {...register('name')}
                                                className={`w-full px-4 py-3 border rounded-sm text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                {...register('email')}
                                                className={`w-full px-4 py-3 border rounded-sm text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="+265 999 123 456"
                                            {...register('phone')}
                                            className={`w-full px-4 py-3 border rounded-sm text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                                                }`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Project Details
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Describe your project — type, location, scope, timeline, and any specific requirements..."
                                            {...register('message')}
                                            className={`w-full px-4 py-3 border rounded-sm text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                                                }`}
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isFormSubmitting}
                                        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isFormSubmitting ? (
                                            <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Enquiry
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
