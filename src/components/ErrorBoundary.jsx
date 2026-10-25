import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-serif text-3xl text-forest">Halaman ini mengalami kesalahan</h1>
        <p className="mt-3 text-muted">
          Coba kembali ke beranda. Kalau masih terjadi, kirim tulisan di kotak di bawah ini.
        </p>
        <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-xl bg-mist p-4 text-sm text-charcoal">
          {String(this.state.error?.message ?? this.state.error)}
        </pre>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 font-medium text-ivory"
        >
          Kembali ke beranda
        </a>
      </main>
    )
  }
}