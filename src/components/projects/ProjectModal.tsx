import { X, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Project {
    id: string
    title: string
    location: string
    year: string
    category: string
    image: string
    description: string
}

interface ProjectModalProps {
    project: Project
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const handleEnquire = () => {
        onClose()
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-72">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-sm p-2 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <span className="text-orange-400 text-xs font-semibold tracking-widest uppercase">
                            {project.category}
                        </span>
                        <h3 className="font-display text-2xl font-bold text-white mt-1">{project.title}</h3>
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
                        <span className="flex items-center gap-1.5 trasnition-colors">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            {project.location}
                        </span>
                        <span className="flex items-center gap-1.5 transition-colors">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            {project.year}
                        </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
                    <Button
                        onClick={handleEnquire}
                        className="w-full justify-center"
                    >
                        Enquire About Similar Projects
                    </Button>
                </div>
            </div>
        </div>
    )
}
