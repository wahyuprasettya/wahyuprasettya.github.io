import { useEffect, useState } from 'react'

const cookieConsentKey = 'portfolio-cookie-consent'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(cookieConsentKey)
    setVisible(!accepted)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(cookieConsentKey, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto w-auto max-w-2xl rounded-2xl border border-cyan-300/20 bg-[#07111f]/94 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:inset-x-6 sm:bottom-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200 sm:text-sm">Cookie Notice</p>
          <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-[0.95rem]">
            Situs ini menggunakan cookies dan penyimpanan browser lokal untuk menyimpan preferensi, data admin lokal, dan pengalaman penggunaan yang lebih stabil.
          </p>
        </div>
        <button
          type="button"
          onClick={acceptCookies}
          className="min-h-11 w-full shrink-0 rounded-full bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-300 sm:w-auto sm:min-w-[10rem] sm:px-5 sm:py-2.5"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  )
}
