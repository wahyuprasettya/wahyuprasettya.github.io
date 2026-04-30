import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import CareerPathSection from '../components/CareerPathSection.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function About() {
  const data = usePortfolioData()

  return (
    <>
      <Seo
        title="About | Wahyu adjie prasetyo Portfolio"
        description={`${data.about.intro} ${data.about.detail}`}
        keywords="about, frontend engineer, react developer, portfolio"
        path="/about"
      />
      <PageShell compact>
        <SectionReveal className="space-y-12">
          <section className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]" aria-labelledby="about-me-heading">
            <article className="glass overflow-hidden rounded-lg shadow-violet">
              <img
                src={data.profile.image}
                alt={`Foto profil ${data.profile.name}`}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">Profile</p>
                <h2 className="mt-3 text-3xl font-extrabold">{data.profile.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{data.profile.bio}</p>
              </div>
            </article>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">{data.about.eyebrow}</p>
              <h1 id="about-me-heading" className="glow-text mt-4 text-4xl font-extrabold sm:text-5xl">{data.about.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                {data.about.intro}
              </p>
              <p className="mt-5 leading-8 text-slate-700 dark:text-slate-300">
                {data.about.detail}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.about.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-500/35 px-4 py-2 text-sm font-semibold dark:bg-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <CareerPathSection career={data.about.career} />
        </SectionReveal>
      </PageShell>
    </>
  )
}
