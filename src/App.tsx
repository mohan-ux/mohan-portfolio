import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Statement from './components/Statement'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useSmoothScroll } from './lib/smoothScroll'
import './index.css'

export default function App() {
  const [progress, setProgress] = useState(0)
  const [loaderDone, setLoaderDone] = useState(false)

  useSmoothScroll()

  useEffect(() => {
    let p = 0
    const timer = setInterval(() => {
      // Realistic loading: starts fast, slows near end
      const delta = p < 60
        ? Math.random() * 20
        : p < 90
        ? Math.random() * 8
        : Math.random() * 3
      p += delta
      if (p >= 100) {
        p = 100
        clearInterval(timer)
        setTimeout(() => setLoaderDone(true), 400)
      }
      setProgress(Math.min(p, 100))
    }, 80)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Loader progress={progress} done={loaderDone} />
      <Cursor />
      <div className="cinematic-vignette" />
      <div className="cinematic-grain" />

      {loaderDone && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Statement />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}
