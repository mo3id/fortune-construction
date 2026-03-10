export interface Project {
    id: string;
    title: string;
    category: 'Infrastructure' | 'Commercial' | 'Residential' | 'Industrial';
    location: string;
    duration: string;
    budget: string;
    challenge: string;
    solution: string;
    result: string;
    coverImage: string;
    galleryImages: string[];
    completionDate: string;
}
