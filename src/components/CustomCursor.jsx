import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [cursor, setCursor] = useState({ x: -40, y: -40, angle: -35 })

  useEffect(() => {
    let previous = { x: -40, y: -40 }
    const updatePosition = (event) => {
      const dx = event.clientX - previous.x
      const dy = event.clientY - previous.y
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45

      previous = { x: event.clientX, y: event.clientY }
      setCursor({ x: event.clientX, y: event.clientY, angle })
    }

    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-50 hidden h-10 w-10 select-none text-3xl drop-shadow-[0_0_14px_rgba(34,211,238,0.9)] md:grid md:place-items-center"
      animate={{ x: cursor.x - 20, y: cursor.y - 20, rotate: cursor.angle }}
      transition={{ type: 'spring', damping: 24, stiffness: 360, mass: 0.35 }}
      aria-hidden="true"
    >
      🚀
    </motion.div>
  )
}
