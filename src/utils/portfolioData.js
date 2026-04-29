import defaultData from '../data/data.json'

export const portfolioStorageKey = 'portfolioData'
export const portfolioDataChangedEvent = 'portfolio-data-changed'

export function getPortfolioData() {
  if (typeof window === 'undefined') return defaultData

  try {
    const storedData = localStorage.getItem(portfolioStorageKey)
    return storedData ? JSON.parse(storedData) : defaultData
  } catch {
    return defaultData
  }
}

export function savePortfolioData(data) {
  localStorage.setItem(portfolioStorageKey, JSON.stringify(data))
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
