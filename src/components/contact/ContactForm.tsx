import { Send, Loader2 } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { SuccessMessage } from './SuccessMessage'
import { API } from '@/lib/apiClient'
import { useFormSchema, contactSchema, ContactFormData, FormInput, Form, Button } from '@fortune/shared-ui'
import { motion } from 'framer-motion'

export function ContactForm() {
    const { isFormSubmitted, isFormSubmitting, setFormSubmitting, setFormSubmitted } = useUIStore()

    const form = useFormSchema({
        schema: contactSchema,
        defaultValues: { name: '', email: '', phone: '', message: '' }
    })

    const onSubmit = async (data: ContactFormData) => {
        setFormSubmitting(true)
        try {
            const res = await fetch(`${API}/messages/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Failed to send')
            setFormSubmitted(true)
            form.reset()
        } catch {
            console.error('Contact form submission failed')
        } finally {
            setFormSubmitting(false)
        }
    }

    if (isFormSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <SuccessMessage />
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-navy-800 mb-1">Project Enquiry</h3>
                <p className="text-gray-400 text-sm">All fields are required. We&apos;ll respond within 24 hours.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormInput name="name" label="Full Name" placeholder="Your full name" disabled={isFormSubmitting} />
                        <FormInput name="email" label="Email Address" type="email" placeholder="your@email.com" disabled={isFormSubmitting} />
                    </div>

                    <FormInput name="phone" label="Phone Number" type="tel" placeholder="+265 999 123 456" disabled={isFormSubmitting} />
                    
                    <FormInput 
                        name="message" 
                        label="Project Details" 
                        type="textarea" 
                        rows={5}
                        placeholder="Describe your project — type, location, scope, timeline, and any specific requirements..." 
                        disabled={isFormSubmitting}
                    />

                    <Button
                        type="submit"
                        disabled={isFormSubmitting}
                        className="w-full h-11 rounded-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300"
                    >
                        {isFormSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Enquiry
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </motion.div>
    )
}
