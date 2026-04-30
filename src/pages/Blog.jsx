import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function Blog() {
  const data = usePortfolioData()

  return (
    <>
      <Seo
        title="Blog | Wahyu adjie prasetyo Portfolio"
        description="Artikel tentang React, Three.js, performa frontend, SEO SPA, dan desain UI bertema galaksi."
        keywords="blog react, three.js, seo spa, frontend performance"
        path="/blog"
      />
      <PageShell compact>
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">Blog</p>
          <h1 className="glow-text mt-4 text-4xl font-extrabold sm:text-5xl">Transmission log</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Tulisan singkat tentang membangun web modern yang cepat, rapi, dan punya karakter visual.
          </p>
        </header>

        <SectionReveal className="grid gap-5">
          {data.blog.map((post) => (
            <motion.article
              key={post.slug}
              whileHover={{ x: 8 }}
              className="glass rounded-lg p-6"
            >
              <time dateTime={post.date} className="text-sm text-cyan-700 dark:text-ion">{post.date}</time>
              <h2 className="mt-3 text-2xl font-bold">
                <Link to={`/blog/${post.slug}`} className="transition hover:text-cyan-600 dark:hover:text-ion">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{post.summary}</p>
            </motion.article>
          ))}
        </SectionReveal>
      </PageShell>
    </>
  )
}
