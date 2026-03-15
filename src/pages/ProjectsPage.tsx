import { Image, PageHero } from '@fortune/shared-ui'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { projectsData } from '@/data/projects'

interface ApiProject {
    _id: string; title: string; category: string; location: string; coverImage: string;
}

export default function ProjectsPage() {
    const { data: apiProjects, isLoading } = useQuery<ApiProject[]>({
        queryKey: ['projects'],
        queryFn: () => apiFetch<ApiProject[]>('/projects'),
        staleTime: 60_000,
    })

    const projects = apiProjects?.length
        ? apiProjects
        : projectsData.map(p => ({ _id: p.id, title: p.title, category: p.category, location: p.location, coverImage: p.coverImage || '' }))

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title="Our Portfolio"
                description="Explore our track record of successful infrastructure and construction projects across Malawi."
                imageSrc="https://images.unsplash.com/photo-1545558014-8ab6aa17e307?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Major construction project view"
            />

            {/* Projects Grid */}
            <section className="relative section-padding overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 -z-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
                
                <div className="max-w-7xl mx-auto px-6">
                    {isLoading && (
                        <div className="flex justify-center py-32">
                            <div className="w-12 h-12 border-2 border-teal-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-teal-500/20" />
                        </div>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <motion.div 
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg shadow-slate-200 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image 
                                        src={project.coverImage} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-5 left-5 bg-teal-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                                        {project.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative">
                                    <div className="absolute top-0 left-8 w-12 h-1 bg-teal-500 -translate-y-full" />
                                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-10 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                                        {project.location}
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                        <Link 
                                            to={`/projects/${project._id}`}
                                            className="inline-flex items-center text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest text-[10px] group/link"
                                        >
                                            View Case Study 
                                            <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                        <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
