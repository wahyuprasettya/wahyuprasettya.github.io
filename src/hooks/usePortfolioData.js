import { useEffect, useState } from 'react'
import { getPortfolioData, portfolioDataChangedEvent } from '../utils/portfolioData.js'

export default function usePortfolioData() {
  const [data, setData] = useState(getPortfolioData)

  useEffect(() => {
    const refreshData = () => setData(getPortfolioData())

    window.addEventListener(portfolioDataChangedEvent, refreshData)
    window.addEventListener('storage', refreshData)

    return () => {
      window.removeEventListener(portfolioDataChangedEvent, refreshData)
      window.removeEventListener('storage', refreshData)
    }
  }, [])

  return data
}
