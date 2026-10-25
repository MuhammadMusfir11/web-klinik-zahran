import { useState } from 'react'
import { Info } from 'lucide-react'

const inputClass = (hasError) =>
  `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-forest ${
    hasError ? 'border-[#a8391f]' : 'border-line'
  }`

export default function StepPatient({ patient, onChange, errors, showErrors }) {
  const [touched, setTouched] = useState({})

  const touch = (field) => setTouched((prev) => ({ ...prev, [field]: true }))
  const error = (field) => ((showErrors || touched[field]) && errors[field] ? errors[field] : null)

  return (
    <div>
      <h2 className="font-serif text-2xl text-forest">Data diri</h2>

      <p className="mt-3 flex gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
        <span>
          Ini demo portofolio. Gunakan nama dan nomor contoh, bukan data pasien asli. Data hanya ada
          di halaman ini dan hilang saat halaman dimuat ulang.
        </span>
      </p>

      <div className="mt-6 space-y-6">
        {/* Nama */}
        <div>
          <label htmlFor="patient-name" className="block text-sm font-medium text-charcoal">
            Nama lengkap
          </label>
          <input
            id="patient-name"
            type="text"
            autoComplete="name"
            required
            value={patient.name}
            onChange={(e) => onChange('name', e.target.value)}
            onBlur={() => touch('name')}
            aria-invalid={Boolean(error('name'))}
            aria-describedby={error('name') ? 'patient-name-error' : undefined}
            placeholder="Contoh: Budi Santoso"
            className={inputClass(error('name'))}
          />
          {error('name') && (
            <p id="patient-name-error" className="mt-2 text-sm text-[#a8391f]">
              {error('name')}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="patient-phone" className="block text-sm font-medium text-charcoal">
            Nomor WhatsApp
          </label>
          <input
            id="patient-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={patient.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            onBlur={() => touch('phone')}
            aria-invalid={Boolean(error('phone'))}
            aria-describedby={`patient-phone-hint${error('phone') ? ' patient-phone-error' : ''}`}
            placeholder="0812 3456 7890"
            className={inputClass(error('phone'))}
          />
          <p id="patient-phone-hint" className="mt-2 text-xs text-muted">
            Format Indonesia, boleh diawali 08 atau +62.
          </p>
          {error('phone') && (
            <p id="patient-phone-error" className="mt-1 text-sm text-[#a8391f]">
              {error('phone')}
            </p>
          )}
        </div>

        {/* Catatan */}
        <div>
          <label htmlFor="patient-note" className="block text-sm font-medium text-charcoal">
            Catatan konsultasi <span className="font-normal text-muted">(opsional)</span>
          </label>
          <textarea
            id="patient-note"
            rows={3}
            maxLength={200}
            value={patient.note}
            onChange={(e) => onChange('note', e.target.value)}
            placeholder="Ceritakan singkat keluhan atau pertanyaan Anda"
            className={inputClass(false)}
          />
          <p className="mt-1 text-right text-xs text-muted">{patient.note.length}/200</p>
        </div>
      </div>
    </div>
  )
}