import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass overflow-hidden rounded-lg shadow-glow"
    >
      <img
        src={project.image}
        alt={`Preview project ${project.title}`}
        loading="lazy"
        className="h-52 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{project.description}</p>
        <a
          href={project.link}
          className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-600 transition hover:text-ember dark:text-ion"
          target="_blank"
          rel="noreferrer"
        >
          View project
        </a>
      </div>
    </motion.article>
  )
}
