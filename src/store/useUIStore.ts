import { create } from 'zustand'

export type ProjectCategory = 'All' | 'Roads' | 'Buildings' | 'Bridges'

interface UIState {
    // Navbar
    isNavScrolled: boolean
    isMobileMenuOpen: boolean
    setNavScrolled: (scrolled: boolean) => void
    setMobileMenuOpen: (open: boolean) => void

    // Gallery
    activeCategory: ProjectCategory
    setActiveCategory: (category: ProjectCategory) => void

    // Modal
    modalProjectId: string | null
    openModal: (id: string) => void
    closeModal: () => void

    // Contact form
    isFormSubmitted: boolean
    isFormSubmitting: boolean
    setFormSubmitting: (submitting: boolean) => void
    setFormSubmitted: (submitted: boolean) => void
    resetForm: () => void
}

export const useUIStore = create<UIState>((set) => ({
    // Navbar
    isNavScrolled: false,
    isMobileMenuOpen: false,
    setNavScrolled: (scrolled) => set({ isNavScrolled: scrolled }),
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

    // Gallery
    activeCategory: 'All',
    setActiveCategory: (category) => set({ activeCategory: category }),

    // Modal
    modalProjectId: null,
    openModal: (id) => set({ modalProjectId: id }),
    closeModal: () => set({ modalProjectId: null }),

    // Contact form
    isFormSubmitted: false,
    isFormSubmitting: false,
    setFormSubmitting: (submitting) => set({ isFormSubmitting: submitting }),
    setFormSubmitted: (submitted) => set({ isFormSubmitted: submitted }),
    resetForm: () => set({ isFormSubmitted: false, isFormSubmitting: false }),
}))
