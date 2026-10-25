import { doctors } from '../../data/doctors'
import { services } from '../../data/services'
import { formatRupiah } from '../../utils/format'
import { formatDateLong, displayTime } from '../../utils/booking'

export default function StepReview({ form, onEdit }) {
  const service = services.find((s) => s.id === form.serviceId)
  const doctor = doctors.find((d) => d.id === form.doctorId)

  if (!service || !doctor || !form.date || !form.time) return null

  const rows = [
    { label: 'Layanan', value: service.name, step: 0 },
    { label: 'Dokter', value: `${doctor.name} · ${doctor.specialty}`, step: 1 },
    { label: 'Tanggal', value: formatDateLong(form.date), step: 2 },
    { label: 'Jam', value: `${displayTime(form.time)} WIB`, step: 2 },
    { label: 'Nama', value: form.patient.name.trim(), step: 3 },
    { label: 'WhatsApp', value: form.patient.phone.trim(), step: 3 },
    { label: 'Catatan', value: form.patient.note.trim() || '—', step: 3 },
  ]

  return (
    <div>
      <h2 className="font-serif text-2xl text-forest">Tinjau permintaan</h2>
      <p className="mt-1 text-sm text-muted">
        Periksa kembali sebelum diajukan. Kamu masih bisa mengubah tiap bagian.
      </p>

      <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-x-4 px-4 py-3.5 sm:grid-cols-[7rem_1fr_auto] sm:px-5"
          >
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="min-w-0 break-words font-medium text-charcoal">{row.value}</dd>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              aria-label={`Ubah ${row.label}`}
              className="text-sm text-forest underline decoration-line underline-offset-4 transition-colors hover:decoration-forest"
            >
              Ubah
            </button>
          </div>
        ))}

        <div className="flex items-baseline justify-between bg-ivory px-4 py-4 sm:px-5">
          <dt className="text-sm text-muted">Perkiraan biaya</dt>
          <dd className="font-serif text-2xl text-forest">{formatRupiah(service.price)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm text-muted">
        Harga bersifat indikatif untuk demo. Permintaan ini belum dikirim ke klinik nyata. Setelah
        diajukan, kamu mendapat kartu antrian demo dan bisa melanjutkan lewat WhatsApp.
      </p>
    </div>
  )
}