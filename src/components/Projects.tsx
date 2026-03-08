import { useState } from 'react'
import { useUIStore } from '@/store/useUIStore'
import { SectionHeader } from './ui/SectionHeader'
import { Container } from './ui/Container'
import { ProjectCard } from './projects/ProjectCard'
import { ProjectFilter } from './projects/ProjectFilter'
import { ProjectModal } from './projects/ProjectModal'
import { Project, ProjectCategory } from '@/types'

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
            <Container>
                <SectionHeader
                    subtitle="Our Portfolio"
                    title="Landmark Projects Across Malawi"
                    description="Each project represents a commitment to quality, safety, and the communities we serve."
                />

                <ProjectFilter
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="masonry-grid">
                    {filtered.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isHovered={hoveredId === project.id}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => openModal(project.id)}
                        />
                    ))}
                </div>
            </Container>

            {modalProject && (
                <ProjectModal project={modalProject} onClose={closeModal} />
            )}
        </section>
    )
}
