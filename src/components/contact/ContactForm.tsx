import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validation'
import { useUIStore } from '@/store/useUIStore'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SuccessMessage } from './SuccessMessage'

export function ContactForm() {
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

    if (isFormSubmitted) {
        return <SuccessMessage />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <h3 className="font-display text-2xl font-bold text-navy-700 mb-2">Project Enquiry</h3>
            <p className="text-gray-400 text-sm mb-6">All fields are required. We&apos;ll respond within 24 hours.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    placeholder="Your full name"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                />
            </div>

            <Input
                label="Phone Number"
                type="tel"
                placeholder="+265 999 123 456"
                error={errors.phone?.message}
                {...register('phone')}
            />

            <Textarea
                label="Project Details"
                rows={5}
                placeholder="Describe your project — type, location, scope, timeline, and any specific requirements..."
                error={errors.message?.message}
                {...register('message')}
            />

            <Button
                type="submit"
                isLoading={isFormSubmitting}
                className="w-full justify-center"
            >
                <Send className="w-4 h-4" />
                Send Enquiry
            </Button>
        </form>
    )
}
