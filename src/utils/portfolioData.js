import defaultData from '../data/data.json'

export const portfolioStorageKey = 'portfolioData'
export const portfolioDataChangedEvent = 'portfolio-data-changed'

const defaultCareerItems = [
  {
    type: 'education',
    phase: 'Ignition',
    title: 'Teknik Informatika',
    organization: 'STMIK AMIKOM Yogyakarta',
    period: '2015 - 2019',
    location: 'Yogyakarta',
    summary: 'Mempelajari fondasi rekayasa perangkat lunak, logika pemrograman, dan cara menyusun solusi digital yang terstruktur.'
  },
  {
    type: 'work',
    phase: 'Lift-off',
    title: 'QA Engineer',
    organization: 'Ravintola',
    period: '2019 - 2022',
    location: 'Indonesia',
    summary: 'Menjaga kualitas produk lewat pengujian, validasi alur bisnis, dan kolaborasi dengan tim developer sebelum rilis.'
  },
  {
    type: 'work',
    phase: 'Stage Separation',
    title: 'Mobile App Developer',
    organization: 'Ravintola',
    period: '2022 - 2023',
    location: 'Indonesia',
    summary: 'Ikut mengembangkan aplikasi yang menghubungkan kebutuhan bisnis, pengalaman pelanggan, dan implementasi teknis yang stabil.'
  },
  {
    type: 'work',
    phase: 'Orbit',
    title: 'Frontend Developer',
    organization: 'Freelance & Product Collaboration',
    period: '2023 - Sekarang',
    location: 'Remote',
    summary: 'Fokus membangun UI yang cepat, modern, mudah dipelihara, dan nyaman digunakan untuk kebutuhan produk nyata.'
  }
]

function toPlainText(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value.id || value.en || ''
  }

  return value || ''
}

export function normalizePortfolioData(data) {
  const careerItems = Array.isArray(data.about?.career?.items)
    ? data.about.career.items.map((item, index) => ({
        type: item?.type === 'education' ? 'education' : 'work',
        phase: toPlainText(item?.phase) || defaultCareerItems[index]?.phase || `Phase ${index + 1}`,
        title: toPlainText(item?.title) || defaultCareerItems[index]?.title || '',
        organization: toPlainText(item?.organization) || defaultCareerItems[index]?.organization || '',
        period: toPlainText(item?.period) || defaultCareerItems[index]?.period || '',
        location: toPlainText(item?.location) || defaultCareerItems[index]?.location || '',
        summary: toPlainText(item?.summary) || defaultCareerItems[index]?.summary || ''
      })).filter((item) => item.title && item.organization)
    : defaultCareerItems

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
      skills: Array.isArray(data.about?.skills) ? data.about.skills.map(toPlainText).filter(Boolean) : ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'SEO SPA'],
      career: {
        eyebrow: toPlainText(data.about?.career?.eyebrow) || 'Career Path',
        title: toPlainText(data.about?.career?.title) || 'Rocket Launch Timeline',
        intro: toPlainText(data.about?.career?.intro) || 'Perjalanan ini divisualkan seperti peluncuran roket: setiap fase membuka riwayat pendidikan dan pekerjaan yang membentuk orbit profesional saya.',
        items: careerItems.length ? careerItems : defaultCareerItems
      }
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
