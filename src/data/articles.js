const author = 'Tim Editorial Sehat Sentosa (fiktif)'

export const articles = [
  {
    slug: 'menyiapkan-diri-sebelum-konsultasi',
    category: 'Panduan pasien',
    date: '2026-10-12',
    title: 'Menyiapkan diri sebelum konsultasi dengan dokter',
    excerpt:
      'Beberapa catatan sederhana membuat waktu konsultasi lebih terarah, dari daftar keluhan sampai pertanyaan yang ingin diajukan.',
    author,
    body: [
      {
        p: 'Waktu konsultasi biasanya singkat, sehingga persiapan kecil di rumah dapat membantu percakapan dengan dokter berjalan lebih terarah.',
      },
      { h: 'Catat keluhan dengan jelas' },
      {
        p: 'Tuliskan apa yang dirasakan, sejak kapan, dan apa yang membuatnya membaik atau memburuk. Catatan singkat lebih mudah diandalkan daripada mengingat semuanya di ruang periksa.',
      },
      { h: 'Bawa informasi yang relevan' },
      {
        ul: [
          'Daftar obat, vitamin, atau suplemen yang sedang dikonsumsi',
          'Hasil pemeriksaan sebelumnya, bila ada',
          'Riwayat alergi yang pernah dialami',
        ],
      },
      { h: 'Siapkan pertanyaan' },
      {
        p: 'Tulis dua atau tiga pertanyaan terpenting, misalnya tentang kemungkinan penyebab keluhan, pemeriksaan lanjutan, atau tanda yang perlu diwaspadai sebelum kontrol berikutnya.',
      },
      { h: 'Datang sedikit lebih awal' },
      {
        p: 'Kartu antrian di klinik ini menyarankan datang sekitar 15 menit sebelum jadwal, supaya ada waktu untuk pendaftaran tanpa terburu-buru.',
      },
    ],
    sources: [],
  },
  {
    slug: 'dasar-menjaga-kesehatan-gigi',
    category: 'Kesehatan gigi',
    date: '2026-09-28',
    title: 'Dasar-dasar menjaga kesehatan gigi di rumah',
    excerpt:
      'Kebiasaan sederhana yang dilakukan konsisten, dari menyikat gigi sampai kontrol berkala, menjadi fondasi kesehatan mulut.',
    author,
    body: [
      {
        p: 'Sebagian besar perawatan gigi sehari-hari terjadi di rumah, bukan di ruang praktik. Berikut kebiasaan dasar yang umum dianjurkan organisasi kesehatan gigi.',
      },
      { h: 'Menyikat gigi dua kali sehari' },
      {
        p: 'Menyikat gigi dua kali sehari dengan pasta gigi berfluoride umum dianjurkan. Sikat seluruh permukaan gigi selama sekitar dua menit.',
      },
      { h: 'Membersihkan sela gigi' },
      {
        p: 'Sikat gigi tidak selalu menjangkau sela di antara gigi. Benang gigi atau sikat khusus sela gigi dapat membantu membersihkannya.',
      },
      { h: 'Mengganti sikat gigi secara berkala' },
      {
        p: 'Sikat gigi umumnya dianjurkan diganti sekitar tiga bulan sekali, atau lebih cepat bila bulunya sudah mengembang.',
      },
      { h: 'Tetap melakukan kontrol' },
      {
        p: 'Pemeriksaan berkala memungkinkan dokter gigi melihat masalah sejak dini. Frekuensi yang tepat berbeda pada tiap orang dan sebaiknya dibicarakan dengan dokter gigi.',
      },
    ],
    sources: [
      { name: 'FDI World Dental Federation', url: 'https://www.fdiworlddental.org' },
      { name: 'American Dental Association', url: 'https://www.ada.org' },
    ],
  },
  {
    slug: 'membaca-angka-tekanan-darah',
    category: 'Pemeriksaan',
    date: '2026-09-14',
    title: 'Membaca angka tekanan darah: dua angka, satu gambaran',
    excerpt:
      'Hasil pengukuran tekanan darah terdiri dari dua angka. Ini arti masing-masing, dan mengapa dokter menilainya dalam konteks.',
    author,
    body: [
      {
        p: 'Hasil pengukuran tekanan darah ditulis sebagai dua angka, misalnya 120/80 mmHg.',
      },
      { h: 'Dua angka, dua arti' },
      {
        ul: [
          'Angka pertama (sistolik) menggambarkan tekanan pada pembuluh darah saat jantung berkontraksi.',
          'Angka kedua (diastolik) menggambarkan tekanan saat jantung beristirahat di antara denyutan.',
        ],
      },
      { h: 'Satu hasil belum tentu cukup' },
      {
        p: 'Tekanan darah dapat berubah sepanjang hari, misalnya karena aktivitas, rasa cemas, atau kafein. Karena itu dokter biasanya menilai pengukuran yang berulang, bukan satu angka saja.',
      },
      { h: 'Tafsirkan bersama dokter' },
      {
        p: 'Batas dan target tekanan darah dapat berbeda tergantung usia dan kondisi kesehatan seseorang. Jika hasil pengukuranmu terasa tidak biasa, bicarakan dengan dokter dan jangan menyimpulkan sendiri.',
      },
    ],
    sources: [
      { name: 'World Health Organization', url: 'https://www.who.int' },
      { name: 'Kementerian Kesehatan RI', url: 'https://www.kemkes.go.id' },
    ],
  },
  {
    slug: 'jadwal-dan-biaya-yang-terbuka',
    category: 'Tentang klinik',
    date: '2026-08-30',
    title: 'Mengapa jadwal dan biaya sebaiknya dibuka sejak awal',
    excerpt:
      'Informasi yang jelas sebelum datang mengurangi kebingungan, dan itu bagian dari cara kami memikirkan pengalaman pasien.',
    author,
    body: [
      {
        p: 'Sehat Sentosa adalah klinik konsep untuk portofolio. Salah satu gagasan yang ingin ditunjukkan: pasien sebaiknya tahu apa yang diharapkan sebelum melangkah ke klinik.',
      },
      { h: 'Jadwal yang bisa dilihat' },
      {
        p: 'Hari dan jam praktik tiap dokter ditampilkan di website, sehingga pasien dapat memilih waktu yang cocok tanpa harus bertanya terlebih dahulu.',
      },
      { h: 'Biaya yang tidak mengejutkan' },
      {
        p: 'Perkiraan biaya setiap layanan tampil sejak awal. Pada klinik nyata, angka tersebut tentu perlu diverifikasi, tetapi prinsipnya sama: tidak ada kejutan di meja pembayaran.',
      },
      { h: 'Alur yang sederhana' },
      {
        p: 'Dari memilih layanan sampai menerima kartu antrian, alur booking dibuat singkat dan jelas. Permintaan janji tetap dikonfirmasi oleh pihak klinik, bukan diasumsikan otomatis.',
      },
    ],
    sources: [],
  },
]

// Perkiraan waktu baca (sekitar 200 kata per menit)
export function readingMinutes(article) {
  const words = article.body
    .flatMap((block) => (block.h ? [block.h] : block.p ? [block.p] : (block.ul ?? [])))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}