export const services = [
  {
    id: 'konsultasi-umum',
    name: 'Konsultasi Dokter Umum',
    description: 'Pemeriksaan keluhan sehari-hari dan rujukan bila diperlukan.',
    purpose:
      'Pemeriksaan awal untuk keluhan sehari-hari, termasuk menentukan langkah berikutnya atau rujukan bila diperlukan.',
    suitableFor: [
      'Demam, batuk, dan pilek',
      'Sakit kepala atau pusing',
      'Mual atau nyeri perut',
      'Badan terasa tidak enak tanpa sebab yang jelas',
    ],
    price: 75000,
    duration: 30,
  },
  {
    id: 'cek-kesehatan',
    name: 'Cek Kesehatan Dasar',
    description: 'Pemeriksaan fisik dasar, tekanan darah, dan konsultasi hasil.',
    purpose:
      'Gambaran awal kondisi tubuh lewat pemeriksaan fisik dasar dan pengukuran tekanan darah, lengkap dengan penjelasan hasilnya.',
    suitableFor: [
      'Pemantauan kesehatan berkala',
      'Ingin tahu kondisi tubuh sebelum mulai olahraga rutin',
      'Belum pernah memeriksakan diri dalam waktu lama',
    ],
    price: 180000,
    duration: 45,
  },
  {
    id: 'konsultasi-anak',
    name: 'Konsultasi Anak',
    description: 'Pemantauan tumbuh kembang dan keluhan kesehatan anak.',
    purpose:
      'Pemantauan tumbuh kembang dan penanganan keluhan kesehatan pada anak, dengan penjelasan yang mudah dipahami orang tua.',
    suitableFor: [
      'Demam atau batuk pilek pada anak',
      'Nafsu makan anak menurun',
      'Pertanyaan seputar tumbuh kembang',
      'Konsultasi jadwal imunisasi',
    ],
    price: 125000,
    duration: 30,
  },
  {
    id: 'konsultasi-gigi',
    name: 'Konsultasi Gigi',
    description: 'Pemeriksaan gigi dan mulut serta rencana perawatan.',
    purpose:
      'Pemeriksaan gigi dan mulut oleh dokter gigi, disertai penjelasan rencana perawatan secara bertahap.',
    suitableFor: [
      'Gigi berlubang atau terasa ngilu',
      'Sakit gigi',
      'Gusi mudah berdarah atau bengkak',
      'Pemeriksaan gigi rutin',
    ],
    price: 100000,
    duration: 30,
  },
  {
    id: 'karang-gigi',
    name: 'Pembersihan Karang Gigi',
    description: 'Pembersihan karang gigi oleh dokter gigi.',
    purpose:
      'Pembersihan karang gigi oleh dokter gigi untuk membantu menjaga kebersihan mulut dan kesehatan gusi.',
    suitableFor: [
      'Karang gigi terlihat atau terasa menumpuk',
      'Gusi mudah berdarah saat menyikat gigi',
      'Pembersihan berkala sesuai anjuran dokter gigi',
    ],
    price: 250000,
    duration: 45,
  },
  {
    id: 'konsultasi-kulit',
    name: 'Konsultasi Kulit',
    description: 'Konsultasi keluhan kulit dan perawatan yang sesuai.',
    purpose:
      'Konsultasi keluhan kulit dan pilihan perawatan yang sesuai dengan kondisi kulitmu.',
    suitableFor: [
      'Jerawat',
      'Gatal atau ruam',
      'Kulit kering atau mudah iritasi',
      'Perubahan pada kulit yang ingin diperiksakan',
    ],
    price: 150000,
    duration: 30,
  },
  {
    id: 'konsultasi-gizi',
    name: 'Konsultasi Gizi',
    description: 'Diskusi pola makan dan kebutuhan gizi harian.',
    purpose:
      'Diskusi pola makan dan kebutuhan gizi harian yang disesuaikan dengan kondisi dan kebiasaanmu.',
    suitableFor: [
      'Ingin mengatur pola makan harian',
      'Menyusun menu yang seimbang',
      'Pertanyaan gizi untuk anak atau keluarga',
    ],
    price: 110000,
    duration: 40,
  },
]