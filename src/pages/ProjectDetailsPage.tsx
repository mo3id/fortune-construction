import { Image, PageHero } from '@fortune/shared-ui'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, DollarSign, MapPin, Construction, CheckCircle2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { useState } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

interface ApiProjectFull {
    _id: string; title: string; category: string; location: string; duration: string;
    budget: string; challenge: string; solution: string; result: string;
    coverImage: string; galleryImages: string[]; completionDate: string;
}

export default function ProjectDetailsPage() {
    const { id } = useParams<{ id: string }>()
    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    const { data: project, isLoading, isError } = useQuery<ApiProjectFull>({
        queryKey: ['project', id],
        queryFn: () => apiFetch<ApiProjectFull>(`/projects/${id}`),
        enabled: !!id,
    })

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center bg-navy-50">
            <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (isError || !project) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-navy-50">
                <h1 className="text-3xl font-display font-bold text-navy-800 mb-4">Project Not Found</h1>
                <Link to="/projects" className="btn-primary">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title={project.title}
                description={`${project.category} Project in ${project.location}`}
                imageSrc={project.coverImage}
                imageAlt={project.title}
            />

            {/* Quick Stats */}
            <section className="bg-white border border-navy-100 relative -mt-16 z-20 mx-6 md:mx-auto max-w-5xl rounded-sm shadow-2xl shadow-navy-900/10">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-navy-100">
                    {[
                        { icon: <MapPin />, label: 'Location', value: project.location },
                        { icon: <Calendar />, label: 'Duration', value: project.duration },
                        { icon: <DollarSign />, label: 'Budget', value: project.budget },
                        { icon: <CheckCircle2 />, label: 'Completed', value: project.completionDate },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-8 flex flex-col items-center text-center group hover:bg-navy-50/50 transition-colors">
                            <div className="text-teal-500 mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                            <span className="text-xs text-navy-400 uppercase tracking-widest font-bold mb-2">{stat.label}</span>
                            <span className="font-semibold text-navy-800 text-lg">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content Body */}
            <section className="section-padding bg-background">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <Link to="/projects" className="inline-flex items-center text-teal-600 hover:text-navy-900 font-medium mb-12 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all projects
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10 md:p-12 rounded-sm border border-navy-100 shadow-sm"
                        >
                            <h3 className="text-2xl font-display font-bold text-navy-800 mb-6 flex items-center">
                                <span className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mr-4">
                                    <Construction className="w-5 h-5" /> 
                                </span>
                                The Challenge
                            </h3>
                            <p className="text-navy-600 leading-relaxed font-light text-lg">
                                {project.challenge}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-navy-900 p-10 md:p-12 rounded-sm text-white shadow-xl"
                        >
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center">
                                <span className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mr-4">
                                    <CheckCircle2 className="w-5 h-5" /> 
                                </span>
                                The Solution
                            </h3>
                            <p className="text-teal-50/80 leading-relaxed font-light text-lg">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <span className="section-subtitle">Visuals</span>
                            <h3 className="section-title">Project Gallery</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.galleryImages.map((img, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative overflow-hidden rounded-sm group shadow-sm cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    onClick={() => {
                                        setPhotoIndex(idx)
                                        setIsOpen(true)
                                    }}
                                >
                                    <div className={`aspect-square ${idx === 0 ? 'md:aspect-auto md:h-full min-h-[400px]' : ''}`}>
                                        <Image 
                                            src={img} 
                                            alt={`${project.title} gallery ${idx + 1}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {isOpen && (
                        <Lightbox
                            mainSrc={project.galleryImages[photoIndex]}
                            nextSrc={project.galleryImages[(photoIndex + 1) % project.galleryImages.length]}
                            prevSrc={project.galleryImages[(photoIndex + project.galleryImages.length - 1) % project.galleryImages.length]}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() => setPhotoIndex((photoIndex + project.galleryImages.length - 1) % project.galleryImages.length)}
                            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % project.galleryImages.length)}
                            imageTitle={`${project.title} - Image ${photoIndex + 1} of ${project.galleryImages.length}`}
                        />
                    )}

                    {/* Result CTA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-navy-50 border border-teal-500/20 p-12 md:p-16 rounded-sm text-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h3 className="text-3xl font-display font-bold mb-6 text-navy-800">The Result</h3>
                            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-10 text-navy-600 font-light italic">
                                "{project.result}"
                            </p>
                            <Link to="/contact" className="btn-primary">
                                Discuss Your Next Project
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
