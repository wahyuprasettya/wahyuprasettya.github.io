import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function Home() {
  const data = usePortfolioData()
  const featuredProjects = data.projects.slice(0, 2)

  return (
    <>
      <Seo
        title="Wahyu adjie prasetyo Portfolio | React & Three.js Developer"
        description={data.profile.bio}
        path="/"
      />
      <PageShell>
        <section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-600 dark:text-ion">Space-grade portfolio</p>
            <h1 className="glow-text mt-5 max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              {data.home.heroName}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">{data.profile.bio}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
                Explore Projects
              </Link>
              <Link to="/about" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold transition hover:border-cyan-400 dark:border-white/20">
                About Me
              </Link>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass overflow-hidden rounded-lg shadow-violet"
          >
            <img
              src={data.profile.image}
              alt={`Potret visual galaksi untuk ${data.profile.name}`}
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.figure>
        </section>

        <SectionReveal className="py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">Featured</p>
              <h2 className="mt-3 text-3xl font-bold">Selected Missions</h2>
            </div>
            <Link to="/projects" className="text-sm font-semibold text-cyan-600 dark:text-ion">All projects</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </SectionReveal>
      </PageShell>
    </>
  )
}
