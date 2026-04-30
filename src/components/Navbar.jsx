import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/blog', label: 'Blog' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' }
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link to="/" className="group flex items-center gap-3 font-bold tracking-wide">
          <span className="h-3 w-3 rounded-full bg-ion shadow-glow transition group-hover:bg-ember" aria-hidden="true" />
          <span className="glow-text">Wahyu adjie prasetyo</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-2.5 py-2 text-sm font-medium transition sm:px-3 ${
                  isActive
                    ? 'text-ion'
                    : 'text-slate-300 hover:text-ion'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
