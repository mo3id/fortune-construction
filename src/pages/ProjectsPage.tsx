import { useMemo, useState } from 'react'
import { Image, PageHero } from '@fortune/shared-ui'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, CalendarCheck, CheckCircle2, Clock3, Filter, MapPin, Route } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { fallbackProjects, normalizeProject, ProjectRecord, RawProject } from '@/lib/projectPresentation'

const CATEGORY_FILTERS = ['All', 'Roads', 'Bridges', 'Commercial', 'Residential', 'Industrial', 'Government']
const STATUS_FILTERS = ['All', 'Ongoing', 'Completed']

function StatTile({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
    return (
        <div className="border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                <Icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-display font-bold text-slate-950 dark:text-white">{value}</div>
            <div className="mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</div>
        </div>
    )
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-11 shrink-0 border px-5 text-[11px] font-black uppercase tracking-[0.16em] transition-all ${
                active
                    ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/10 dark:border-teal-400 dark:bg-teal-500 dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-400'
            }`}
        >
            {label}
        </button>
    )
}

function ProjectCard({ project, index }: { project: ProjectRecord; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
            className={`group grid overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30 ${
                index === 0 ? 'lg:col-span-2 lg:grid-cols-[1.1fr_0.9fr]' : ''
            }`}
        >
            <Link to={`/projects/${project._id}`} className="relative block min-h-[320px] overflow-hidden bg-slate-200">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full min-h-[320px] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className="bg-teal-500 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-xl">
                        {project.category}
                    </span>
                    <span className="bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-xl">
                        {project.status}
                    </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="mb-3 flex items-center text-sm font-semibold text-teal-100">
                        <MapPin className="mr-2 h-4 w-4" />
                        {project.location}
                    </div>
                    <h3 className="max-w-2xl text-3xl font-display font-bold leading-tight tracking-tight">
                        {project.title}
                    </h3>
                </div>
            </Link>

            <div className="flex min-h-[320px] flex-col p-7 md:p-8">
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-6 text-sm dark:border-slate-800">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Client</div>
                        <div className="mt-1 font-bold text-slate-900 dark:text-white">{project.clientName}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Value</div>
                        <div className="mt-1 font-bold text-slate-900 dark:text-white">{project.projectValue}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Year</div>
                        <div className="mt-1 font-bold text-slate-900 dark:text-white">{project.yearCompleted}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Duration</div>
                        <div className="mt-1 font-bold text-slate-900 dark:text-white">{project.duration}</div>
                    </div>
                </div>

                <p className="mt-6 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {project.overview}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="border border-slate-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                            {tech}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/projects/${project._id}`}
                    className="mt-auto inline-flex items-center pt-8 text-[11px] font-black uppercase tracking-[0.18em] text-teal-700 transition-colors hover:text-slate-950 dark:text-teal-300 dark:hover:text-white"
                >
                    View Case Study
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </motion.article>
    )
}

function MalawiMap({ projects, selectedId, onSelect }: { projects: ProjectRecord[]; selectedId?: string; onSelect: (id: string) => void }) {
    const selected = projects.find((project) => project._id === selectedId) || projects[0]
    const located = projects.filter((project) => project.coordinates)

    const pointFor = (project: ProjectRecord) => {
        const lat = project.coordinates?.lat ?? -13.5
        const lng = project.coordinates?.lng ?? 34
        const x = ((lng - 32.6) / (35.9 - 32.6)) * 100
        const y = ((-9.3 - lat) / (-9.3 + 17.2)) * 100
        return { x: Math.min(92, Math.max(8, x)), y: Math.min(92, Math.max(8, y)) }
    }

    return (
        <section className="relative overflow-hidden bg-slate-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[1fr_420px]">
                <div className="relative min-h-[560px] overflow-hidden p-6 md:p-10">
                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
                    <div className="relative z-10 mb-8 max-w-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-teal-300">Interactive Project Map</span>
                        <h2 className="mt-4 text-3xl font-display font-bold tracking-tight md:text-5xl">Project Footprint Across Malawi</h2>
                        <p className="mt-5 text-base leading-8 text-slate-300">
                            Browse projects geographically and open the matching case study from each location marker.
                        </p>
                    </div>

                    <div className="relative mx-auto h-[390px] max-w-[360px]">
                        <svg viewBox="0 0 220 390" className="h-full w-full drop-shadow-2xl" role="img" aria-label="Stylized map of Malawi">
                            <path
                                d="M119 7 C144 33 151 57 139 86 C129 111 151 141 139 169 C129 193 103 202 114 232 C123 258 151 276 144 305 C139 329 112 344 109 383 C93 356 75 333 79 303 C83 274 102 258 89 231 C75 202 89 181 98 160 C109 134 91 114 100 88 C108 63 100 35 119 7 Z"
                                fill="#0f766e"
                                stroke="#5eead4"
                                strokeWidth="2"
                            />
                            <path d="M116 38 C128 73 115 112 126 145 C137 180 103 207 119 245 C130 273 117 309 103 344" fill="none" stroke="#ccfbf1" strokeOpacity=".55" strokeWidth="3" />
                        </svg>

                        {located.map((project) => {
                            const point = pointFor(project)
                            const active = project._id === selected?._id
                            return (
                                <button
                                    type="button"
                                    key={project._id}
                                    onClick={() => onSelect(project._id)}
                                    className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white text-slate-950 shadow-xl transition-transform hover:scale-110"
                                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                    aria-label={`Select ${project.title}`}
                                >
                                    <span className={`h-3 w-3 rounded-full ${active ? 'bg-teal-500' : 'bg-slate-950'}`} />
                                </button>
                            )
                        })}
                    </div>
                </div>

                {selected && (
                    <aside className="border-t border-white/10 bg-white p-6 text-slate-950 dark:bg-slate-900 dark:text-white lg:border-l lg:border-t-0 lg:border-white/10">
                        <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-slate-200">
                            <Image src={selected.coverImage} alt={selected.title} className="h-full w-full object-cover" />
                            <span className="absolute left-4 top-4 bg-teal-500 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                                {selected.status}
                            </span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-700 dark:text-teal-300">{selected.category}</div>
                        <h3 className="mt-3 text-2xl font-display font-bold leading-tight">{selected.title}</h3>
                        <div className="mt-4 flex items-center text-sm font-semibold text-slate-500 dark:text-slate-300">
                            <MapPin className="mr-2 h-4 w-4 text-teal-600" />
                            {selected.location}
                        </div>
                        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{selected.overview}</p>
                        <Link to={`/projects/${selected._id}`} className="mt-8 inline-flex items-center text-[11px] font-black uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                            Open Case Study <ArrowRight className="ml-3 h-4 w-4" />
                        </Link>
                    </aside>
                )}
            </div>
        </section>
    )
}

