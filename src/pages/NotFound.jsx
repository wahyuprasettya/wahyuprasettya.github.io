import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="404 | Wahyu adjie prasetyo Portfolio" description="Halaman tidak ditemukan." path="/404" />
      <PageShell compact>
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">404</p>
          <h1 className="glow-text mt-4 text-5xl font-extrabold">Lost in orbit</h1>
          <p className="mt-5 text-slate-700 dark:text-slate-300">Halaman yang kamu cari tidak tersedia.</p>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
            Back home
          </Link>
        </section>
      </PageShell>
    </>
  )
}
