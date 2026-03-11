import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, UploadCloud, FileText, X, Briefcase, Loader2 } from 'lucide-react'
import { API } from '@/lib/apiClient'
import { 
  useFormSchema, 
  applicationSchema, 
  ApplicationFormData, 
  FormInput, 
  Form, 
  Button 
} from '@fortune/shared-ui'

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const POSITIONS = [
    { value: 'civil-engineer', label: 'Senior Civil Engineer' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'safety-officer', label: 'HSE Officer' },
    { value: 'quantity-surveyor', label: 'Quantity Surveyor' },
    { value: 'general-application', label: 'General Application' },
]

export default function ApplicationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)

    const form = useFormSchema({
        schema: applicationSchema,
        defaultValues: { fullName: '', email: '', phone: '', position: '', coverLetter: '' }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        setFileError(null)

        if (!selectedFile) return

        if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
            setFileError('Please upload a PDF or Word document')
            setFile(null)
            return
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setFileError('File size must be less than 5MB')
            setFile(null)
            return
        }

        setFile(selectedFile)
    }

    const removeFile = () => {
        setFile(null)
        setFileError(null)
    }

    const onSubmit = async (data: ApplicationFormData) => {
        if (!file) {
            setFileError('Please upload your CV/Resume')
            return
        }

        setIsSubmitting(true)
        try {
            const fd = new FormData()
            fd.append('fullName', data.fullName)
            fd.append('email', data.email)
            fd.append('phone', data.phone)
            fd.append('position', data.position)
            fd.append('coverLetter', data.coverLetter)
            fd.append('cvFile', file)

            const res = await fetch(`${API}/applications/submit`, { method: 'POST', body: fd })
            if (!res.ok) throw new Error('Submission failed')
            
            setIsSuccess(true)
            form.reset()
            setFile(null)
            setTimeout(() => setIsSuccess(false), 5000)
        } catch {
            setFileError('Submission failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-teal-100 flex flex-col items-center justify-center text-center h-full min-h-[500px]"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                    <CheckCircle2 className="w-20 h-20 text-teal-500 mb-6" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold text-navy-800 mb-4">Application Received!</h3>
                <p className="text-navy-600 mb-8 max-w-md">
                    Thank you for your interest in joining Fortune Construction. Our HR team will review your application and get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Submit Another Application
                </Button>
            </motion.div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-navy-50">
                <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-navy-800 mb-2">Apply Now</h3>
                    <p className="text-navy-600 text-sm">Take the next step in your career with Fortune Construction.</p>
                </div>

                <div className="space-y-5 mb-6">
                    <FormInput name="fullName" label="Full Name *" placeholder="John Doe" disabled={isSubmitting} />
                    
                    <div className="grid md:grid-cols-2 gap-5">
                        <FormInput name="email" label="Email Address *" type="email" placeholder="john@example.com" disabled={isSubmitting} />
                        <FormInput name="phone" label="Phone Number *" type="tel" placeholder="+265 999 123 456" disabled={isSubmitting} />
                    </div>

                    <FormInput 
                        name="position" 
                        label="Position *" 
                        type="select" 
                        options={POSITIONS} 
                        disabled={isSubmitting} 
                    />

                    <FormInput 
                        name="coverLetter" 
                        label="Cover Letter *" 
                        type="textarea" 
                        rows={5} 
                        placeholder="Tell us why you want to join Fortune Construction..." 
                        disabled={isSubmitting} 
                    />
                </div>

                {/* CV Upload */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Resume / CV *</label>
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative border-2 border-dashed border-navy-200 rounded-md bg-navy-50 hover:bg-navy-100 transition-colors"
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
                                className="flex items-center justify-between p-4 border border-teal-200 bg-teal-50 rounded-md"
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
                    {fileError && <span className="text-destructive text-sm mt-2 block font-medium flex items-center gap-1.5"><X className="w-3 h-3" /> {fileError}</span>}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting Application...
                        </>
                    ) : 'Submit Application'}
                </Button>
            </form>
        </Form>
    )
}
