import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Loader2 } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validation'
import { useUIStore } from '@/store/useUIStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { SuccessMessage } from './SuccessMessage'

interface FormFieldProps {
    label: string
    error?: string
    children: React.ReactNode
    className?: string
}

function FormField({ label, error, children, className }: FormFieldProps) {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <Label className="text-navy-700 font-medium">{label}</Label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
                <h3 className="font-display text-2xl font-bold text-navy-700 mb-1">Project Enquiry</h3>
                <p className="text-gray-400 text-sm">All fields are required. We&apos;ll respond within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Full Name" error={errors.name?.message}>
                    <Input
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        className="h-10 rounded-sm border-gray-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                        {...register('name')}
                    />
                </FormField>
                <FormField label="Email Address" error={errors.email?.message}>
                    <Input
                        type="email"
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                        className="h-10 rounded-sm border-gray-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                        {...register('email')}
                    />
                </FormField>
            </div>

            <FormField label="Phone Number" error={errors.phone?.message}>
                <Input
                    type="tel"
                    placeholder="+265 999 123 456"
                    aria-invalid={!!errors.phone}
                    className="h-10 rounded-sm border-gray-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                    {...register('phone')}
                />
            </FormField>

            <FormField label="Project Details" error={errors.message?.message}>
                <Textarea
                    rows={5}
                    placeholder="Describe your project — type, location, scope, timeline, and any specific requirements..."
                    aria-invalid={!!errors.message}
                    className="rounded-sm border-gray-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 resize-none"
                    {...register('message')}
                />
            </FormField>

            <Button
                type="submit"
                disabled={isFormSubmitting}
                className="w-full h-11 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold gap-2"
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
    )
}
