import { Link } from 'react-router-dom'
import { Check, MessageCircle } from 'lucide-react'
import { clinic } from '../../data/clinic'
import {
  buildWhatsAppUrl,
  formatWeekday,
  formatDateOnly,
  displayTime,
} from '../../utils/booking'

export default function Ticket({ ticket, onReset }) {
  const waUrl = buildWhatsAppUrl(clinic, ticket)

  return (
    <div>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-ivory">
        <Check size={20} aria-hidden="true" />
      </span>

      <h1 className="mt-5 font-serif text-3xl text-forest sm:text-4xl">
        Permintaan janji berhasil disiapkan.
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Silakan lanjutkan ke WhatsApp untuk mengirim permintaan Anda kepada klinik. Jadwal belum
        dikonfirmasi oleh pihak klinik.
      </p>

      {/* Kartu antrian */}
      <article
        aria-label="Kartu antrian"
        className="mx-auto mt-10 max-w-md rounded-2xl border border-line bg-white shadow-sm"
      >
        <header className="flex items-center justify-between px-6 pt-6 text-xs font-medium uppercase tracking-wider text-muted">
          <span>{clinic.name}</span>
          <span>Kartu antrian · demo</span>
        </header>

        <div className="px-6 pb-8 pt-6 text-center">
          <p className="text-sm text-muted">Nomor antrian</p>
          <p className="mt-1 font-serif text-7xl leading-none text-ember sm:text-8xl">
            {ticket.queueNumber}
          </p>
        </div>

        {/* Garis sobekan */}
        <div className="relative border-t border-dashed border-line">
          <span
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-ivory"
          />
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-ivory"
          />
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 px-6 py-6 text-sm">
          <div>
            <dt className="text-muted">Hari</dt>
            <dd className="mt-0.5 text-base font-medium capitalize text-charcoal">
              {formatWeekday(ticket.dateKey)}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Tanggal</dt>
            <dd className="mt-0.5 text-base font-medium text-charcoal">
              {formatDateOnly(ticket.dateKey)}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Jam</dt>
            <dd className="mt-0.5 text-base font-medium text-charcoal">
              {displayTime(ticket.time)} WIB
            </dd>
          </div>
          <div>
            <dt className="text-muted">Datang sebelum</dt>
            <dd className="mt-0.5 text-base font-medium text-charcoal">
              {displayTime(ticket.arriveBy)} WIB
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Diperiksa oleh</dt>
            <dd className="mt-0.5 text-base font-medium text-charcoal">
              {ticket.doctor.name}
              <span className="font-normal text-muted"> · {ticket.doctor.specialty}</span>
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Layanan</dt>
            <dd className="mt-0.5 text-base font-medium text-charcoal">{ticket.service.name}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Nama pasien</dt>
            <dd className="mt-0.5 break-words text-base font-medium text-charcoal">
              {ticket.patient.name}
            </dd>
          </div>
        </dl>

        <footer className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 text-xs text-muted">
          <span>
            Kode permintaan <span className="font-medium text-charcoal">{ticket.code}</span>
          </span>
          <span>Belum dikonfirmasi</span>
        </footer>
      </article>

      {/* Aksi */}
      <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-medium text-ivory transition-colors hover:bg-forest-dark"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Lanjutkan ke WhatsApp
        </a>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-full border border-line px-5 py-2.5 font-medium text-charcoal transition-colors hover:border-forest"
          >
            Buat janji baru
          </button>
          <Link
            to="/"
            className="flex-1 rounded-full border border-line px-5 py-2.5 text-center font-medium text-charcoal transition-colors hover:border-forest"
          >
            Ke Home
          </Link>
        </div>

        <p className="text-center text-xs text-muted">
          Simpan kartu ini dengan screenshot. Kartu tidak tersimpan jika halaman dimuat ulang.
        </p>
      </div>
    </div>
  )
}