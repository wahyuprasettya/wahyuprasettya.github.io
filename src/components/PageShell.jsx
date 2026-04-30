import { useState } from 'react'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function PageShell({ children, compact = false }) {
  const data = usePortfolioData()
  const currentYear = new Date().getFullYear()
  const [showCopyrightRules, setShowCopyrightRules] = useState(false)

  return (
    <main className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${compact ? 'py-16' : 'py-20 sm:py-24'}`}>
      {children}
      <footer className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
        <button
          type="button"
          onClick={() => setShowCopyrightRules(true)}
          className="transition hover:text-cyan-200"
        >
          &copy; {currentYear} {data.profile.name}. All rights reserved.
        </button>
      </footer>

      {showCopyrightRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-[#020617] p-6 shadow-[0_26px_80px_rgba(2,6,23,0.72)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Copyright Rules</p>
                <h2 className="mt-3 text-2xl font-extrabold text-white">Ketentuan penggunaan konten</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCopyrightRules(false)}
                className="rounded-full border border-white/15 px-3 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
              >
                Tutup
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <p>Seluruh tulisan, desain, ilustrasi, dan materi portfolio pada situs ini dilindungi hak cipta.</p>
              <p>Penggunaan ulang, penyalinan, distribusi, atau modifikasi konten untuk kepentingan publikasi maupun komersial memerlukan izin tertulis dari pemilik situs.</p>
              <p>Referensi singkat untuk kebutuhan pribadi atau evaluasi internal diperbolehkan selama tetap mencantumkan atribusi yang layak dan tidak mengubah konteks karya.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
