import { openingHours } from '../data/clinic'

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const fmt = (t) => t.replace(':', '.')

// Hari berurutan dengan jam sama digabung:
// [{ days: 'Senin–Jumat', hours: '08.00–20.00 WIB' }, { days: 'Minggu', hours: 'Tutup' }]
export function hoursLines() {
  const runs = []

  ;[1, 2, 3, 4, 5, 6, 0].forEach((day) => {
    const h = openingHours[day]
    const hours = h ? `${fmt(h.open)}–${fmt(h.close)} WIB` : null
    const last = runs[runs.length - 1]

    if (last && last.hours === hours) last.days.push(day)
    else runs.push({ hours, days: [day] })
  })

  return runs.map(({ hours, days }) => ({
    days:
      days.length > 1
        ? `${dayNames[days[0]]}–${dayNames[days[days.length - 1]]}`
        : dayNames[days[0]],
    hours: hours ?? 'Tutup',
  }))
}

// "Senin–Jumat 08.00–20.00 WIB, Sabtu 08.00–14.00 WIB, Minggu tutup"
export function hoursSummary() {
  return hoursLines()
    .map(({ days, hours }) => (hours === 'Tutup' ? `${days} tutup` : `${days} ${hours}`))
    .join(', ')
}