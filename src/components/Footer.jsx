import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clinic } from '../data/clinic'
import { hoursLines } from '../utils/hoursSummary'

const navLinks = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'dokter', label: 'Dokter' },
  { id: 'artikel', label: 'Artikel' },
  { id: 'kontak', label: 'Kontak' },
]

const telHref = `tel:${clinic.phone.replace(/[^\d+]/g, '')}`
const waHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Halo ${clinic.name}, saya ingin bertanya.`,
)}`

const linkClass = 'text-ivory/70 transition-colors hover:text-ivory'
const headingClass = 'text-sm font-medium text-sage'

export default function Footer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  const goTo = (e, id) => {
    e.preventDefault()
    if (isHome) document.getElementById(id)?.scrollIntoView()
    else navigate('/', { state: { scrollTo: id } })
  }

  return (
    <footer className="bg-forest-dark px-5 pb-8 pt-16 text-ivory sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-serif text-2xl">{clinic.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">{clinic.tagline}</p>
          </div>

          <nav aria-label="Navigasi footer" className="lg:col-span-2 lg:col-start-6">
            <p className={headingClass}>Navigasi</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`/#${id}`} onClick={(e) => goTo(e, id)} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/booking" className={linkClass}>
                  Buat Janji
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className={headingClass}>Kontak</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
              <li>{clinic.address}</li>
              <li>
                <a href={telHref} className={linkClass}>
                  {clinic.phone}
                </a>
              </li>
              <li>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className={headingClass}>Jam operasional</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
              {hoursLines().map((line) => (
                <li key={line.days} className="flex justify-between gap-4">
                  <span>{line.days}</span>
                  <span>{line.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/15 pt-6 text-xs leading-relaxed text-ivory/60">
          <p>
            © {new Date().getFullYear()} {clinic.name}. {clinic.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}