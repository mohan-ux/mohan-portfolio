import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Wraps a heading string and staggers each word up+fade on scroll-into-view.
// Shared by every section header instead of copy-pasting the same motion block.
export function SplitReveal({
  text,
  style,
}: {
  text: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const words = text.split(' ')

  return (
    <span ref={ref} style={{ display: 'inline-block', overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
