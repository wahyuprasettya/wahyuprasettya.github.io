import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="galaxy-card group relative overflow-hidden rounded-lg p-[1px] shadow-[0_22px_70px_rgba(34,211,238,0.14)]"
    >
      <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#060918]/92">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.20),transparent_26%),radial-gradient(circle_at_86%_8%,rgba(139,92,246,0.22),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_45%)] opacity-95" />
        <div className="project-stars pointer-events-none absolute inset-0 opacity-70" />

        <figure className="project-image-frame relative m-4 overflow-hidden rounded-lg border border-white/10 bg-[#071020] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#0f172a,#050816)]">
            <img
              src={project.image}
              alt={`Preview project ${project.title}`}
              loading="lazy"
              className="h-full w-full object-contain p-2 opacity-95 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
            />
          </div>
          <div className="pointer-events-none absolute inset-3 rounded-md bg-gradient-to-t from-[#060918]/50 via-transparent to-cyan-400/10" />
          <span className="absolute left-4 top-4 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ion backdrop-blur-md">
            Mission
          </span>
        </figure>

        <div className="relative p-6 pt-3">
          <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
          <h3 className="glow-text text-2xl font-extrabold tracking-wide text-white">{project.title}</h3>
          <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-300">{project.description}</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_18px_rgba(249,115,22,0.85)]" aria-hidden="true" />
            <a
              href={project.link}
              className="inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-ion transition hover:border-orange-300/60 hover:bg-orange-300/10 hover:text-orange-200"
              target="_blank"
              rel="noreferrer"
            >
              View project
              <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
