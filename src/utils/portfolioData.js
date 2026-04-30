import defaultData from '../data/data.json'

export const portfolioStorageKey = 'portfolioData'
export const portfolioDataChangedEvent = 'portfolio-data-changed'

function toPlainText(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value.id || value.en || ''
  }

  return value || ''
}

export function normalizePortfolioData(data) {
  return {
    ...data,
    profile: {
      ...data.profile,
      name: toPlainText(data.profile?.name),
      bio: toPlainText(data.profile?.bio)
    },
    home: {
      heroName: toPlainText(data.home?.heroName) || toPlainText(data.profile?.name) || 'Wahyu adjie prasetyo'
    },
    about: {
      eyebrow: toPlainText(data.about?.eyebrow) || 'About',
      title: toPlainText(data.about?.title) || 'About Me',
      intro: toPlainText(data.about?.intro) || `Halo, saya ${toPlainText(data.profile?.name)}. Saya membangun antarmuka yang terasa cepat, tenang, dan hidup untuk produk digital modern.`,
      detail: toPlainText(data.about?.detail) || 'Fokus saya ada pada sistem komponen, animasi yang punya fungsi, visual 3D yang efisien, dan fondasi SEO yang tetap kuat untuk aplikasi React.',
      skills: Array.isArray(data.about?.skills) ? data.about.skills.map(toPlainText).filter(Boolean) : ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'SEO SPA']
    },
    projects: (data.projects || []).map((project) => ({
      ...project,
      title: toPlainText(project.title),
      description: toPlainText(project.description)
    })),
    blog: (data.blog || []).map((post) => ({
      ...post,
      title: toPlainText(post.title),
      summary: toPlainText(post.summary)
    }))
  }
}

export function getPortfolioData() {
  if (typeof window === 'undefined') return normalizePortfolioData(defaultData)

  try {
    const storedData = localStorage.getItem(portfolioStorageKey)
    return normalizePortfolioData(storedData ? JSON.parse(storedData) : defaultData)
  } catch {
    return normalizePortfolioData(defaultData)
  }
}

export function savePortfolioData(data) {
  localStorage.setItem(portfolioStorageKey, JSON.stringify(normalizePortfolioData(data)))
  window.dispatchEvent(new Event(portfolioDataChangedEvent))
}

export function resetPortfolioData() {
  localStorage.removeItem(portfolioStorageKey)
  window.dispatchEvent(new Event(portfolioDataChangedEvent))
}

export function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
