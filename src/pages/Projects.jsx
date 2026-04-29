import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function Projects() {
  const data = usePortfolioData()

  return (
    <>
      <Seo
        title="Projects | adjie Portfolio"
        description="Kumpulan project React, dashboard SaaS, dan pengalaman digital bertema futuristik."
        keywords="projects, react portfolio, frontend projects, three.js"
        path="/projects"
      />
      <PageShell compact>
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">Projects</p>
          <h1 className="glow-text mt-4 text-4xl font-extrabold sm:text-5xl">Digital constellations</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Eksperimen produk, dashboard, dan antarmuka yang mengutamakan performa, kejelasan, dan atmosfer visual yang kuat.
          </p>
        </header>
        <SectionReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </SectionReveal>
      </PageShell>
    </>
  )
}
