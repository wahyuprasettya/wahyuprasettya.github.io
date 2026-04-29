import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import usePortfolioData from '../hooks/usePortfolioData.js'

export default function BlogPost() {
  const { slug } = useParams()
  const data = usePortfolioData()
  const post = data.blog.find((item) => item.slug === slug)

  if (!post) {
    return (
      <PageShell compact>
        <h1 className="text-4xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex text-cyan-600 dark:text-ion">Back to blog</Link>
      </PageShell>
    )
  }

  return (
    <>
      <Seo
        title={`${post.title} | adjie Portfolio`}
        description={post.summary}
        keywords="react, frontend, portfolio, seo, three.js"
        path={`/blog/${post.slug}`}
      />
      <PageShell compact>
        <article className="mx-auto max-w-3xl">
          <header>
            <time dateTime={post.date} className="text-sm font-semibold text-cyan-700 dark:text-ion">{post.date}</time>
            <h1 className="glow-text mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">{post.summary}</p>
          </header>
          <section className="glass mt-10 rounded-lg p-6 leading-8 text-slate-700 dark:text-slate-300">
            <p>
              Artikel ini menggunakan data dari <code>data.json</code> dan URL slug yang ramah SEO. Untuk produksi, konten penuh dapat dipindahkan ke CMS, MDX, atau API tanpa mengubah struktur routing utama.
            </p>
            <p className="mt-5">
              Fokus implementasi tetap pada metadata per halaman, semantic HTML, performa rendering, serta pengalaman membaca yang bersih di mode gelap maupun terang.
            </p>
          </section>
        </article>
      </PageShell>
    </>
  )
}
