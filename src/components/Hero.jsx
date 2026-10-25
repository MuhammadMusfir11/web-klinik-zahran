import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import SplitText from './SplitText'
import { clinic } from '../data/clinic'
import { getClinicStatus } from '../utils/clinicStatus'
import { getNextSlot } from '../utils/nextSlot'
import { displayTime } from '../utils/booking'

const waLink = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Halo ${clinic.name}, saya ingin konsultasi.`,
)}`

const shortDate = (date) =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date)

export default function Hero() {
  const [status, setStatus] = useState(getClinicStatus())
  const [slot, setSlot] = useState(getNextSlot())
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getClinicStatus())
      setSlot(getNextSlot())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Kartu miring halus mengikuti kursor (hanya mouse, dan tidak jika "kurangi gerakan")
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 9).toFixed(2)}deg)`
  }

  const onPointerLeave = () => {
    cardRef.current.style.transform = ''
  }

  return (
    <section id="home" aria-labelledby="hero-title" className="px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Teks */}
        <div className="lg:col-span-7">
          <p className="rise text-sm font-medium text-muted" style={{ animationDelay: '600ms' }}>
            {clinic.name} <span aria-hidden="true">-</span> konsep portofolio
          </p>

          <SplitText
            as="h1"
            id="hero-title"
            text="Perawatan yang baik dimulai dari didengarkan"
            italic={['didengarkan.']}
            delay={700}
            className="mt-6 font-serif text-[2.6rem] leading-[1.04] tracking-tight text-forest sm:text-6xl lg:text-[4.25rem]"
          />

          <p
            className="rise mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: '1150ms' }}
          >
            Temukan layanan kesehatan yang mengutamakan komunikasi, kenyamanan, dan perhatian
            terhadap kebutuhan Anda.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: '1280ms' }}
          >
            <Link
              to="/booking"
              className="sweep inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-medium text-ivory"
            >
              Buat Janji Konsultasi
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <a
              href="/#layanan"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('layanan')?.scrollIntoView()
              }}
              className="link-draw pb-1 font-medium text-forest"
            >
              Kenali Layanan Kami
            </a>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rise mt-9 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-forest"
            style={{ animationDelay: '1400ms' }}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Ada pertanyaan singkat? Konsul langsung lewat WhatsApp
          </a>
        </div>

        {/* Kartu slot terdekat */}
        {slot && (
          <div className="rise lg:col-span-5" style={{ animationDelay: '950ms' }}>
            <div className="mx-auto max-w-md rounded-3xl bg-mist p-5 sm:p-7 lg:max-w-none">
              <div
                ref={cardRef}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                className="group relative rounded-2xl border border-line bg-white shadow-[0_28px_50px_-28px_rgba(15,76,129,0.45)] transition-transform duration-300 ease-out will-change-transform"
              >
                {/* Kilau yang mengikuti kursor */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(15,76,129,0.07), transparent 60%)',
                  }}
                />

                <div className="flex items-center justify-between gap-3 px-6 pt-6 text-xs font-medium uppercase tracking-wider text-muted">
                  <span>Slot kosong terdekat</span>
                  <span className="flex items-center gap-1.5 normal-case tracking-normal">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? 'bg-ember' : 'bg-muted'}`}
                    />
                    {status.label}
                  </span>
                </div>

                <div className="px-6 pb-7 pt-5 text-center">
                  <p className="text-sm text-muted">Perkiraan nomor antrian</p>
                  <p className="mt-1 font-serif text-7xl leading-none text-ember">
                    {slot.queueNumber}
                  </p>
                </div>

                <div className="relative border-t border-dashed border-line">
                  <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-mist" />
                  <span aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-mist" />
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-5 text-sm">
                  <div>
                    <dt className="text-muted">Hari</dt>
                    <dd className="mt-0.5 font-medium capitalize text-charcoal">
                      {slot.dayLabel}, {shortDate(slot.date)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Jam</dt>
                    <dd className="mt-0.5 font-medium text-charcoal">
                      {displayTime(slot.time)} WIB
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted">Dokter</dt>
                    <dd className="mt-0.5 font-medium text-charcoal">
                      {slot.doctor.name}
                      <span className="font-normal text-muted"> · {slot.doctor.specialty}</span>
                    </dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
                  <p className="text-xs text-muted">Ketersediaan Jadwal</p>
                  <Link
                    to="/booking"
                    state={{ serviceId: slot.serviceId, doctorId: slot.doctor.id }}
                    className="sweep inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-medium text-ivory"
                  >
                    Ambil slot ini
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}