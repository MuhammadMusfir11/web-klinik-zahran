import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Doctors from '../components/Doctors'
import Journey from '../components/Journey'
import Gallery from '../components/Gallery'
import Articles from '../components/Articles'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import FinalCta from '../components/FinalCta'

export default function Home() {
  const { state } = useLocation()

  useEffect(() => {
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(state.scrollTo)?.scrollIntoView()
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [state])

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Doctors />
      <Journey />
      <Gallery />
      <Articles />
      <Faq />
      <Contact />
      <FinalCta />
    </main>
  )
}