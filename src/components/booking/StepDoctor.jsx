import { doctors } from '../../data/doctors'
import { services } from '../../data/services'
import { scheduleSummary } from '../../utils/format'

// Inisial dari nama (tanpa gelar "dr." / "drg."), dipakai sampai foto dokter tersedia
const initials = (name) =>
  name
    .replace(/^(dr|drg)\.\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

export default function StepDoctor({ serviceId, value, onChange }) {
  const service = services.find((s) => s.id === serviceId)
  const available = doctors.filter((d) => d.serviceIds.includes(serviceId))

  return (
    <fieldset>
      <legend className="font-serif text-2xl text-forest">Pilih dokter</legend>
      <p className="mt-1 text-sm text-muted">
        Untuk layanan <span className="font-medium text-charcoal">{service?.name}</span>. Dokter pada
        demo ini adalah profil fiktif.
      </p>

      <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {available.map((d) => {
          const selected = value === d.id

          return (
            <label key={d.id} className="relative block cursor-pointer">
              <input
                type="radio"
                name="doctor"
                value={d.id}
                checked={selected}
                onChange={() => onChange(d.id)}
                className="peer sr-only"
              />
              <div
                className={`flex items-start gap-4 px-4 py-4 transition-colors peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-forest sm:px-5 ${
                  selected ? 'bg-white' : 'hover:bg-white/60'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-lg text-ivory"
                >
                  {initials(d.name)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-charcoal">{d.name}</p>
                  <p className="text-sm text-muted">{d.specialty}</p>
                  <p className="mt-2 text-sm text-muted">{d.bio}</p>
                  <ul className="mt-2 space-y-0.5 text-sm text-charcoal">
                    {scheduleSummary(d.schedule).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    selected ? 'border-forest' : 'border-muted/50'
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-forest" />}
                </span>
              </div>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}