import { Helmet } from 'react-helmet-async'

const siteUrl = 'https://example.com'
const defaultImage = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'

export default function Seo({
  title = 'Adjie Portfolio',
  description = 'Portfolio modern bertema galaksi untuk frontend engineer yang membangun pengalaman digital cepat, imersif, dan SEO-friendly.',
  keywords = 'portfolio, react developer, three.js, frontend engineer, vite, tailwind css',
  path = '/'
}) {
  const url = `${siteUrl}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  )
}
