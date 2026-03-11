import { CheckCircle2 } from 'lucide-react'
import { Button } from '@fortune/shared-ui'
import { useUIStore } from '@/store/useUIStore'

export function SuccessMessage() {
    const { resetForm } = useUIStore()

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-800 mb-3">Message Sent!</h3>
            <p className="text-gray-500 text-base max-w-sm leading-relaxed mb-8">
                Thank you for reaching out. Our team will review your enquiry and respond within 24 hours.
            </p>
            <Button
                onClick={resetForm}
                variant="outline"
                className="rounded-sm border-teal-500 text-teal-500 hover:bg-teal-50 font-semibold"
            >
                Send Another Message
            </Button>
        </div>
    )
}
