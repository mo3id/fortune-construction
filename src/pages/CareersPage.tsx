import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Container } from '@/components/ui/Container'
import { Briefcase, Building2, HardHat, TrendingUp, MapPin, Clock } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHero } from '@/components/ui/PageHero'
import ApplicationForm from '@/components/ApplicationForm'
import { apiFetch } from '@/lib/apiClient'

interface ApiJob {
    _id: string; title: string; location: string; type: string;
    description: string; requirements: string[]; isActive: boolean;
}

const BENEFITS = [
    { icon: <TrendingUp />, title: 'Career Growth', desc: 'Clear progression paths and continuous professional development programs.' },
    { icon: <Building2 />, title: 'Major Projects', desc: 'Work on landmark infrastructure that shapes the future of Malawi.' },
    { icon: <Briefcase />, title: 'Competitive Package', desc: 'Industry-leading salary, health insurance, and performance bonuses.' },
    { icon: <HardHat />, title: 'Safety First Culture', desc: 'A work environment where your health and wellbeing are the top priority.' },
]

const FALLBACK_JOBS = [
    { _id: 'civil-engineer', title: 'Senior Civil Engineer', location: 'Lilongwe Head Office', type: 'Full-time', description: 'Lead complex infrastructure projects from design to execution.', requirements: ['BSc in Civil Engineering', '10+ years experience', 'Registered with Malawi Board of Engineers', 'Strong proficiency in AutoCAD and Civil 3D'], isActive: true },
    { _id: 'project-manager', title: 'Construction Project Manager', location: 'Various Sites, Malawi', type: 'Full-time', description: 'Oversee large-scale commercial and infrastructure projects.', requirements: ['Degree in Construction Management or equivalent', 'PMP Certification preferred', 'Experience managing budgets >$10M', 'Excellent leadership skills'], isActive: true },
    { _id: 'safety-officer', title: 'HSE Officer', location: 'Blantyre', type: 'Full-time', description: 'Ensure strict compliance with health, safety, and environmental standards on site.', requirements: ['Diploma in Occupational Health & Safety', 'NEBOSH Certification', '5+ years site experience', 'Strong incident investigation skills'], isActive: true },
    { _id: 'quantity-surveyor', title: 'Quantity Surveyor', location: 'Mzuzu', type: 'Full-time', description: 'Manage project costs, contracts, and procurement processes.', requirements: ['BSc in Quantity Surveying', '7+ years commercial experience', 'Expert in cost estimation software', 'Strong negotiation skills'], isActive: true },
]

export default function CareersPage() {
    const { data: apiJobs } = useQuery<ApiJob[]>({
        queryKey: ['jobs'],
        queryFn: () => apiFetch<ApiJob[]>('/jobs'),
        staleTime: 60_000,
    })

    const jobs = (apiJobs?.length ? apiJobs : FALLBACK_JOBS).filter(j => j.isActive)
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageHero 
                title={<>Build Your Future with <span className="text-teal-500">Fortune</span></>}
                description="Join a team of driven professionals dedicated to engineering excellence. We don't just build infrastructure; we build careers."
                imageSrc="https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Engineers working together"
            />

            {/* Benefits */}
            <section className="section-padding bg-navy-50">
                <Container>
                    <div className="text-center mb-16">
                        <span className="section-subtitle">Why Join Us</span>
                        <h2 className="section-title">More Than Just a Job</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {BENEFITS.map((benefit, i) => (
                            <motion.div 
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-white p-8 border border-navy-100 rounded-sm card-hover flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-navy-900 rounded-sm flex items-center justify-center text-teal-500 mb-6 shadow-md shadow-navy-900/10">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold text-navy-800 mb-3">{benefit.title}</h3>
                                <p className="text-navy-600 font-light leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Jobs & Form Layout */}
            <section className="section-padding bg-navy-50 relative">
                <div className="absolute inset-0 bg-navy-900 h-[400px]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        
                        {/* Job Listings Column */}
                        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-sm shadow-xl border border-navy-100">
                            <div className="mb-10 border-b border-navy-50 pb-8">
                                <h2 className="text-3xl font-display font-bold text-navy-800 mb-3">Open Positions</h2>
                                <p className="text-navy-600 font-light text-lg">Find the role that matches your expertise and help us build the future.</p>
                            </div>
                            
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {jobs.map((job: ApiJob) => (
                                    <AccordionItem key={job._id} value={job._id} className="border border-navy-100 rounded-sm overflow-hidden data-[state=open]:border-teal-500 data-[state=open]:shadow-md transition-all duration-300 bg-white">
                                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-navy-50/50 group">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left pr-4">
                                                <h3 className="text-xl font-bold text-navy-800 group-hover:text-teal-600 transition-colors">{job.title}</h3>
                                                <div className="flex items-center gap-6 mt-3 md:mt-0 text-sm font-medium text-navy-500 bg-navy-50 px-4 py-2 rounded-sm">
                                                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-teal-500" /> {job.location}</span>
                                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-teal-500" /> {job.type}</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-8 pt-4 bg-navy-50/30">
                                            <div className="pt-6 border-t border-navy-100">
                                                <p className="text-navy-700 mb-8 leading-relaxed font-light text-lg">{job.description}</p>
                                                <h4 className="font-bold text-navy-800 mb-4 text-sm uppercase tracking-widest flex items-center">
                                                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                                                    Requirements
                                                </h4>
                                                <ul className="grid md:grid-cols-2 gap-4 text-navy-600 font-light">
                                                    {job.requirements.map((req: string, idx: number) => (
                                                        <li key={idx} className="flex items-start bg-white p-3 rounded-sm border border-navy-50">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0" />
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Application Form Column */}
                        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <ApplicationForm />
                            </div>
                        </div>

                    </div>
                </Container>
            </section>
        </div>
    )
}
