import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitReveal } from './SplitReveal'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Shared section header: word-stagger entrance (SplitReveal) plus a subtle
// scroll-linked "settle" — the heading eases down in scale/opacity as it
// approaches the top of the viewport, instead of sitting static once revealed.
// One transition vocabulary reused by every section instead of six near-
// identical hand-rolled header blocks.
export function SectionHeading({ num, text }: { num: string; text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !wrapRef.current || !headingRef.current) return
    const tween = gsap.to(headingRef.current, {
      scale: 0.94,
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top top+=140',
        end: 'top top-=60',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
      style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem', position: 'relative' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>{num}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <h2
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(2.5rem,6vw,5rem)',
          letterSpacing: '-0.01em', lineHeight: 1,
          color: 'var(--text)',
          transformOrigin: 'left center',
        }}
      >
        <SplitReveal text={text} />
      </h2>
    </motion.div>
  )
}
