import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const iconButton =
  'flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 focus-visible:outline-ivory'

export default function Lightbox({ items, index, onClose, onChange }) {
  const closeRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const total = items.length
  const item = items[index]
  const go = (delta) => onChange((index + delta + total) % total)

  // Kunci scroll halaman selama lightbox terbuka
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Keyboard: Esc, panah, dan Tab (fokus berputar di dalam lightbox)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && total > 1) {
        go(-1)
      } else if (e.key === 'ArrowRight' && total > 1) {
        go(1)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        const order = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean)
        const current = order.indexOf(document.activeElement)
        const target = e.shiftKey
          ? current <= 0
            ? order.length - 1
            : current - 1
          : current === order.length - 1
            ? 0
            : current + 1
        order[target]?.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      onClick={onClose}
      className="fade-in fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Tutup galeri"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className={`absolute right-4 top-4 ${iconButton}`}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-5xl flex-col items-center"
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className="step-in max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-ivory/80">
          {item.alt} <span className="text-ivory/50">· {index + 1} / {total}</span>
        </figcaption>
      </figure>

      {total > 1 && (
        <>
          <button
            ref={prevRef}
            type="button"
            aria-label="Foto sebelumnya"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            className={`absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 ${iconButton}`}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Foto berikutnya"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 sm:right-6 ${iconButton}`}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}