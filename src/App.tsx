import { Image } from '@/components/ui/Image';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, HardHat, Construction, MapPin } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Services from '@/components/Services'
import Partners from '@/components/Partners'
import { apiFetch } from '@/lib/apiClient'
import { projectsData } from '@/data/projects'

interface ApiProject { _id: string; title: string; category: string; location: string; coverImage: string }

function App() {
    const { data: apiProjects } = useQuery<ApiProject[]>({
        queryKey: ['projects'],
        queryFn: () => apiFetch<ApiProject[]>('/projects'),
        staleTime: 60_000,
    })

    const featuredProjects = apiProjects?.length
        ? apiProjects.slice(0, 3)
        : projectsData.slice(0, 3).map(p => ({ _id: p.id, title: p.title, category: p.category, location: p.location, coverImage: p.coverImage }))

    return (
        <div className="flex flex-col w-full bg-background">
            <Hero />
            <Impact />
            <Services />
            
            {/* About Teaser Section */}
            <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=2000&auto=format&fit=crop&fm=webp')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Building Malawi's Future, Together</h2>
                        <p className="text-teal-50/80 text-lg mb-8 leading-relaxed font-light">
                            For over two decades, Fortune Construction has been at the forefront of infrastructure development in Malawi. Our commitment to excellence, safety, and innovation has made us the trusted partner for major national projects.
                        </p>
                        <Link to="/about" className="btn-primary">
                            Discover Our Story <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full"
                    >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border-4 border-white/10 shadow-2xl">
                            <Image 
                                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop&fm=webp" 
                                alt="Construction Engineering" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Teaser Section */}
            <section className="section-padding bg-navy-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="section-subtitle">Our Work</span>
                            <h2 className="section-title">Featured Projects</h2>
                        </motion.div>
                        <Link to="/projects" className="hidden md:flex text-teal-600 hover:text-navy-900 font-bold items-center transition-colors uppercase tracking-wide text-sm">
                            View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {featuredProjects.map((project, i) => (
                            <motion.div 
                                key={project._id} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group bg-white rounded-sm overflow-hidden card-hover border border-navy-100 flex flex-col cursor-pointer shadow-sm"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image 
                                        src={project.coverImage} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt={project.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <Link to={`/projects/${project._id}`} className="text-white font-bold flex items-center tracking-wide uppercase text-sm">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-lg">
                                        {project.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-display font-bold text-navy-800 mb-3 group-hover:text-teal-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center text-navy-500 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                                        {project.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <Link to="/projects" className="md:hidden flex text-teal-600 font-bold items-center justify-center w-full mt-8 uppercase tracking-wide">
                        View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </section>

            <Partners />

            {/* Contact Call to Action */}
            <section className="py-24 px-6 relative bg-navy-900 overflow-hidden border-t-4 border-teal-500">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=2000&auto=format&fit=crop&fm=webp')] bg-cover bg-center" />
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <HardHat className="w-16 h-16 text-teal-500 mx-auto mb-8 drop-shadow-lg" />
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">Ready to start your next project?</h2>
                    <p className="text-teal-50/80 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Let's collaborate to build infrastructure that stands the test of time. Contact our engineering team today for a consultation.
                    </p>
                    <Link to="/contact" className="btn-primary text-lg px-12 py-5 shadow-xl shadow-teal-500/20">
                        Get in Touch <Construction className="w-6 h-6 ml-2" />
                    </Link>
                </motion.div>
            </section>
        </div>
    )
}

export default App
