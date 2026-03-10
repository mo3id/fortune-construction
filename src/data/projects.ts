import { Project } from '../types/project';

export const projectsData: Project[] = [
    {
        id: '1',
        title: 'Lilongwe Grand Bridge',
        category: 'Infrastructure',
        location: 'Lilongwe, Malawi',
        duration: '24 Months',
        budget: '$15M USD',
        challenge: 'Constructing a multi-lane bridge across the Lilongwe River during the rainy season, dealing with unpredictable water levels and soft soil foundations.',
        solution: 'Implemented advanced deep foundation techniques using steel piles and a pre-cast segmental construction method to minimize on-site concrete pouring during heavy rains.',
        result: 'Completed 2 months ahead of schedule, significantly reducing traffic congestion in the capital city while maintaining a zero-incident safety record.',
        coverImage: 'https://images.unsplash.com/photo-1545558014-8ab6aa17e307?q=80&w=1200&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590486803622-92fd0d97034c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=800&auto=format&fit=crop'
        ],
        completionDate: 'October 2024'
    },
    {
        id: '2',
        title: 'National Commercial Hub',
        category: 'Commercial',
        location: 'Blantyre, Malawi',
        duration: '18 Months',
        budget: '$22M USD',
        challenge: 'Building a 15-story modern commercial skyscraper in a dense urban area with strict noise and space constraints.',
        solution: 'Utilized just-in-time material delivery and quiet construction technologies. Designed an energy-efficient glass facade tailored to the local climate.',
        result: 'Delivered Malawi\'s first LEED-certified commercial building, setting a new standard for sustainable architecture in the region.',
        coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1545558014-8ab6aa17e307?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590486803622-92fd0d97034c?q=80&w=800&auto=format&fit=crop'
        ],
        completionDate: 'March 2025'
    },
    {
        id: '3',
        title: 'Mzuzu Highway Expansion',
        category: 'Infrastructure',
        location: 'Mzuzu to Nkhata Bay',
        duration: '36 Months',
        budget: '$45M USD',
        challenge: 'Upgrading a critical 50km mountainous road segment prone to landslides and heavy erosion.',
        solution: 'Engineered robust retaining walls, improved drainage systems, and utilized high-grade asphalt designed for extreme temperature variations.',
        result: 'Dramatically improved trade route efficiency and safety, reducing travel time by 40% and stimulating local economic growth.',
        coverImage: 'https://images.unsplash.com/photo-1590486803622-92fd0d97034c?q=80&w=1200&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1541888086925-920a0f6707dd?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
        ],
        completionDate: 'December 2023'
    }
];
