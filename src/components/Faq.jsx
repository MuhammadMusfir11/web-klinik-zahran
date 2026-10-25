import { useState } from 'react'
import { Plus, MessageCircle } from 'lucide-react'
import Reveal from './Reveal'
import { clinic } from '../data/clinic'
import { hoursSummary } from '../utils/hoursSummary'


const waLink = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Halo ${clinic.name}, saya punya pertanyaan.`,
)}`

const faqs = [
  {
    q: 'Bagaimana cara membuat janji?',
    a: 'Buka halaman Buat Janji, pilih layanan, dokter, serta tanggal dan jam, lalu isi nama dan nomor WhatsApp. Di akhir kamu mendapat kartu antrian dan bisa melanjutkan ke WhatsApp. Di demo ini, janji tidak otomatis dikonfirmasi.',
  },
  {
    q: 'Kapan klinik buka?',
    a: `Jam operasional: ${hoursSummary()}. Jadwal praktik tiap dokter bisa berbeda dan dapat dilihat di bagian Dokter.`,
  },
  {
    q: 'Berapa biaya layanan?',
    a: 'Perkiraan biaya tiap layanan tampil di bagian Layanan dan saat kamu memilih layanan di halaman booking. Harga hanyalah contoh untuk demo portofolio dan harus diverifikasi pada klinik nyata.',
  },
  {
    q: 'Bisakah bertanya lewat WhatsApp tanpa membuat janji?',
    a: 'Bisa. Gunakan tautan konsultasi WhatsApp di beranda atau tombol di bawah daftar ini. Nomor yang dipakai pada demo ini masih nomor contoh.',
  },
  {
    q: 'Di mana lokasi klinik dan bagaimana parkirnya?',
    a: `Alamat pada demo: ${clinic.address}. Alamat ini fiktif, dan informasi parkir akan dicantumkan pada klinik nyata.`,
  },
  {
    q: 'Apakah data yang saya isi disimpan?',
    a: 'Tidak. Demo ini tidak memakai server atau basis data. Data hanya ada di halaman sampai dimuat ulang, jadi gunakan nama dan nomor contoh, bukan data pasien asli.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="text-sm font-medium text-ember">FAQ</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
            Pertanyaan yang sering diajukan.
          </h2>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-forest"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Pertanyaan lain? Tanya lewat WhatsApp
          </a>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <div className="border-b border-line">
            {faqs.map((item, i) => {
              const open = openIndex === i

              return (
                <div key={item.q} className="border-t border-line">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={open}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-serif text-lg text-forest sm:text-xl">{item.q}</span>
                      <Plus
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 text-muted transition-transform duration-300 ${
                          open ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}