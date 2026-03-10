import { Image } from '@/components/ui/Image';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { projectsData } from '@/data/projects'
import { PageHero } from '@/components/ui/PageHero'

export default function ProjectsPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title="Our Portfolio"
                description="Explore our track record of successful infrastructure and construction projects across Malawi."
                imageSrc="https://images.unsplash.com/photo-1545558014-8ab6aa17e307?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Major construction project view"
            />

            {/* Projects Grid */}
            <section className="section-padding bg-navy-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {projectsData.map((project, index) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white rounded-sm overflow-hidden card-hover border border-navy-100 flex flex-col"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image 
                                        src={project.coverImage} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-lg">
                                        {project.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-display font-bold text-navy-800 mb-3 group-hover:text-teal-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center text-navy-500 mb-8 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                                        {project.location}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-navy-50">
                                        <Link 
                                            to={`/projects/${project.id}`}
                                            className="inline-flex items-center text-teal-600 font-bold hover:text-navy-900 transition-colors uppercase tracking-wide text-sm"
                                        >
                                            View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
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
