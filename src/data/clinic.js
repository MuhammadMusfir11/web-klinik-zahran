export const clinic = {
  name: "Klinik Sehat Sentosa",
  shortName: "Sehat Sentosa",
  tagline: "Perawatan yang baik dimulai dari didengarkan.",
  // Ganti nomor ini sekali saja, seluruh website ikut berubah.
  // Format: kode negara tanpa +, tanpa spasi.
  whatsapp: "6282129563877",
  phone: "(021) 5550 1234",
  address: "Jl. Contoh Sehat No. 12, Jakarta (alamat fiktif untuk demo)",
  mapQuery: "Jakarta Pusat, Indonesia",
  disclaimer: "Proyek konsep portofolio. Klinik, dokter, dan jadwal pada website ini fiktif.",
}

// Jam buka per hari. Kunci 0 = Minggu, 1 = Senin, ... 6 = Sabtu.
// null berarti tutup.
export const openingHours = {
  0: null,
  1: { open: "08:00", close: "20:00" },
  2: { open: "08:00", close: "20:00" },
  3: { open: "08:00", close: "20:00" },
  4: { open: "08:00", close: "20:00" },
  5: { open: "08:00", close: "20:00" },
  6: { open: "08:00", close: "14:00" },
}