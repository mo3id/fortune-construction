import { useState } from 'react'
import { X, MapPin, Calendar } from 'lucide-react'
import { useUIStore, type ProjectCategory } from '@/store/useUIStore'

interface Project {
    id: string
    title: string
    location: string
    year: string
    category: Exclude<ProjectCategory, 'All'>
    image: string
    size: 'normal' | 'tall' | 'wide'
    description: string
}

const PROJECTS: Project[] = [
    {
        id: 'p1',
        title: 'Lilongwe–Salima Highway',
        location: 'Central Region, Malawi',
        year: '2023',
        category: 'Roads',
        image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
        size: 'wide',
        description: '180km dual-carriageway rehabilitation project improving connectivity between Lilongwe and Salima.',
    },
    {
        id: 'p2',
        title: 'Mzuzu City Hall',
        location: 'Mzuzu, Northern Region',
        year: '2022',
        category: 'Buildings',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        size: 'tall',
        description: 'A flagship government administrative building serving the Northern Region.',
    },
    {
        id: 'p3',
        title: 'Shire River Bridge',
        location: 'Southern Region, Malawi',
        year: '2021',
        category: 'Bridges',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        size: 'normal',
        description: '280m reinforced concrete bridge spanning the Shire River, connecting two districts.',
    },
    {
        id: 'p4',
        title: 'Blantyre Commercial District',
        location: 'Blantyre, Malawi',
        year: '2023',
        category: 'Buildings',
        image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
        size: 'normal',
        description: 'Multi-storey commercial complex housing retail, office, and hospitality spaces.',
    },
    {
        id: 'p5',
        title: 'Rural Feeder Roads Network',
        location: 'Kasungu, Malawi',
        year: '2022',
        category: 'Roads',
        image: 'https://images.unsplash.com/photo-1558618047-3c29f4b2b1c5?w=800&q=80',
        size: 'normal',
        description: '320km of rural feeder roads bringing agricultural communities closer to markets.',
    },
    {
        id: 'p6',
        title: 'Zomba Pedestrian Bridge',
        location: 'Zomba, Malawi',
        year: '2020',
        category: 'Bridges',
        image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
        size: 'tall',
        description: 'Steel pedestrian bridge providing safe crossing over Mulunguzi Dam spillway.',
    },
]

const CATEGORIES: ProjectCategory[] = ['All', 'Roads', 'Buildings', 'Bridges']

export default function Projects() {
    const { activeCategory, setActiveCategory, modalProjectId, openModal, closeModal } = useUIStore()
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const filtered = activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory)

    const modalProject = PROJECTS.find((p) => p.id === modalProjectId)

    return (
        <section id="projects" className="section-padding bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 reveal">
                    <p className="section-subtitle">Our Portfolio</p>
                    <h2 className="section-title max-w-2xl mx-auto">Landmark Projects Across Malawi</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        Each project represents a commitment to quality, safety, and the communities we serve.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 text-sm font-semibold tracking-wide rounded-sm border transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-orange-500 border-orange-500 text-white'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="masonry-grid">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className={`relative overflow-hidden rounded-sm cursor-pointer group ${project.size}`}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => openModal(project.id)}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div
                                className={`absolute inset-0 bg-navy-900 transition-opacity duration-300 flex flex-col justify-end p-6 ${hoveredId === project.id ? 'opacity-[0.85]' : 'opacity-0'
                                    }`}
                            >
                                <span className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-2">
                                    {project.category}
                                </span>
                                <h3 className="font-display text-xl font-bold text-white mb-2">{project.title}</h3>
                                <div className="flex items-center gap-4 text-white/60 text-xs mb-3">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
                            </div>

                            {/* Category badge */}
                            <div
                                className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-semibold tracking-wide transition-opacity duration-300 ${project.category === 'Roads' ? 'bg-orange-500 text-white' :
                                        project.category === 'Bridges' ? 'bg-gold text-white' :
                                            'bg-navy-600 text-white'
                                    } ${hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`}
                            >
                                {project.category}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalProject && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-72">
                            <img src={modalProject.image} alt={modalProject.title} className="w-full h-full object-cover" />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-sm p-2 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                            <div className="absolute bottom-4 left-6">
                                <span className="text-orange-400 text-xs font-semibold tracking-widest uppercase">{modalProject.category}</span>
                                <h3 className="font-display text-2xl font-bold text-white mt-1">{modalProject.title}</h3>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-500" />{modalProject.location}</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-orange-500" />{modalProject.year}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-8">{modalProject.description}</p>
                            <button
                                onClick={() => { closeModal(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="btn-primary w-full justify-center"
                            >
                                Enquire About Similar Projects
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
