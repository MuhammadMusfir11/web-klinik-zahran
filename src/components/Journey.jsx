import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    title: 'Pilih layanan dan dokter',
    text: 'Lihat layanan beserta perkiraan biayanya, lalu pilih dokter yang praktik di hari yang kamu inginkan.',
  },
  {
    title: 'Tentukan tanggal dan jam',
    text: 'Pilih dari slot yang tersedia sesuai jadwal praktik dokter, lalu isi nama dan nomor WhatsApp.',
  },
  {
    title: 'Ajukan dan lanjut ke WhatsApp',
    text: 'Kamu mendapat kartu antrian demo berisi nomor antrian, jadwal, dan dokter pemeriksa, lalu kirim permintaannya lewat WhatsApp.',
  },
]

export default function Journey() {
  return (
    <section id="alur" className="bg-forest px-5 py-20 text-ivory sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-sage">Alur janji</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]">
            Tiga langkah dari memilih sampai kartu antrian.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col md:mt-14 md:flex-row md:items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.title}>
              <Reveal delay={i * 160} className="md:flex-1">
                <article className="h-full rounded-2xl border border-ivory/15 bg-ivory/5 p-6 lg:p-7">
                  <span className="font-serif text-4xl text-sage">0{i + 1}</span>
                  <h3 className="mt-5 font-serif text-xl lg:text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/70">{step.text}</p>
                </article>
              </Reveal>

              {i < steps.length - 1 && (
                <Reveal
                  delay={i * 160 + 100}
                  className="flex justify-center py-3 md:items-center md:px-3 md:py-0"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/50 text-sage">
                    <ArrowDown size={18} aria-hidden="true" className="md:hidden" />
                    <ArrowRight size={18} aria-hidden="true" className="hidden md:block" />
                  </span>
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>

        <Reveal
          delay={120}
          className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ivory/20 pt-8 md:mt-14"
        >
          <p className="max-w-lg text-sm leading-relaxed text-ivory/70">
            Di demo ini, permintaan janji tidak otomatis dikonfirmasi. Konfirmasi dilakukan oleh
            pihak klinik setelah pesan WhatsApp dikirim.
          </p>
          <Link
            to="/booking"
            className="sweep inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-medium text-forest [--sweep-bg:#ffffff]"
          >
            Mulai buat janji
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}