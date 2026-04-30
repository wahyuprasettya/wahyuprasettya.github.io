export default function PageShell({ children, compact = false }) {
  return (
    <main className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${compact ? 'py-16' : 'py-20 sm:py-24'}`}>
      {children}
    </main>
  )
}
