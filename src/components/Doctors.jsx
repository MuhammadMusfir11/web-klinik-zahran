import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import { doctors } from '../data/doctors'
import { services } from '../data/services'
import { scheduleSummary, formatRupiah } from '../utils/format'
import { getDoctorPhoto } from '../utils/doctorPhoto'

const initials = (name) =>
  name
    .replace(/^(dr|drg)\.\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

const shortName = (name) => name.split(',')[0]

function Portrait({ photo, doctor, className, textClass }) {
  return (
    <div className={`overflow-hidden bg-forest ${className}`}>
      {photo ? (
        <img
          src={photo}
          alt={`Foto ${doctor.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span aria-hidden="true" className={`font-serif text-ivory/90 ${textClass}`}>
            {initials(doctor.name)}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Doctors() {
  const [activeId, setActiveId] = useState(doctors[0].id)
  const tabRefs = useRef({})

  const doctor = doctors.find((d) => d.id === activeId)
  const photo = getDoctorPhoto(doctor.id)
  const offered = services.filter((s) => doctor.serviceIds.includes(s.id))

  const onKeyDown = (e) => {
    const forward = ['ArrowDown', 'ArrowRight']
    const backward = ['ArrowUp', 'ArrowLeft']
    if (![...forward, ...backward].includes(e.key)) return

    e.preventDefault()
    const index = doctors.findIndex((d) => d.id === activeId)
    const delta = forward.includes(e.key) ? 1 : -1
    const target = doctors[(index + delta + doctors.length) % doctors.length]

    setActiveId(target.id)
    tabRefs.current[target.id]?.focus()
  }

  return (
    <section id="dokter" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-ember">Dokter</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl lg:text-[2.6rem]">
            Dokter yang akan mendampingi Anda.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Pilih nama untuk melihat profil, jadwal praktik, dan layanan yang ditangani. Profil
            dokter pada demo ini adalah karakter fiktif.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* Daftar dokter */}
          <div className="min-w-0 lg:col-span-4">
            <div
              role="tablist"
              aria-label="Daftar dokter"
              onKeyDown={onKeyDown}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b lg:border-line lg:px-0 lg:pb-0"
            >
              {doctors.map((d) => {
                const active = d.id === activeId

                return (
                  <button
                    key={d.id}
                    ref={(el) => (tabRefs.current[d.id] = el)}
                    type="button"
                    role="tab"
                    id={`tab-${d.id}`}
                    aria-selected={active}
                    aria-controls="doctor-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveId(d.id)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-left text-sm transition-colors lg:flex lg:w-full lg:items-center lg:justify-between lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-4 ${
                      active
                        ? 'border-forest bg-forest text-ivory lg:border-line lg:bg-transparent lg:text-forest'
                        : 'border-line bg-white text-charcoal hover:border-forest lg:bg-transparent lg:text-muted lg:hover:text-charcoal'
                    }`}
                  >
                    <span>
                      <span className="block font-medium lg:text-base">{shortName(d.name)}</span>
                      <span className="hidden text-sm font-normal text-muted lg:block">
                        {d.specialty}
                      </span>
                    </span>
                    {active && (
                      <ChevronRight size={18} aria-hidden="true" className="hidden lg:block" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Profil dokter */}
          <div
            key={doctor.id}
            role="tabpanel"
            id="doctor-panel"
            aria-labelledby={`tab-${doctor.id}`}
            tabIndex={0}
            className="step-in min-w-0 rounded-2xl border border-line bg-white p-5 md:p-8 lg:col-span-8"
          >
            <div className="md:grid md:grid-cols-5 md:gap-10">
              {/* Foto besar (tablet ke atas) */}
              <div className="hidden md:col-span-2 md:block">
                <Portrait
                  photo={photo}
                  doctor={doctor}
                  className="aspect-[4/5] w-full rounded-xl"
                  textClass="text-7xl"
                />
              </div>

              <div className="md:col-span-3">
                {/* Kepala profil di HP: foto kecil di samping nama */}
                <div className="flex items-center gap-4 md:hidden">
                  <Portrait
                    photo={photo}
                    doctor={doctor}
                    className="aspect-[4/5] w-24 shrink-0 rounded-xl"
                    textClass="text-3xl"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ember">{doctor.specialty}</p>
                    <h3 className="mt-1 font-serif text-2xl leading-tight text-forest">
                      {doctor.name}
                    </h3>
                  </div>
                </div>

                {/* Kepala profil di tablet/laptop */}
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-ember">{doctor.specialty}</p>
                  <h3 className="mt-2 font-serif text-3xl text-forest">{doctor.name}</h3>
                </div>

                <p className="mt-5 leading-relaxed text-muted md:mt-4">{doctor.bio}</p>

                <h4 className="mt-7 text-sm font-medium text-charcoal md:mt-8">Jadwal praktik</h4>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {scheduleSummary(doctor.schedule).map((line) => (
                    <li key={line}>{line} WIB</li>
                  ))}
                </ul>

                <h4 className="mt-7 text-sm font-medium text-charcoal md:mt-8">Buat janji untuk</h4>
                <div className="mt-2 border-b border-line">
                  {offered.map((s) => (
                    <Link
                      key={s.id}
                      to="/booking"
                      state={{ serviceId: s.id, doctorId: doctor.id }}
                      aria-label={`Buat janji ${s.name} dengan ${doctor.name}`}
                      className="group flex items-center justify-between gap-4 border-t border-line py-3.5 transition-colors hover:text-forest"
                    >
                      <span className="text-sm font-medium sm:text-base">{s.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-sm text-muted group-hover:text-forest">
                        {formatRupiah(s.price)}
                        <ArrowUpRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}