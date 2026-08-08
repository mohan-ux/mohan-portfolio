import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, useInView } from 'framer-motion'
import { personal } from '../data/resume'
import { CyberBtn } from './Hero'
import { SectionHeading } from './SectionHeading'

function ContactWireframeKnot() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.15
    ref.current.rotation.y = t * 0.2
  })

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[2.2, 0.6, 100, 16]} />
      <meshBasicMaterial color="#ff7a45" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

const socials = [
  { label: 'GITHUB', icon: '⌥', href: personal.github },
  { label: 'LINKEDIN', icon: 'in', href: personal.linkedin },
  { label: 'LEETCODE', icon: '{ }', href: personal.leetcode },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="contact" ref={ref} style={{ padding: '10rem 6vw 6rem', maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
      
      {/* 3D Wireframe Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <ContactWireframeKnot />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading num="06" text="Get In Touch" />

        {/* Contact Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-display)', fontWeight:700,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--text)',
              }}
            >
              Let's build the <br />
              <span style={{ color: 'var(--accent)' }}>next big thing.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{ color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '3rem', fontSize: '0.95rem', maxWidth: 460 }}
            >
              Open for full-time Full Stack & AI Engineering roles. Got a question, project proposal, or just want to connect? Reach out anytime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              {socials.map(s => (
                <CyberBtn key={s.label} onClick={() => window.open(s.href, '_blank')}>
                  {s.label}
                </CyberBtn>
              ))}
            </motion.div>
          </div>

          {/* Terminal Box for Email/Phone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-card)',
              background: 'var(--bg-1)',
              padding: '2.5rem',
              position: 'relative',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '2rem' }}>
              Direct Channels
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                EMAIL
              </div>
              <a
                href={`mailto:${personal.email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {personal.email}
              </a>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                PHONE
              </div>
              <a
                href={`tel:${personal.phone}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {personal.phone}
              </a>
            </div>

            <CyberBtn primary onClick={() => window.location.href = `mailto:${personal.email}`}>
              Send Email ↗
            </CyberBtn>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media(max-width:850px){
          #contact > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
