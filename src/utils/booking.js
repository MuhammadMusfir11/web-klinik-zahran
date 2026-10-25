import { services } from '../data/services'
import { doctors } from '../data/doctors'

const SLOT_MINUTES = 30

const pad = (n) => String(n).padStart(2, '0')

export const toDateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const fromDateKey = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const toTime = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`

export const displayTime = (t) => t.replace(':', '.')

// Hash sederhana supaya slot "terisi" selalu sama untuk dokter + tanggal + jam yang sama.
// Ini SIMULASI, bukan data nyata.
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export const isSlotTaken = (doctorId, dateKey, time) =>
  hash(`${doctorId}|${dateKey}|${time}`) % 100 < 28

// Daftar jam praktik dokter pada satu tanggal (tiap 30 menit).
export function getSlots(doctor, dateKey, now = new Date()) {
  const date = fromDateKey(dateKey)
  const entry = doctor.schedule.find((s) => s.day === date.getDay())
  if (!entry) return []

  const isToday = dateKey === toDateKey(now)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const slots = []

  for (
    let m = toMinutes(entry.start);
    m + SLOT_MINUTES <= toMinutes(entry.end);
    m += SLOT_MINUTES
  ) {
    // Hari ini: sembunyikan jam yang sudah lewat atau kurang dari 30 menit lagi
    if (isToday && m <= nowMinutes + 30) continue
    const time = toTime(m)
    slots.push({ time, taken: isSlotTaken(doctor.id, dateKey, time) })
  }
  return slots
}

// 14 hari ke depan; tanggal "available" hanya jika dokter praktik dan masih ada slot kosong.
export function getUpcomingDays(doctor, count = 14, now = new Date()) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    const key = toDateKey(date)
    const available = getSlots(doctor, key, now).some((s) => !s.taken)
    return { key, date, available }
  })
}

export const formatDateLong = (key) =>
  new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fromDateKey(key))

export const weekdayShort = (date) =>
  new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date)

export const monthLabel = (date) =>
  new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date)

// Validasi data pasien. Mengembalikan objek error (kosong = valid).
export function validatePatient({ name, phone }) {
  const errors = {}

  if (name.trim().length < 3) {
    errors.name = 'Nama lengkap wajib diisi (minimal 3 huruf).'
  }

  const digits = phone.replace(/\D/g, '')
  if (!digits) {
    errors.phone = 'Nomor WhatsApp wajib diisi.'
  } else if (!/^(08\d{8,11}|628\d{8,11})$/.test(digits)) {
    errors.phone = 'Gunakan nomor Indonesia yang valid, contoh 0812 3456 7890.'
  }

  return errors
}

// 0812... -> 62812...
export function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits
}

export const formatWeekday = (key) =>
  new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(fromDateKey(key))

export const formatDateOnly = (key) =>
  new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fromDateKey(key))

// Pemeriksaan ulang SEBELUM kartu dibuat: layanan, dokter, jadwal, dan data diri.
// Mengembalikan { step, message } kalau ada masalah, atau null kalau semuanya valid.
export function validateBooking(form, now = new Date()) {
  const service = services.find((s) => s.id === form.serviceId)
  if (!service) return { step: 0, message: 'Pilih layanan terlebih dahulu.' }

  const doctor = doctors.find((d) => d.id === form.doctorId && d.serviceIds.includes(service.id))
  if (!doctor) return { step: 1, message: 'Pilih dokter terlebih dahulu.' }

  const slot = form.date
    ? getSlots(doctor, form.date, now).find((s) => s.time === form.time)
    : null
  if (!slot || slot.taken) {
    return {
      step: 2,
      message: 'Jadwal yang dipilih sudah tidak tersedia. Silakan pilih tanggal dan jam lain.',
    }
  }

  if (Object.keys(validatePatient(form.patient)).length > 0) {
    return { step: 3, message: 'Lengkapi data diri dengan benar sebelum melanjutkan.' }
  }

  return null
}

// Membuat kartu antrian SIMULASI.
// Nomor antrian = huruf dokter + urutan slot pada hari itu (jam lebih awal = nomor lebih kecil).
export function createTicket(form) {
  const service = services.find((s) => s.id === form.serviceId)
  const doctor = doctors.find((d) => d.id === form.doctorId)

  // Daftar slot lengkap satu hari (memakai tanggal lampau agar tidak ada slot yang disaring)
  const allSlots = getSlots(doctor, form.date, new Date(2000, 0, 1))
  const index = allSlots.findIndex((s) => s.time === form.time)

  const queueNumber = `${doctor.prefix}-${String(index + 1).padStart(3, '0')}`
  const arriveBy = toTime(toMinutes(form.time) - 15)

  const code =
    'SSK-' +
    hash(`${doctor.id}|${form.date}|${form.time}|${form.patient.name.trim().toLowerCase()}`)
      .toString(36)
      .toUpperCase()
      .padStart(4, '0')
      .slice(0, 4)

  return {
    code,
    queueNumber,
    dateKey: form.date,
    time: form.time,
    arriveBy,
    service,
    doctor,
    patient: {
      name: form.patient.name.trim(),
      phone: form.patient.phone.trim(),
      note: form.patient.note.trim(),
    },
  }
}

// Link WhatsApp click-to-chat dengan pesan yang sudah terisi dan di-encode.
export function buildWhatsAppUrl(clinic, ticket) {
  const lines = [
    `Halo ${clinic.name}, saya ingin mengajukan janji konsultasi (simulasi demo portofolio).`,
    '',
    `Nama: ${ticket.patient.name}`,
    `WhatsApp: +${normalizePhone(ticket.patient.phone)}`,
    `Layanan: ${ticket.service.name}`,
    `Dokter: ${ticket.doctor.name}`,
    `Jadwal: ${formatDateLong(ticket.dateKey)}, ${displayTime(ticket.time)} WIB`,
    `Nomor antrian: ${ticket.queueNumber}`,
    `Kode permintaan: ${ticket.code}`,
  ]

  if (ticket.patient.note) lines.push(`Catatan: ${ticket.patient.note}`)

  lines.push('', 'Mohon konfirmasi ketersediaan jadwal. Terima kasih.')

  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}