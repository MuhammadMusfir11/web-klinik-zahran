const photos = import.meta.glob('../assets/dokter/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

export function getDoctorPhoto(doctorId) {
  const match = Object.entries(photos).find(
    ([path]) =>
      path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '') === doctorId,
  )
  return match ? match[1] : null
}