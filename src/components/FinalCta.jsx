import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Reveal from './Reveal'
import { clinic } from '../data/clinic'

const waHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Halo ${clinic.name}, saya ingin bertanya.`,
)}`

export default function FinalCta() {
  return (
    <section className="bg-forest px-5 py-20 text-ivory sm:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Mulai dari satu <em className="font-normal italic">percakapan.</em>
        </h2>
        <p className="mt-5 max-w-lg leading-relaxed text-ivory/70">
          Pilih layanan dan jadwal dalam beberapa langkah, atau tanyakan dulu lewat WhatsApp.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-medium text-forest transition-colors hover:bg-white"
          >
            Buat janji konsultasi
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 font-medium text-ivory transition-colors hover:border-ivory"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Tanya lewat WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}