import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function CareerPathSection({ career }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const items = career?.items || []
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 78%', 'end 32%']
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(clamp(latest, 0, 1))
  })

  const rocketTop = `${10 + (progress * 80)}%`

  return (
    <section ref={sectionRef} className="career-launch relative overflow-hidden rounded-[28px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="career-launch__nebula" aria-hidden="true" />
      <div className="career-launch__stars" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{career.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{career.title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
          {career.intro}
        </p>
      </div>

      <div className="relative z-10 mt-10 min-h-[760px] lg:min-h-[900px]">
        <div className="career-launch__axis" aria-hidden="true" />
        <motion.div
          className="career-rocket"
          aria-hidden="true"
          animate={{ filter: ['drop-shadow(0 0 16px rgba(34, 211, 238, 0.4))', 'drop-shadow(0 0 28px rgba(249, 115, 22, 0.48))', 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.4))'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: rocketTop }}
        >
          <div className="career-rocket__body">
            <span className="career-rocket__window" />
            <span className="career-rocket__wing career-rocket__wing--left" />
            <span className="career-rocket__wing career-rocket__wing--right" />
          </div>
          <span className="career-rocket__flame" />
        </motion.div>

        <div className="relative grid gap-10 py-8">
          {items.map((item, index) => {
            const threshold = items.length === 1 ? 0.2 : index / (items.length - 1 || 1)
            const isActive = progress >= Math.max(0.08, threshold - 0.08)

            return (
              <motion.article
                key={`${item.phase}-${item.title}-${index}`}
                className={`career-milestone ${index % 2 === 0 ? 'career-milestone--left' : 'career-milestone--right'} ${isActive ? 'career-milestone--active' : ''}`}
                initial={{ opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="career-milestone__pin" aria-hidden="true">
                  <span />
                </div>
                <div className="career-milestone__card">
                  <div className="career-milestone__meta">
                    <span className="career-order">T+{String(index + 1).padStart(2, '0')}</span>
                    <span className={`career-chip ${item.type === 'education' ? 'career-chip--education' : 'career-chip--work'}`}>
                      {item.type === 'education' ? 'Education' : 'Work'}
                    </span>
                    <span className="career-milestone__phase">{item.phase}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-base font-semibold text-cyan-100">{item.organization}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span>{item.period}</span>
                    {item.location && <span>{item.location}</span>}
                  </div>
                  <p className="mt-5 leading-7 text-slate-200">{item.summary}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
