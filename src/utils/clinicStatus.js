import { openingHours } from '../data/clinic'

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const dayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
const fmt = (time) => time.replace(':', '.')

export function getClinicStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)

  const get = (type) => parts.find((p) => p.type === type)?.value
  const day = dayIndex[get('weekday')]
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const today = openingHours[day]

  if (today) {
    const open = toMinutes(today.open)
    const close = toMinutes(today.close)

    if (minutes >= open && minutes < close) {
      return { isOpen: true, label: 'Buka sekarang', detail: `sampai ${fmt(today.close)} WIB` }
    }
    if (minutes < open) {
      return { isOpen: false, label: 'Tutup', detail: `buka hari ini pukul ${fmt(today.open)} WIB` }
    }
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const hours = openingHours[d]
    if (hours) {
      const when = i === 1 ? 'besok' : dayNames[d]
      return { isOpen: false, label: 'Tutup', detail: `buka ${when} pukul ${fmt(hours.open)} WIB` }
    }
  }

  return { isOpen: false, label: 'Tutup', detail: '' }
}