import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Loader2, RotateCcw } from 'lucide-react'
import Stepper from '../components/booking/Stepper'
import StepService from '../components/booking/StepService'
import StepDoctor from '../components/booking/StepDoctor'
import StepSchedule from '../components/booking/StepSchedule'
import StepPatient from '../components/booking/StepPatient'
import StepReview from '../components/booking/StepReview'
import Ticket from '../components/booking/Ticket'
import { services } from '../data/services'
import { doctors } from '../data/doctors'
import { formatRupiah } from '../utils/format'
import {
  validatePatient,
  validateBooking,
  createTicket,
  formatDateLong,
  displayTime,
} from '../utils/booking'

const steps = ['Layanan', 'Dokter', 'Jadwal', 'Data diri', 'Tinjau']

const emptyForm = {
  serviceId: null,
  doctorId: null,
  date: null,
  time: null,
  patient: { name: '', phone: '', note: '' },
}

const hints = [
  'Pilih satu layanan untuk melanjutkan',
  'Pilih satu dokter untuk melanjutkan',
  'Pilih tanggal dan jam untuk melanjutkan',
]

export default function Booking() {
  // Layanan/dokter yang sudah dipilih dari halaman lain (kalau ada)
  const { state } = useLocation()
  const presetId = services.some((s) => s.id === state?.serviceId) ? state.serviceId : null
  const presetDoctorId =
    presetId &&
    doctors.some((d) => d.id === state?.doctorId && d.serviceIds.includes(presetId))
      ? state.doctorId
      : null

  const [step, setStep] = useState(presetDoctorId ? 2 : presetId ? 1 : 0)
  const [form, setForm] = useState({
    ...emptyForm,
    serviceId: presetId,
    doctorId: presetDoctorId,
  })
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [ticket, setTicket] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step, ticket])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const go = (n) => {
    setAttempted(false)
    setStep(n)
  }

  const chooseService = (serviceId) =>
    setForm((prev) =>
      prev.serviceId === serviceId
        ? prev
        : { ...prev, serviceId, doctorId: null, date: null, time: null },
    )

  const chooseDoctor = (doctorId) =>
    setForm((prev) =>
      prev.doctorId === doctorId ? prev : { ...prev, doctorId, date: null, time: null },
    )

  const chooseDate = (date) =>
    setForm((prev) => (prev.date === date ? prev : { ...prev, date, time: null }))

  const chooseTime = (time) => setForm((prev) => ({ ...prev, time }))

  const updatePatient = (field, value) =>
    setForm((prev) => ({ ...prev, patient: { ...prev.patient, [field]: value } }))

  const reset = () => {
    clearTimeout(timerRef.current)
    setForm(emptyForm)
    setTicket(null)
    setSubmitting(false)
    setSubmitError(null)
    go(0)
  }

  const errors = validatePatient(form.patient)

  const canContinue =
    [
      Boolean(form.serviceId),
      Boolean(form.doctorId),
      Boolean(form.date && form.time),
      true, // langkah data diri: divalidasi saat tombol ditekan
    ][step] ?? false

  const next = () => {
    setSubmitError(null)
    if (step === 3 && Object.keys(errors).length > 0) {
      setAttempted(true)
      return
    }
    go(step + 1)
  }

  const submit = () => {
    if (submitting) return
    setSubmitError(null)

    const problem = validateBooking(form)
    if (problem) {
      setSubmitError(problem.message)
      go(problem.step)
      return
    }

    setSubmitting(true)
    timerRef.current = setTimeout(() => {
      setTicket(createTicket(form))
      setSubmitting(false)
    }, 900)
  }

  const service = services.find((s) => s.id === form.serviceId)
  const doctor = doctors.find((d) => d.id === form.doctorId)
  const isLast = step === steps.length - 1

  if (ticket) {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
        <Ticket ticket={ticket} onReset={reset} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <p className="text-sm font-medium text-ember">Buat janji</p>
      <h1 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">
        Atur janji konsultasi Anda
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Ini adalah simulasi. Permintaan janji tidak dikonfirmasi otomatis; di akhir, Anda akan
        mendapat kartu antrian demo.
      </p>

      <div className="mt-10">
        <Stepper steps={steps} current={step} onJump={go} />
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-8 rounded-xl border border-[#a8391f]/30 bg-[#a8391f]/5 px-4 py-3 text-sm text-[#a8391f]"
        >
          {submitError}
        </p>
      )}

      {step >= 2 && step <= 3 && service && doctor && (
        <dl className="mt-8 grid gap-x-6 gap-y-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Layanan</dt>
            <dd className="mt-0.5 font-medium text-charcoal">{service.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Dokter</dt>
            <dd className="mt-0.5 font-medium text-charcoal">{doctor.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Perkiraan biaya</dt>
            <dd className="mt-0.5 font-medium text-charcoal">{formatRupiah(service.price)}</dd>
          </div>
          {step >= 3 && form.date && form.time && (
            <div>
              <dt className="text-muted">Jadwal</dt>
              <dd className="mt-0.5 font-medium text-charcoal">
                {formatDateLong(form.date)}, {displayTime(form.time)}
              </dd>
            </div>
          )}
        </dl>
      )}

      <div key={step} className="step-in mt-8">
        {step === 0 && <StepService value={form.serviceId} onChange={chooseService} />}
        {step === 1 && (
          <StepDoctor serviceId={form.serviceId} value={form.doctorId} onChange={chooseDoctor} />
        )}
        {step === 2 && (
          <StepSchedule
            doctorId={form.doctorId}
            date={form.date}
            time={form.time}
            onDate={chooseDate}
            onTime={chooseTime}
          />
        )}
        {step === 3 && (
          <StepPatient
            patient={form.patient}
            onChange={updatePatient}
            errors={errors}
            showErrors={attempted}
          />
        )}
        {step === 4 && <StepReview form={form} onEdit={go} />}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0 || submitting}
          className="rounded-full border border-line px-5 py-2.5 font-medium text-charcoal transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line"
        >
          Kembali
        </button>

        <div className="flex items-center gap-4">
          {!canContinue && hints[step] && (
            <p className="hidden text-sm text-muted sm:block">{hints[step]}</p>
          )}

          {isLast ? (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              aria-busy={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-wait disabled:opacity-80"
            >
              {submitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              {submitting ? 'Menyiapkan…' : 'Ajukan Permintaan'}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="rounded-full bg-forest px-6 py-2.5 font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
            >
              Lanjut
            </button>
          )}
        </div>
      </div>

      {form.serviceId && (
        <button
          type="button"
          onClick={reset}
          disabled={submitting}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-forest disabled:opacity-40"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Mulai ulang
        </button>
      )}
    </main>
  )
}