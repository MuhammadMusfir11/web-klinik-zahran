import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { services } from '../data/services'

// Saat disorot, difokus (keyboard), dan ditekan: membesar sedikit + bayangan di belakang
const lift =
  'hover:z-10 hover:scale-[1.02] hover:shadow-[0_22px_44px_-16px_rgba(15,76,129,0.35)] ' +
  'focus-visible:z-10 focus-visible:scale-[1.02] focus-visible:shadow-[0_22px_44px_-16px_rgba(15,76,129,0.35)] ' +
  'active:z-10 active:scale-[1.035] active:shadow-[0_26px_50px_-16px_rgba(15,76,129,0.45)]'

export default function Services() {
  const lastIsAlone = services.length % 2 === 1

  return (
    <section id="layanan" className="border-t border-line bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-ember">Yang bisa kami bantu</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl lg:text-[2.6rem]">
              Layanan
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
            Tiap layanan ditangani dokter yang sesuai. Pilih yang paling mendekati keluhan atau
            kebutuhanmu, lalu lanjut memilih dokter dan jadwal.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:mt-14 lg:gap-5">
          {services.map((s, i) => {
            const isLast = i === services.length - 1

            return (
              <Reveal
                key={s.id}
                delay={(i % 2) * 100}
                className={`h-full ${
                  lastIsAlone && isLast
                    ? 'col-span-2 w-[calc(50%-0.375rem)] justify-self-center md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.625rem)]'
                    : ''
                }`}
              >
                <Link
                  to="/booking"
                  state={{ serviceId: s.id }}
                  aria-label={`Buat janji untuk ${s.name}`}
                  className={`group relative flex h-full flex-col rounded-2xl border border-line bg-ivory p-4 transition-[transform,box-shadow] duration-300 ease-out sm:p-6 lg:p-7 ${lift}`}
                >
                  <span className="font-serif text-base text-ember sm:text-lg">0{i + 1}</span>

                  <h3 className="mt-3 font-serif text-lg leading-snug text-forest sm:mt-4 sm:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{s.purpose}</p>

                  <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-muted sm:mt-6 sm:text-xs">
                    Cocok untuk
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-charcoal sm:mt-3 sm:space-y-2 sm:text-sm">
                    {s.suitableFor.map((item) => (
                      <li key={item} className="flex gap-2 sm:gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-2 shrink-0 bg-ember sm:mt-[0.6rem] sm:w-3"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* mt-auto: tombol selalu di dasar kartu, sejajar antar kartu */}
                  <div className="mt-auto pt-5 sm:pt-7">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-forest px-3.5 py-1.5 text-xs font-medium text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory sm:gap-2 sm:px-5 sm:py-2 sm:text-sm">
                      Buat janji
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}