import { Image } from '@/components/ui/Image';
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { PageHero } from '@/components/ui/PageHero'

export default function ContactPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title="Contact Us"
                description="Have a project in mind or need expert engineering consultation? Our team is ready to assist you."
                imageSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Construction Site Office"
            />

            {/* Main Content */}
            <section className="section-padding bg-navy-50">
                <Container>
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Contact Info Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5 space-y-10"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800 mb-6">Get In Touch</h2>
                                <p className="text-navy-600 font-light leading-relaxed mb-8 text-lg">
                                    Fortune Construction has been the trusted partner for major infrastructure projects across Malawi for over two decades. Whether you're planning a commercial development, a vital infrastructure upgrade, or need specialized civil engineering, we're here to deliver excellence.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-sm border border-navy-100 flex items-start group hover:border-teal-500 transition-colors shadow-sm">
                                    <div className="w-12 h-12 bg-teal-50 rounded-sm flex items-center justify-center text-teal-600 mr-5 flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-800 mb-1 text-lg">Head Office</h4>
                                        <p className="text-navy-600 font-light leading-relaxed">Plot 123, Area 4<br />PO Box 30XXX<br />Lilongwe, Malawi</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-sm border border-navy-100 flex items-start group hover:border-teal-500 transition-colors shadow-sm">
                                    <div className="w-12 h-12 bg-teal-50 rounded-sm flex items-center justify-center text-teal-600 mr-5 flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-800 mb-1 text-lg">Phone</h4>
                                        <p className="text-navy-600 font-light leading-relaxed">+265 1 75X XXX<br />+265 99 XXX XXXX</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-sm border border-navy-100 flex items-start group hover:border-teal-500 transition-colors shadow-sm">
                                    <div className="w-12 h-12 bg-teal-50 rounded-sm flex items-center justify-center text-teal-600 mr-5 flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-800 mb-1 text-lg">Email</h4>
                                        <p className="text-navy-600 font-light leading-relaxed">info@fortuneconstruction.mw<br />projects@fortuneconstruction.mw</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-sm border border-navy-100 flex items-start group hover:border-teal-500 transition-colors shadow-sm">
                                    <div className="w-12 h-12 bg-teal-50 rounded-sm flex items-center justify-center text-teal-600 mr-5 flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-800 mb-1 text-lg">Business Hours</h4>
                                        <p className="text-navy-600 font-light leading-relaxed">Monday - Friday: 08:00 AM - 17:00 PM<br />Saturday: 08:00 AM - 12:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-7 bg-white p-8 md:p-12 rounded-sm shadow-2xl border-t-4 border-teal-500"
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] bg-navy-900 relative group overflow-hidden border-t border-navy-800">
                <Image 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop&fm=webp" 
                    alt="Map view" 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white px-8 py-4 rounded-sm font-bold text-navy-800 shadow-2xl flex items-center text-lg border border-navy-100">
                        <MapPin className="text-teal-500 mr-3 w-6 h-6" /> Lilongwe, Malawi
                    </div>
                </div>
            </section>
        </div>
    )
}
