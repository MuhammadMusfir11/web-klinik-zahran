import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import Reveal from './Reveal'
import { clinic } from '../data/clinic'
import { hoursLines } from '../utils/hoursSummary'

const query = encodeURIComponent(clinic.mapQuery)
const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`
const openMapHref = `https://www.google.com/maps/search/?api=1&query=${query}`

const telHref = `tel:${clinic.phone.replace(/[^\d+]/g, '')}`
const waHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Halo ${clinic.name}, saya ingin bertanya.`,
)}`
const waDisplay = clinic.whatsapp.startsWith('62')
  ? `+62 ${clinic.whatsapp.slice(2)}`
  : `+${clinic.whatsapp}`

const linkClass =
  'text-charcoal underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-forest'

export default function Contact() {
  const [mapActive, setMapActive] = useState(false)

  return (
    <section id="kontak" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Informasi kontak */}
        <Reveal className="lg:col-span-5">
          <p className="text-sm font-medium text-ember">Kontak</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
            Datang, telepon, atau kirim pesan.
          </h2>

          <ul className="mt-8 border-b border-line">
            <li className="flex gap-4 border-t border-line py-5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Alamat</p>
                <p className="mt-1 text-charcoal">{clinic.address}</p>
              </div>
            </li>

            <li className="flex gap-4 border-t border-line py-5">
              <Phone size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Telepon</p>
                <p className="mt-1">
                  <a href={telHref} className={linkClass}>
                    {clinic.phone}
                  </a>
                </p>
              </div>
            </li>

            <li className="flex gap-4 border-t border-line py-5">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">WhatsApp</p>
                <p className="mt-1">
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {waDisplay}
                  </a>
                </p>
              </div>
            </li>

            <li className="flex gap-4 border-t border-line py-5">
              <Clock size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm text-muted">Jam operasional</p>
                <ul className="mt-1 space-y-1 text-charcoal">
                  {hoursLines().map((line) => (
                    <li key={line.days} className="flex justify-between gap-4">
                      <span>{line.days}</span>
                      <span className="text-muted">{line.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="inline-flex items-center rounded-full bg-forest px-6 py-3 font-medium text-ivory transition-colors hover:bg-forest-dark"
            >
              Buat Janji
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-charcoal transition-colors hover:border-forest"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat WhatsApp
            </a>
          </div>
        </Reveal>

        {/* Peta */}
        <Reveal delay={80} className="lg:col-span-7">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-line bg-line sm:h-96 lg:h-[30rem]">
            <iframe
              title="Peta lokasi contoh Klinik Sehat Sentosa"
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`h-full w-full border-0 ${mapActive ? '' : 'pointer-events-none'}`}
            />

            {!mapActive ? (
              <button
                type="button"
                onClick={() => setMapActive(true)}
                aria-label="Aktifkan peta agar bisa digeser dan diperbesar"
                className="absolute inset-0 flex items-end justify-center pb-4"
              >
                <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-charcoal shadow-sm">
                  Ketuk untuk menggeser peta
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMapActive(false)}
                className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-charcoal shadow-sm"
              >
                Kunci peta
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
            <p className="text-muted">Lokasi peta hanya contoh untuk demo.</p>
            <div className="flex gap-5">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-forest underline decoration-line decoration-2 underline-offset-4 hover:decoration-forest"
              >
                <Navigation size={14} aria-hidden="true" />
                Petunjuk arah
              </a>
              <a
                href={openMapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline decoration-line decoration-2 underline-offset-4 hover:decoration-forest"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}