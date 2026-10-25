import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { articles, readingMinutes } from '../data/articles'
import { formatDateOnly } from '../utils/booking'

export default function Articles() {
  const [featured, ...rest] = articles

  return (
    <section id="artikel" className="border-t border-line px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-ember">Artikel</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
            Bacaan singkat seputar kesehatan.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Artikel demo dengan isi umum, bukan pengganti konsultasi dengan tenaga kesehatan.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Artikel utama */}
          <Link
            to={`/artikel/${featured.slug}`}
            className="group block border-t-2 border-forest pt-6 lg:col-span-7"
          >
            <p className="flex items-center gap-3 text-sm">
              <span className="font-medium text-ember">{featured.category}</span>
              <span className="text-muted">{formatDateOnly(featured.date)}</span>
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-forest underline decoration-transparent decoration-2 underline-offset-8 transition-colors group-hover:decoration-forest sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
              Baca artikel · {readingMinutes(featured)} menit
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </p>
          </Link>

          {/* Artikel lainnya */}
          <div className="border-b border-line lg:col-span-5">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={`/artikel/${article.slug}`}
                className="group block border-t border-line py-6 first:border-t-2 first:border-forest"
              >
                <p className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-ember">{article.category}</span>
                  <span className="text-muted">{formatDateOnly(article.date)}</span>
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-forest transition-colors group-hover:text-forest-dark">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Baca · {readingMinutes(article)} menit
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}