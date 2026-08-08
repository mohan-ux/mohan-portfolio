import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { AmbientGlow } from './AmbientGlow'
import { useTilt } from '../hooks/useTilt'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// =====================================================
// Blueprint line-art icons — draw themselves in via framer-motion's
// `pathLength` on scroll-into-view. Flat SVG, not 3D: the "wireframe
// reveal" look without the weight of a WebGL canvas.
// =====================================================
const ICON_PATHS: Record<string, string[]> = {
  code: ['M18 8 L6 24 L18 40', 'M30 8 L42 24 L30 40'],
  layers: [
    'M8 12 H32 A3 3 0 0 1 32 18 H8 A3 3 0 0 1 8 12 Z',
    'M8 21 H32 A3 3 0 0 1 32 27 H8 A3 3 0 0 1 8 21 Z',
    'M8 30 H32 A3 3 0 0 1 32 36 H8 A3 3 0 0 1 8 30 Z',
  ],
  cloud: ['M13 33 C4 33 4 21 13 21 C13 11 28 9 32 19 C43 16 45 33 33 33 Z'],
  brain: [
    'M15 15 H33 A2 2 0 0 1 35 17 V31 A2 2 0 0 1 33 33 H15 A2 2 0 0 1 13 31 V17 A2 2 0 0 1 15 15 Z',
    'M8 20 H13', 'M8 28 H13', 'M35 20 H40', 'M35 28 H40',
    'M20 15 V10', 'M28 15 V10', 'M20 33 V38', 'M28 33 V38',
  ],
}

function BlueprintIcon({
  type, color, size = 48, inView, strokeWidth = 1.6,
}: {
  type: keyof typeof ICON_PATHS
  color: string
  size?: number
  inView: boolean
  strokeWidth?: number
}) {
  const paths = ICON_PATHS[type]
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          style={{ stroke: color }}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

const ICON_BY_KEY: Record<string, keyof typeof ICON_PATHS> = {
  code: 'code',
  layers: 'layers',
  cloud: 'cloud',
  brain: 'brain',
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reducedMotion = useReducedMotion()

  // Parallax the grid backdrop slower than scroll — classic depth cue
  useEffect(() => {
    if (reducedMotion || !ref.current || !gridRef.current) return
    const tween = gsap.to(gridRef.current, {
      backgroundPosition: '0 120px',
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <section id="skills" ref={ref} style={{ padding: '10rem 6vw', maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
      {/* Faint blueprint grid backdrop — parallaxed on scroll */}
      <div ref={gridRef} className="blueprint-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <AmbientGlow color="var(--accent-2)" top="15%" left="15%" />
      <SectionHeading num="02" text="Tech Arsenal" />

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem', alignItems: 'start', position: 'relative' }}>

        {/* Left Side: Blueprint panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            height: 380,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-card)',
            background: 'var(--bg-1)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>
              TECH_CORE.BLUEPRINT
            </span>
            <span style={{ width: 6, height: 6, background: 'var(--accent)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <BlueprintIcon type="brain" color="var(--accent)" size={140} strokeWidth={1.2} inView={inView} />
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
              MODULAR STACK
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-2)', marginTop: '0.2rem' }}>
              Full-Stack & Cloud Architecture
            </div>
          </div>
        </motion.div>

        {/* Right Side: Category Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {skills.map((cat, i) => (
            <SkillCard key={cat.category} cat={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #skills > div:last-child { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}

function SkillCard({
  cat, index: i, inView,
}: {
  cat: typeof skills[0]
  index: number
  inView: boolean
}) {
  const { rX, rY, handleMove, handleLeave } = useTilt(4)
  const iconType = ICON_BY_KEY[cat.icon] ?? 'code'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
      onMouseMove={(e) => { handleMove(e); (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-h)' }}
      onMouseLeave={(e) => { handleLeave(); (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        background: 'var(--bg-1)',
        padding: '2rem',
        position: 'relative',
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 800,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.12em' }}>
          0{i + 1}
        </span>
        <BlueprintIcon type={iconType} color="var(--accent-2)" size={30} inView={inView} />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight:700,
        fontSize: '1.4rem',
        letterSpacing: '-0.01em',
        marginBottom: '1.5rem',
        color: 'var(--text)',
      }}>
        {cat.category}
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.items.map((skill) => (
          <span
            key={skill}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 999,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-2)',
              letterSpacing: '0.05em',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
