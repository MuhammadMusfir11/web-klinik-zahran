import { useMemo } from 'react'
import { doctors } from '../../data/doctors'
import { scheduleSummary } from '../../utils/format'
import {
  getUpcomingDays,
  getSlots,
  weekdayShort,
  monthLabel,
  formatDateLong,
  displayTime,
} from '../../utils/booking'

export default function StepSchedule({ doctorId, date, time, onDate, onTime }) {
  const doctor = doctors.find((d) => d.id === doctorId)
  const days = useMemo(() => (doctor ? getUpcomingDays(doctor) : []), [doctor])

  if (!doctor) return null

  const slots = date ? getSlots(doctor, date) : []

  const first = days[0].date
  const last = days[days.length - 1].date
  const range =
    first.getMonth() === last.getMonth()
      ? `${monthLabel(first)} ${first.getFullYear()}`
      : `${monthLabel(first)} – ${monthLabel(last)} ${last.getFullYear()}`

  return (
    <div>
      <h2 className="font-serif text-2xl text-forest">Pilih tanggal & jam</h2>
      <p className="mt-1 text-sm text-muted">
        Jadwal praktik {doctor.name}: {scheduleSummary(doctor.schedule).join(' / ')}
      </p>

      {/* Tanggal */}
      <fieldset className="mt-6 min-w-0">
        <legend className="flex w-full items-baseline justify-between">
          <span className="font-medium text-charcoal">Tanggal</span>
          <span className="text-sm text-muted">{range}</span>
        </legend>

        <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
          {days.map((day) => {
            const selected = date === day.key

            return (
              <label
                key={day.key}
                className={`relative block ${day.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <input
                  type="radio"
                  name="date"
                  value={day.key}
                  checked={selected}
                  disabled={!day.available}
                  onChange={() => onDate(day.key)}
                  aria-label={`${formatDateLong(day.key)}${day.available ? '' : ', tidak tersedia'}`}
                  className="peer sr-only"
                />
                <span
                  className={`flex flex-col items-center rounded-xl border py-2.5 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest ${
                    selected
                      ? 'border-forest bg-forest text-ivory'
                      : day.available
                        ? 'border-line bg-white text-charcoal hover:border-forest'
                        : 'border-transparent text-muted/40'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wide opacity-80">
                    {weekdayShort(day.date)}
                  </span>
                  <span className="mt-0.5 text-lg font-medium leading-none">
                    {day.date.getDate()}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-muted">
          Tanggal yang redup berada di luar jadwal praktik atau slotnya sudah penuh.
        </p>
      </fieldset>

      {/* Jam */}
      <fieldset className="mt-8 min-w-0">
        <legend className="font-medium text-charcoal">Jam</legend>

        {!date ? (
          <p className="mt-3 text-sm text-muted">Pilih tanggal dulu untuk melihat jam praktik.</p>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">{formatDateLong(date)}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const selected = time === slot.time

                return (
                  <label
                    key={slot.time}
                    className={`relative block ${slot.taken ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={slot.time}
                      checked={selected}
                      disabled={slot.taken}
                      onChange={() => onTime(slot.time)}
                      aria-label={`${displayTime(slot.time)}${slot.taken ? ', sudah terisi' : ''}`}
                      className="peer sr-only"
                    />
                    <span
                      className={`block rounded-xl border py-2.5 text-center text-sm font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest ${
                        selected
                          ? 'border-forest bg-forest text-ivory'
                          : slot.taken
                            ? 'border-transparent text-muted/40 line-through'
                            : 'border-line bg-white text-charcoal hover:border-forest'
                      }`}
                    >
                      {displayTime(slot.time)}
                    </span>
                  </label>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted">
              Ketersediaan slot adalah simulasi dan tidak mencerminkan jadwal klinik sungguhan.
            </p>
          </>
        )}
      </fieldset>
    </div>
  )
}