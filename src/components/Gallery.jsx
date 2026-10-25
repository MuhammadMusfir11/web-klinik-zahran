import { useRef, useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { galleryPhotos } from '../utils/galleryPhotos'

// Pola susunan, berulang tiap 6 foto
const layout = [
  'col-span-2 aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto',
  'aspect-square md:col-span-5 md:aspect-auto',
  'aspect-square md:col-span-5 md:aspect-auto',
  'aspect-square md:col-span-4 md:row-span-2 md:aspect-auto',
  'aspect-square md:col-span-4 md:row-span-2 md:aspect-auto',
  'aspect-square md:col-span-4 md:row-span-2 md:aspect-auto',
]

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const lastTrigger = useRef(null)

  const hasPhotos = galleryPhotos.length > 0

  // Saat belum ada foto: tampilkan kotak penanda hanya di mode pengembangan,
  // di versi produksi section disembunyikan supaya tidak ada gambar rusak.
  if (!hasPhotos && !import.meta.env.DEV) return null

  const open = (e, i) => {
    lastTrigger.current = e.currentTarget
    setOpenIndex(i)
  }

  const close = () => {
    setOpenIndex(null)
    requestAnimationFrame(() => lastTrigger.current?.focus())
  }

  const tiles = hasPhotos ? galleryPhotos : Array.from({ length: 6 }, () => null)

  return (
    <section id="galeri" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ember">Galeri</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
              Sekilas suasana klinik.
            </h2>
          </div>
          {hasPhotos && <p className="text-sm text-muted">Klik foto untuk memperbesar.</p>}
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:auto-rows-[11rem] md:grid-cols-12 lg:auto-rows-[13rem]">
            {tiles.map((photo, i) => {
              const spot = layout[i % layout.length]

              if (!photo) {
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-xl bg-line px-4 text-center text-sm text-muted ${spot}`}
                  >
                    Foto dapat disesuaikan dengan foto klinik anda.
                  </div>
                )
              }

              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={(e) => open(e, i)}
                  aria-label={`Perbesar foto: ${photo.alt}`}
                  className={`group overflow-hidden rounded-xl bg-line ${spot}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {hasPhotos && openIndex !== null && (
        <Lightbox
          items={galleryPhotos}
          index={openIndex}
          onClose={close}
          onChange={setOpenIndex}
        />
      )}
    </section>
  )
}