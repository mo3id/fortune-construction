import { Image, PageHero, Button } from '@fortune/shared-ui'
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
    startDate?: string; endDate?: string;
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

    const getDurationDisplay = () => {
        if (project?.startDate && project?.endDate) {
            const start = new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const end = new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            return `${start} - ${end}`;
        }
        return project?.duration;
    }

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
            <section className="relative -mt-20 z-20 mx-6 md:mx-auto max-w-5xl">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/40 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-50 dark:divide-slate-800">
                        {[
                            { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: project.location },
                            { icon: <Calendar className="w-5 h-5" />, label: 'Timeline', value: getDurationDisplay() },
                            { icon: <DollarSign className="w-5 h-5" />, label: 'Investment', value: project.budget },
                            { icon: <CheckCircle2 className="w-5 h-5" />, label: 'Delivery', value: project.completionDate },
                        ].map((stat, idx) => (
                            <div key={idx} className="p-8 flex flex-col items-center text-center group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
                                <div className="text-teal-500 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{stat.icon}</div>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-black mb-2">{stat.label}</span>
                                <span className="font-bold text-slate-900 dark:text-white text-base leading-tight">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Body */}
            <section className="relative section-padding bg-white dark:bg-slate-950 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
                
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-16">
                        <Link to="/projects" className="group inline-flex items-center text-slate-400 hover:text-teal-600 font-bold uppercase tracking-widest text-[10px] transition-all">
                            <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center mr-4 group-hover:border-teal-500 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-all">
                                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                            </div>
                            Return to portfolio
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8 flex items-center">
                                <span className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mr-5 shadow-sm">
                                    <Construction className="w-6 h-6" /> 
                                </span>
                                Strategic Challenge
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light text-lg">
                                {project.challenge}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-slate-900 dark:bg-black p-10 md:p-12 rounded-2xl text-white shadow-2xl relative overflow-hidden group dark"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl font-display font-bold mb-8 flex items-center text-white">
                                <span className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mr-5 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6" /> 
                                </span>
                                Engineering Solution
                            </h3>
                            <p className="text-slate-200 leading-relaxed font-light text-lg">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-32">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-100 dark:to-slate-800" />
                            <div className="text-center">
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-teal-600 mb-2 block">Visual Portfolio</span>
                                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Project Gallery</h3>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-100 dark:to-slate-800" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.galleryImages.map((img, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative overflow-hidden rounded-2xl group shadow-lg cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    onClick={() => {
                                        setPhotoIndex(idx)
                                        setIsOpen(true)
                                    }}
                                >
                                    <div className={`aspect-[4/3] ${idx === 0 ? 'md:aspect-auto md:h-full min-h-[500px]' : ''}`}>
                                        <Image 
                                            src={img} 
                                            alt={`${project.title} gallery ${idx + 1}`} 
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">View High Resolution</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Result CTA */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group shadow-inner"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="inline-block w-12 h-1 bg-teal-500 rounded-full mb-10" />
                            <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 text-slate-900 dark:text-white tracking-tight">The Project Result</h3>
                            <p className="text-xl md:text-2xl leading-relaxed mb-12 text-slate-600 dark:text-slate-400 font-light italic serif">
                                "{project.result}"
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="shadow-2xl shadow-teal-500/20 px-12">
                                    Discuss Your Vision With Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
