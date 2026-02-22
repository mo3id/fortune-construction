import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Services from '@/components/Services'
import Timeline from '@/components/Timeline'
import Projects from '@/components/Projects'
import Partners from '@/components/Partners'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

function App() {
    // Scroll reveal observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        )

        const elements = document.querySelectorAll('.reveal')
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Impact />
                <Services />
                <Timeline />
                <Projects />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
