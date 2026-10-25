const files = import.meta.glob('../assets/galeri/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const prettify = (filename) => {
  const text = filename
    .replace(/\.\w+$/, '')
    .replace(/^\d+[-_\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Foto klinik'
}

export const galleryPhotos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, alt: prettify(path.split('/').pop()) }))