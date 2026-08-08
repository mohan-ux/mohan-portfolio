import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitReveal } from './SplitReveal'

// A deliberately quiet, near-empty moment between the dense Skills and
// Projects sections — visual rhythm: minimal -> dense -> minimal -> dense.
export default function Statement() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section
      ref={ref}
      style={{
        minHeight: '60vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '6rem 6vw',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        style={{ maxWidth: 900 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)',
          lineHeight: 1.25, letterSpacing: '-0.01em',
          color: 'var(--text-2)',
        }}>
          <SplitReveal text="From full-stack fundamentals" style={{ color: 'var(--text)' }} /><br />
          <SplitReveal text="to AI-native products." style={{ color: 'var(--accent)' }} />
        </h2>
      </motion.div>
    </section>
  )
}
