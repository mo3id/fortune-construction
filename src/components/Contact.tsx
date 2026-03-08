import { ContactInfo } from './contact/ContactInfo'
import { ContactForm } from './contact/ContactForm'
import { SectionHeader } from './ui/SectionHeader'
import { Container } from './ui/Container'

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-gray-50">
            <Container>
                <SectionHeader
                    subtitle="Get in Touch"
                    title="Let's Build Something Great Together"
                    description="Whether you have a project in mind or want to learn more about our capabilities, our team is ready to help."
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <ContactInfo />
                    <div className="lg:col-span-3 reveal reveal-delay-2">
                        <div className="bg-white rounded-sm border border-gray-100 p-8 md:p-10 shadow-sm">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
