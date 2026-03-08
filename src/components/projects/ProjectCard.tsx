import { MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
    id: string
    title: string
    location: string
    year: string
    category: string
    image: string
    size: 'normal' | 'tall' | 'wide'
    description: string
}

interface ProjectCardProps {
    project: Project
    isHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
    onClick: () => void
}

export function ProjectCard({
    project,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: ProjectCardProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-sm cursor-pointer group',
                project.size
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div
                className={cn(
                    'absolute inset-0 bg-navy-900 transition-opacity duration-300 flex flex-col justify-end p-6',
                    isHovered ? 'opacity-[0.85]' : 'opacity-0'
                )}
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
                className={cn(
                    'absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-semibold tracking-wide transition-opacity duration-300',
                    project.category === 'Roads' ? 'bg-orange-500 text-white' :
                        project.category === 'Bridges' ? 'bg-gold text-white' :
                            'bg-navy-600 text-white',
                    isHovered ? 'opacity-0' : 'opacity-100'
                )}
            >
                {project.category}
            </div>
        </div>
    )
}
