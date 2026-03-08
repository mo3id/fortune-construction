import { TestimonialCardProps } from '@/types'

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="reveal bg-gray-50 rounded-sm p-8 border-l-4 border-teal-500">
            <div className="text-teal-400 text-5xl font-serif leading-none mb-4">&ldquo;</div>
            <p className="text-gray-600 italic text-base leading-relaxed mb-6">{testimonial.quote}</p>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-navy-600 rounded-sm flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.initials}
                </div>
                <div>
                    <p className="font-semibold text-navy-800 text-sm">{testimonial.author}</p>
                    <p className="text-gray-400 text-xs">{testimonial.org}</p>
                </div>
            </div>
        </div>
    )
}