export default function ProjectsPage() {
    const [category, setCategory] = useState('All')
    const [status, setStatus] = useState('All')
    const { data: apiProjects, isLoading } = useQuery<RawProject[]>({
        queryKey: ['projects'],
        queryFn: () => apiFetch<RawProject[]>('/projects'),
        staleTime: 60_000,
    })

    const projects = useMemo(
        () => (apiProjects?.length ? apiProjects.map(normalizeProject) : fallbackProjects),
        [apiProjects],
    )

    const filteredProjects = useMemo(
        () => projects.filter((project) =>
            (category === 'All' || project.category === category) &&
            (status === 'All' || project.status === status),
        ),
        [category, projects, status],
    )

    const [selectedMapProject, setSelectedMapProject] = useState<string | undefined>(projects[0]?._id)
    const completedCount = projects.filter((project) => project.status === 'Completed').length
    const ongoingCount = projects.filter((project) => project.status === 'Ongoing').length

    return (
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-slate-950">
            <PageHero
                title="Project Portfolio"
                description="Detailed infrastructure and construction case studies showing scale, delivery discipline, and measurable outcomes across Malawi."
                imageSrc="https://images.unsplash.com/photo-1545558014-8ab6aa17e307?q=80&w=2000&auto=format&fit=crop&fm=webp"
                imageAlt="Major construction project view"
            />

            <section className="relative -mt-16 z-20 px-6">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
                    <StatTile icon={CheckCircle2} value={`${completedCount}+`} label="Completed Work" />
                    <StatTile icon={Clock3} value={`${ongoingCount}`} label="Ongoing Projects" />
                    <StatTile icon={Route} value="Roads & Bridges" label="Core Delivery" />
                    <StatTile icon={Building2} value="Public & Private" label="Client Sectors" />
                </div>
            </section>

            <section className="relative px-6 py-20 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.26em] text-teal-700 dark:text-teal-300">
                                <Filter className="h-4 w-4" />
                                Browse by discipline
                            </div>
                            <h2 className="text-3xl font-display font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
                                Case studies built for technical review.
                            </h2>
                        </div>
                        <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                            Each project card highlights the client context, programme, investment scale, methods, and delivery status before opening the full case study.
                        </p>
                    </div>

                    <div className="mb-10 space-y-4 border-y border-slate-200 py-5 dark:border-slate-800">
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {CATEGORY_FILTERS.map((item) => (
                                <FilterButton key={item} label={item} active={category === item} onClick={() => setCategory(item)} />
                            ))}
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {STATUS_FILTERS.map((item) => (
                                <FilterButton key={item} label={item === 'All' ? 'All Statuses' : item} active={status === item} onClick={() => setStatus(item)} />
                            ))}
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                        </div>
                    )}

                    {filteredProjects.length ? (
                        <div className="grid gap-7 lg:grid-cols-2">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                            <CalendarCheck className="mx-auto mb-5 h-10 w-10 text-teal-600" />
                            <h3 className="text-2xl font-display font-bold text-slate-950 dark:text-white">No projects match this filter</h3>
                            <p className="mt-3 text-slate-500">Try another category or status to continue browsing the portfolio.</p>
                        </div>
                    )}
                </div>
            </section>

            <MalawiMap projects={projects} selectedId={selectedMapProject} onSelect={setSelectedMapProject} />
        </div>
    )
}
