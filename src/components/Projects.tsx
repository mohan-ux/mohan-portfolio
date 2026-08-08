import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../data/resume'
import { CyberBtn } from './Hero'
import { SectionHeading } from './SectionHeading'
import { AmbientGlow } from './AmbientGlow'
import { useTilt } from '../hooks/useTilt'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} style={{ padding: '10rem 6vw', maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
      <AmbientGlow color="var(--accent)" top="8%" left="85%" />
      <SectionHeading num="03" text="Featured Work" />

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, index: i, inView }: { project: typeof projects[0], index: number, inView: boolean }) {
  const { rX, rY, handleMove, handleLeave } = useTilt(5)

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-card)',
        background: 'var(--bg-1)',
        position: 'relative',
        padding: '3rem',
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 1000,
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        
        {/* Left Side: Information */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>
              // PROJ_{p.num}
            </span>
            <span style={{ width: 4, height: 4, background: 'var(--text-3)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {p.category}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight:700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}>
            {p.title}
          </h3>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-2)', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
            {p.date}
          </div>

          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.92rem' }}>
            {p.description}
          </p>

          {/* Tech list — Notion-style checklist tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {p.tech.map((t) => (
              <span
                key={t}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.8rem 0.3rem 0.6rem',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.05em',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect x="0.5" y="0.5" width="9" height="9" rx="2" stroke="var(--accent)" strokeWidth="1" />
                  <path d="M2.3 5.1 L4.2 7 L7.7 3" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <CyberBtn primary onClick={() => window.open(p.github, '_blank')}>
              Repository ↗
            </CyberBtn>
            {'deployed' in p && p.deployed && (
              <CyberBtn onClick={() => window.open(p.deployed, '_blank')}>
                Deployed ↗
              </CyberBtn>
            )}
          </div>
        </div>

        {/* Right Side: Code / UI Terminal Window */}
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Window bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.6rem 1rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-2)',
          }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
              {p.title.toLowerCase().replace(/\s+/g, '-')}.exe
            </span>
          </div>

          {/* Window Body */}
          <ProjectWindowVisual id={p.id} />
        </div>

      </div>

      {/* Sticky-note style annotation — pinned to the document, Notion-esque */}
      <div style={{
        position: 'absolute', top: '-0.9rem', right: '2.4rem',
        background: 'var(--bg-1)', border: '1px solid var(--border-h)',
        borderRadius: 8, padding: '0.35rem 0.7rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)',
        letterSpacing: '0.08em', transform: 'rotate(-4deg)',
        boxShadow: 'var(--shadow-card)',
        zIndex: 2,
      }}>
        ✓ Shipped
      </div>

      <style>{`
        @media(max-width:960px){
          article > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </motion.article>
  )
}

function ProjectWindowVisual({ id }: { id: string }) {
  if (id === 'codecraft') {
    return (
      <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.7, minHeight: 220 }}>
        <div style={{ color: 'var(--text-3)' }}>// CODECRAFT AI Engine Initialized</div>
        <div style={{ color: 'var(--accent)' }}>const <span style={{ color: 'var(--text)' }}>agent</span> = new MCPPluginArchitect();</div>
        <div style={{ color: 'var(--text-2)' }}>await agent.connect(['Notion', 'Figma', 'Calendar']);</div>
        <div style={{ color: 'var(--accent-2)', marginTop: '0.8rem' }}>&gt; GPT-4 Code Refactoring Complete.</div>
        <div style={{ display: 'inline-block', marginTop: '1rem', padding: '0.3rem 0.6rem', background: 'var(--accent-dim)', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '0.68rem' }}>
          ✓ Container Status: Dockerized [PORT 8080]
        </div>
      </div>
    )
  }

  if (id === 'adaptlearn') {
    return (
      <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.7, minHeight: 220 }}>
        <div style={{ color: 'var(--accent-2)', marginBottom: '0.5rem' }}>🤖 LLaMA-2 Sandbox Connected</div>
        <div style={{ color: 'var(--text-2)', marginBottom: '1rem' }}>Active Caching: Redis Cluster [HIT RATE: 98.4%]</div>
        
        {['React Components', 'Node API Indexing', 'Algorithmic Optimization'].map((label, idx) => (
          <div key={label} style={{ marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-3)' }}>
              <span>{label}</span>
              <span>{[88, 94, 76][idx]}%</span>
            </div>
            <div style={{ height: 4, background: 'var(--border)', marginTop: 4 }}>
              <div style={{ height: '100%', width: `${[88, 94, 76][idx]}%`, background: 'var(--accent)' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (id === 'diaflow') {
    return (
      <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ border: '1px solid var(--accent)', padding: '0.4rem 0.8rem', color: 'var(--accent)', background: 'var(--accent-dim)' }}>INPUT: NLP Prompt</div>
          <span style={{ color: 'var(--text-3)' }}>➔</span>
          <div style={{ border: '1px solid var(--accent-2)', padding: '0.4rem 0.8rem', color: 'var(--accent-2)', background: 'var(--accent-2-dim)' }}>PARSER</div>
        </div>
        <div style={{ border: '1px dashed var(--border)', padding: '0.8rem', textAlign: 'center', color: 'var(--text-2)', fontSize: '0.7rem' }}>
          Realtime Collaborative Canvas (500+ Nodes Rendered)
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', minHeight: 220 }}>
      <div style={{ color: 'var(--text-3)', marginBottom: '1rem' }}>// MOVIE BOOKING SYSTEM - REDUX STATE</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: '1rem' }}>
        {Array.from({ length: 18 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              height: 24,
              border: '1px solid var(--border)',
              background: [2, 5, 8, 13].includes(idx) ? 'var(--accent)' : [0, 4, 9].includes(idx) ? 'var(--accent-2)' : 'transparent',
              opacity: [2, 5, 8, 13, 0, 4, 9].includes(idx) ? 0.8 : 0.2,
            }}
          />
        ))}
      </div>
      <div style={{ color: 'var(--accent)', fontSize: '0.68rem' }}>12+ Reusable Atomic Components Loaded</div>
    </div>
  )
}
