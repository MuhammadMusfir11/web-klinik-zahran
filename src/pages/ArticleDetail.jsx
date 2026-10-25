import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { articles, readingMinutes } from '../data/articles'
import { formatDateOnly } from '../utils/booking'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  const backLink = (
    <Link
      to="/"
      state={{ scrollTo: 'artikel' }}
      className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-dark"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Semua artikel
    </Link>
  )

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-serif text-3xl text-forest">Artikel tidak ditemukan</h1>
        <p className="mt-3 text-muted">Alamat artikel yang kamu buka tidak tersedia.</p>
        <div className="mt-6">{backLink}</div>
      </main>
    )
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <article className="mx-auto max-w-2xl">
        {backLink}

        <p className="mt-10 flex flex-wrap items-center gap-x-3 text-sm">
          <span className="font-medium text-ember">{article.category}</span>
          <span className="text-muted">{formatDateOnly(article.date)}</span>
          <span className="text-muted">{readingMinutes(article)} menit baca</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl leading-tight text-forest sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-muted">Oleh {article.author}</p>

        <div className="mt-10 border-t border-line pt-2">
          {article.body.map((block, i) => {
            if (block.h) {
              return (
                <h2 key={i} className="mt-10 font-serif text-2xl text-forest">
                  {block.h}
                </h2>
              )
            }
            if (block.ul) {
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-charcoal">
                  {block.ul.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="mt-4 text-lg leading-relaxed text-charcoal">
                {block.p}
              </p>
            )
          })}
        </div>

        {article.sources.length > 0 && (
          <aside className="mt-12 border-t border-line pt-6">
            <h2 className="text-sm font-medium text-charcoal">Rujukan umum</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-forest underline decoration-line underline-offset-4 hover:decoration-forest"
                  >
                    {s.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <p className="mt-8 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
          Artikel ini adalah konten demo portofolio dan bukan pengganti konsultasi dengan tenaga
          kesehatan.
        </p>

        {/* Artikel terkait */}
        <section aria-labelledby="related-title" className="mt-16">
          <h2 id="related-title" className="font-serif text-2xl text-forest">
            Artikel lainnya
          </h2>
          <div className="mt-4 border-b border-line">
            {related.map((a) => (
              <Link
                key={a.slug}
                to={`/artikel/${a.slug}`}
                className="group block border-t border-line py-5"
              >
                <p className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-ember">{a.category}</span>
                  <span className="text-muted">{formatDateOnly(a.date)}</span>
                </p>
                <h3 className="mt-1.5 font-serif text-xl text-forest transition-colors group-hover:text-forest-dark">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-forest px-6 py-6 text-ivory">
          <p className="max-w-sm font-serif text-xl">Punya pertanyaan untuk dokter?</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 font-medium text-forest transition-colors hover:bg-white"
          >
            Buat janji
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  )
}