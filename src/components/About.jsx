import Reveal from './Reveal'
import { openingHours } from '../data/clinic'

const principles = [
  {
    title: 'Mendengar dulu',
    text: 'Setiap konsultasi dimulai dari keluhan dan kekhawatiran pasien, bukan dari daftar pemeriksaan.',
  },
  {
    title: 'Informasi yang terbuka',
    text: 'Jadwal praktik, layanan, dan perkiraan biaya bisa dilihat sejak awal tanpa perlu bertanya.',
  },
  {
    title: 'Janji yang sederhana',
    text: 'Pilih layanan, dokter, dan jam dalam beberapa langkah, lalu lanjutkan lewat WhatsApp.',
  },
]

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const dayOrder = [1, 2, 3, 4, 5, 6, 0]
const fmt = (t) => t.replace(':', '.')

const todayIndex = () =>
  weekdayIndex[
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', weekday: 'short' }).format(
      new Date(),
    )
  ]

export default function About() {
  const today = todayIndex()

  return (
    <section id="tentang" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Judul + pengantar */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium text-ember">Tentang klinik</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl lg:text-[2.6rem]">
              Klinik yang meluangkan waktu untuk mendengar.
            </h2>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="font-serif text-xl leading-snug text-charcoal sm:text-2xl">
              Sehat Sentosa dirancang sebagai klinik yang tenang dan mudah dipahami, dari cara
              membuat janji sampai cara dokter menjelaskan hasil pemeriksaan.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Informasi layanan, jadwal dokter, dan perkiraan biaya ditampilkan secara terbuka,
              sehingga pasien tahu apa yang diharapkan sebelum datang.
            </p>
          </Reveal>
        </div>

        {/* Tiga prinsip */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="h-full">
              <article className="h-full rounded-2xl border border-line bg-white p-6 transition-colors duration-300 hover:border-forest/40 lg:p-7">
                <span className="font-serif text-lg text-ember">0{i + 1}</span>
                <h3 className="mt-5 font-serif text-xl text-forest lg:text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Jam operasional */}
        <Reveal delay={80} className="mt-12 rounded-2xl bg-mist p-6 sm:p-8 lg:mt-16 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-3">
              <h3 className="font-serif text-2xl text-forest">Jam operasional</h3>
              <p className="mt-1 text-sm text-muted">Waktu Indonesia Barat (WIB)</p>
            </div>

            <ul className="grid gap-2 lg:col-span-9 lg:grid-cols-7 lg:gap-3">
              {dayOrder.map((d) => {
                const hours = openingHours[d]
                const isToday = d === today

                return (
                  <li
                    key={d}
                    aria-current={isToday ? 'date' : undefined}
                    className={`flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm lg:block lg:py-4 ${
                      isToday ? 'ring-2 ring-forest' : ''
                    }`}
                  >
                    <span className="font-medium text-charcoal">{dayNames[d]}</span>
                    <span className="text-muted lg:mt-1 lg:block">
                      {hours ? `${fmt(hours.open)}–${fmt(hours.close)}` : 'Tutup'}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}