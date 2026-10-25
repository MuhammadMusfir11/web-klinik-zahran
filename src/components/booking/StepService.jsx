import { services } from '../../data/services'
import { formatRupiah, formatDuration } from '../../utils/format'

export default function StepService({ value, onChange }) {
  return (
    <fieldset>
      <legend className="font-serif text-2xl text-forest">Pilih layanan</legend>
      <p className="mt-1 text-sm text-muted">
        Harga bersifat indikatif untuk demo portofolio dan harus diverifikasi pada klinik nyata.
      </p>

      <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {services.map((s) => {
          const selected = value === s.id

          return (
            <label key={s.id} className="relative block cursor-pointer">
              <input
                type="radio"
                name="service"
                value={s.id}
                checked={selected}
                onChange={() => onChange(s.id)}
                className="peer sr-only"
              />
              <div
                className={`flex items-start gap-4 px-4 py-4 transition-colors peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-forest sm:px-5 ${
                  selected ? 'bg-white' : 'hover:bg-white/60'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    selected ? 'border-forest' : 'border-muted/50'
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-forest" />}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-charcoal">{s.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{s.description}</p>
                  <p className="mt-1.5 text-xs text-muted">Estimasi {formatDuration(s.duration)}</p>
                </div>

                <p className="shrink-0 font-medium text-forest">{formatRupiah(s.price)}</p>
              </div>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}