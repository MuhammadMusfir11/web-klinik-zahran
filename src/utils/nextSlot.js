import { doctors } from '../data/doctors'
import { getSlots, toDateKey, formatWeekday } from './booking'

const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function getNextSlot(now = new Date()) {
  for (let i = 0; i < 14; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    const dateKey = toDateKey(date)
    let best = null

    for (const doctor of doctors) {
      const slot = getSlots(doctor, dateKey, now).find((s) => !s.taken)
      if (slot && (!best || toMinutes(slot.time) < toMinutes(best.slot.time))) {
        best = { doctor, slot }
      }
    }

    if (best) {
      // Nomor antrian dihitung sama seperti pada kartu antrian di halaman booking
      const full = getSlots(best.doctor, dateKey, new Date(2000, 0, 1))
      const index = full.findIndex((s) => s.time === best.slot.time)

      return {
        dateKey,
        date,
        time: best.slot.time,
        doctor: best.doctor,
        serviceId: best.doctor.serviceIds[0],
        queueNumber: `${best.doctor.prefix}-${String(index + 1).padStart(3, '0')}`,
        dayLabel: i === 0 ? 'Hari ini' : i === 1 ? 'Besok' : formatWeekday(dateKey),
      }
    }
  }

  return null
}