import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience, certifications } from '../data/resume'
import { SectionHeading } from './SectionHeading'
import { AmbientGlow } from './AmbientGlow'
import { useTilt } from '../hooks/useTilt'

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="experience" ref={ref} style={{ padding: '10rem 6vw', maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
      <AmbientGlow color="var(--accent-2)" top="12%" left="80%" />
      <SectionHeading num="04" text="Career & Education" />

      {/* Timeline List */}
      <div style={{ position: 'relative', borderLeft: '1px solid var(--border)', paddingLeft: '2.5rem', marginLeft: '0.5rem', marginBottom: '10rem' }}>
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
            style={{ marginBottom: '4rem', position: 'relative' }}
          >
            {/* Timeline Marker */}
            <span style={{
              position: 'absolute',
              left: '-3.05rem',
              top: '0.4rem',
              width: 16,
              height: 16,
              background: exp.current ? 'var(--accent)' : 'var(--bg)',
              border: `2px solid ${exp.current ? 'var(--accent)' : 'var(--text-3)'}`,
              borderRadius: '50%',
            }} />

            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-card)',
              background: 'var(--bg-1)',
              padding: '2rem',
              position: 'relative',
            }}>
              {exp.current && (
                <span style={{
                  position: 'absolute', top: '1.25rem', right: '1.5rem',
                  padding: '0.25rem 0.7rem', borderRadius: 999, background: 'var(--accent-dim)', border: '1px solid var(--accent)',
                  color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em',
                }}>
                  ACTIVE
                </span>
              )}

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {exp.date}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight:700, fontSize: '1.7rem', letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '0.2rem' }}>
                {exp.role}
              </h3>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-2)', marginBottom: '1.5rem' }}>
                @ {exp.company}
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                {exp.bullets.map((b, idx) => (
                  <li key={idx} style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem', display: 'flex', gap: '0.8rem' }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>&gt;</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exp.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 999,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-3)',
                  }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>


      <SectionHeading num="05" text="Certifications" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {certifications.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
        ))}
      </div>

    </section>
  )
}

function CertCard({ cert, index: i, inView }: { cert: typeof certifications[0], index: number, inView: boolean }) {
  const { rX, rY, handleMove, handleLeave } = useTilt(6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-card)',
        background: 'var(--bg-1)',
        padding: '2rem',
        position: 'relative',
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 800,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem' }}>{cert.emoji}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)',
          padding: '0.25rem 0.6rem', borderRadius: 999, background: 'var(--accent-dim)', border: '1px solid var(--accent)',
        }}>
          Verified {cert.year}
        </span>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
        {cert.issuer}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight:700, fontSize: '1.4rem', letterSpacing: '-0.01em', color: 'var(--text)', lineHeight: 1.1 }}>
        {cert.name}
      </h3>
    </motion.div>
  )
}
