import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, UploadCloud, FileText, X } from 'lucide-react'

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const formSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number is required'),
    position: z.string().min(1, 'Please select a position'),
    coverLetter: z.string().min(50, 'Cover letter should be at least 50 characters'),
})

type FormData = z.infer<typeof formSchema>

export default function ApplicationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        setFileError(null)

        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                setFileError('File size must be less than 5MB')
                return
            }
            if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
                setFileError('Only .pdf, .doc, and .docx files are allowed')
                return
            }
            setFile(selectedFile)
        }
    }

    const removeFile = () => {
        setFile(null)
        setFileError(null)
    }

    const onSubmit = async (data: FormData) => {
        if (!file) {
            setFileError('Please upload your CV/Resume')
            return
        }

        setIsSubmitting(true)
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        
        console.log('Form data:', data)
        console.log('File:', file)
        
        setIsSubmitting(false)
        setIsSuccess(true)
        reset()
        setFile(null)

        // Reset success state after 5 seconds
        setTimeout(() => {
            setIsSuccess(false)
        }, 5000)
    }

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-teal-50 border border-teal-200 rounded-sm p-12 text-center"
            >
                <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-6" />
                <h3 className="text-3xl font-display font-bold text-navy-800 mb-4">Application Submitted!</h3>
                <p className="text-navy-600 text-lg">
                    Thank you for your interest in joining Fortune Construction. Our HR team will review your application and get back to you shortly.
                </p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-navy-50">
            <h3 className="text-2xl font-bold text-navy-800 mb-8 border-b border-navy-100 pb-4">Submit Your Application</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">Full Name *</label>
                    <input
                        {...register('fullName')}
                        className="w-full px-4 py-3 bg-navy-50 border border-navy-100 rounded-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="John Doe"
                    />
                    {errors.fullName && <span className="text-destructive text-sm mt-1">{errors.fullName.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">Email Address *</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 bg-navy-50 border border-navy-100 rounded-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-destructive text-sm mt-1">{errors.email.message}</span>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">Phone Number *</label>
                    <input
                        {...register('phone')}
                        className="w-full px-4 py-3 bg-navy-50 border border-navy-100 rounded-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="+265 99 123 4567"
                    />
                    {errors.phone && <span className="text-destructive text-sm mt-1">{errors.phone.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">Position Applying For *</label>
                    <select
                        {...register('position')}
                        className="w-full px-4 py-3 bg-navy-50 border border-navy-100 rounded-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    >
                        <option value="">Select a position...</option>
                        <option value="civil-engineer">Senior Civil Engineer</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="safety-officer">HSE Officer</option>
                        <option value="quantity-surveyor">Quantity Surveyor</option>
                        <option value="general-application">General Application</option>
                    </select>
                    {errors.position && <span className="text-destructive text-sm mt-1">{errors.position.message}</span>}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-bold text-navy-700 mb-2">Cover Letter *</label>
                <textarea
                    {...register('coverLetter')}
                    rows={5}
                    className="w-full px-4 py-3 bg-navy-50 border border-navy-100 rounded-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                    placeholder="Tell us why you want to join Fortune Construction..."
                />
                {errors.coverLetter && <span className="text-destructive text-sm mt-1">{errors.coverLetter.message}</span>}
            </div>

            {/* CV Upload */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-navy-700 mb-2">Resume / CV *</label>
                
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative border-2 border-dashed border-navy-200 rounded-sm bg-navy-50 hover:bg-navy-100 transition-colors"
                        >
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="p-8 text-center pointer-events-none">
                                <UploadCloud className="w-10 h-10 text-teal-500 mx-auto mb-4" />
                                <p className="font-bold text-navy-800 mb-1">Click to upload or drag and drop</p>
                                <p className="text-sm text-navy-500">PDF, DOC, DOCX (Max 5MB)</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between p-4 border border-teal-200 bg-teal-50 rounded-sm"
                        >
                            <div className="flex items-center">
                                <FileText className="w-8 h-8 text-teal-500 mr-3" />
                                <div>
                                    <p className="font-bold text-navy-800 text-sm">{file.name}</p>
                                    <p className="text-xs text-navy-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="p-2 text-navy-400 hover:text-destructive hover:bg-white rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                {fileError && <span className="text-destructive text-sm mt-2 block">{fileError}</span>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
        </form>
    )
}
