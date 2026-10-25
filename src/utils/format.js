const dayShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const fmtTime = (t) => t.replace(':', '.')

export const formatRupiah = (amount) =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(amount)

export const formatDuration = (minutes) => `${minutes} menit`

// Mengubah jadwal dokter menjadi baris teks yang ringkas.
// Hari dengan jam yang sama digabung: "Sen, Rab, Jum · 09.00–15.00"
export function scheduleSummary(schedule) {
  const groups = new Map()

  schedule.forEach(({ day, start, end }) => {
    const range = `${fmtTime(start)}–${fmtTime(end)}`
    groups.set(range, [...(groups.get(range) ?? []), day])
  })

  const mondayFirst = (d) => (d + 6) % 7

  return [...groups].map(([range, days]) => {
    const names = days
      .sort((a, b) => mondayFirst(a) - mondayFirst(b))
      .map((d) => dayShort[d])
      .join(', ')
    return `${names} · ${range}`
  })
}