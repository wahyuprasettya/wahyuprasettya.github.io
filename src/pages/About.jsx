import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

const skills = ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'SEO SPA']

export default function About() {
  const data = usePortfolioData()

  return (
    <>
      <Seo
        title="About | adjie Portfolio"
        description="Profil frontend engineer yang berfokus pada React, Three.js, performa, aksesibilitas, dan SEO."
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
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">About</p>
              <h1 id="about-me-heading" className="glow-text mt-4 text-4xl font-extrabold sm:text-5xl">About Me</h1>
              <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                Halo, saya {data.profile.name}. Saya membangun antarmuka yang terasa cepat, tenang, dan hidup untuk produk digital modern.
              </p>
              <p className="mt-5 leading-8 text-slate-700 dark:text-slate-300">
                Fokus saya ada pada sistem komponen, animasi yang punya fungsi, visual 3D yang efisien, dan fondasi SEO yang tetap kuat untuk aplikasi React.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-500/35 px-4 py-2 text-sm font-semibold dark:bg-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      </PageShell>
    </>
  )
}
