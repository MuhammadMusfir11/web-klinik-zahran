import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { House, Menu, X } from 'lucide-react'
import { clinic } from '../data/clinic'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'dokter', label: 'Dokter' },
  { id: 'artikel', label: 'Artikel' },
  { id: 'kontak', label: 'Kontak' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  const listRef = useRef(null)
  const itemRefs = useRef({})

  // Status scroll: mengecilkan navbar + menentukan section yang aktif
  useEffect(() => {
    let ticking = false

    const update = () => {
      setScrolled(window.scrollY > 40)

      if (isHome) {
        let current = 'home'
        for (const { id } of links) {
          if (id === 'home') continue
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 140) current = id
        }
        setActive(current)
      } else {
        setActive(null)
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Posisi pil indikator yang bergeser ke item aktif
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[active]
      if (!el) {
        setIndicator((prev) => ({ ...prev, ready: false }))
        return
      }
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (listRef.current) observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [active, scrolled])

  // Tutup menu mobile dengan tombol Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Tutup menu mobile saat pindah halaman
  useEffect(() => setOpen(false), [pathname])

  const goTo = (e, id) => {
    e.preventDefault()
    setOpen(false)

    if (id === 'home') {
      if (isHome) window.scrollTo({ top: 0 })
      else navigate('/')
      return
    }

    if (isHome) document.getElementById(id)?.scrollIntoView()
    else navigate('/', { state: { scrollTo: id } })
  }

  const itemPad = scrolled ? 'px-3 py-1.5' : 'px-4 py-2'

  return (
    <header className="nav-in fixed inset-x-0 top-3 z-50 flex flex-col items-center px-3 sm:top-4">
      <nav
        aria-label="Navigasi utama"
        className={`flex items-center gap-2 rounded-full border border-line bg-white/95 shadow-sm backdrop-blur transition-all duration-300 ${scrolled ? 'p-1 text-[13px]' : 'p-1.5 text-sm'
          } w-full max-w-md justify-between lg:w-auto lg:max-w-none lg:justify-start lg:gap-3`}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => goTo(e, 'home')}
          className={`font-serif text-forest transition-all duration-300 ${scrolled ? 'pl-3 text-base' : 'pl-4 text-lg'
            }`}
        >
          {clinic.shortName}
        </a>

        {/* Daftar menu desktop */}
        <ul ref={listRef} className="relative hidden items-center lg:flex">
          <span
            aria-hidden="true"
            className={`absolute bottom-0 top-0 rounded-full bg-forest/10 transition-all duration-300 ease-out ${indicator.ready ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ left: indicator.left, width: indicator.width }}
          />
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                ref={(el) => (itemRefs.current[id] = el)}
                href={id === 'home' ? '/' : `/#${id}`}
                onClick={(e) => goTo(e, id)}
                aria-current={active === id ? 'page' : undefined}
                className={`relative z-10 flex items-center gap-1.5 rounded-full font-medium transition-all duration-300 ${itemPad} ${active === id ? 'text-forest' : 'text-muted hover:text-forest'
                  }`}
              >
                {id === 'home' && <House size={15} aria-hidden="true" />}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol kanan */}
        <div className="flex items-center gap-1.5">
          <Link
            to="/booking"
            className={`sweep rounded-full bg-forest font-medium text-ivory transition-all duration-300 ${scrolled ? 'px-3.5 py-1.5' : 'px-4 py-2'
              }`}
          >
            Buat Janji
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-forest/10 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="mt-2 w-full max-w-md rounded-3xl border border-line bg-white p-2 shadow-sm lg:hidden"
        >
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={id === 'home' ? '/' : `/#${id}`}
                  onClick={(e) => goTo(e, id)}
                  aria-current={active === id ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-medium ${active === id ? 'bg-forest/10 text-forest' : 'text-charcoal'
                    }`}
                >
                  {id === 'home' && <House size={16} aria-hidden="true" />}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}