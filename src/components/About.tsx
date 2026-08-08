import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, useInView } from 'framer-motion'
import { personal } from '../data/resume'
import { CyberBtn } from './Hero'
import { SectionHeading } from './SectionHeading'
import { CountUp } from './CountUp'
import { AmbientGlow } from './AmbientGlow'

// ===== 3D Scene: Orbiting DNA-like helix =====
function DNAHelix() {
  const group = useRef<THREE.Group>(null!)
  const count = 40

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.getElapsedTime() * 0.25
  })

  const spheres = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 4
    const y = (i / count) * 8 - 4
    const r = 1.5
    return {
      pos1: [Math.cos(angle) * r, y, Math.sin(angle) * r] as [number,number,number],
      pos2: [Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r] as [number,number,number],
      color: i % 3 === 0 ? '#ff7a45' : i % 3 === 1 ? '#f2a65a' : '#ffffff',
    }
  })

  return (
    <group ref={group}>
      {spheres.map((s, i) => (
        <group key={i}>
          <mesh position={s.pos1}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color={s.color} />
          </mesh>
          <mesh position={s.pos2}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.6} />
          </mesh>
          {/* Connector bar */}
          {i < count - 1 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([...s.pos1, ...s.pos2]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ff7a45" transparent opacity={0.08} />
            </line>
          )}
        </group>
      ))}
    </group>
  )
}

const quickInfo = [
  { key:'LOCATION', val:'Tirupur, Tamil Nadu, India' },
  { key:'DEGREE',   val:'B.Tech IT — SNS College, Coimbatore' },
  { key:'ROLE',     val:'AI Fullstack Intern @ Novintix' },
  { key:'CGPA',     val:'8.5 / 10.0' },
  { key:'CERTS',    val:'AWS · Salesforce · Oracle' },
]

const statCards = [
  { val:'8.5', label:'CGPA' },
  { val:'4+',  label:'Projects' },
  { val:'2',   label:'Internships' },
  { val:'3',   label:'Certifications' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:0.15 })

  return (
    <section id="about" ref={ref} style={{ padding:'10rem 6vw', maxWidth:1300, margin:'0 auto', position:'relative' }}>
      <AmbientGlow color="var(--accent)" top="10%" left="70%" />
      <SectionHeading num="01" text="About" />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:'6rem', alignItems:'start' }}>
        {/* LEFT: 3D + quick info table */}
        <div>
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity:0, scale:0.85 }}
            animate={inView ? { opacity:1, scale:1 } : {}}
            transition={{ duration:1, ease:[0.16,1,0.3,1] }}
            style={{
              height:380, marginBottom:'2.5rem',
              border:'1px solid var(--border)',
              borderRadius:'var(--radius)',
              boxShadow:'var(--shadow-card)',
              background:'var(--bg-1)',
              position:'relative', overflow:'hidden',
            }}
          >
            <Canvas camera={{ position:[0,0,8], fov:55 }}>
              <ambientLight intensity={0.3} />
              <pointLight color="#ff7a45" intensity={2} position={[4,4,4]} />
              <DNAHelix />
            </Canvas>
          </motion.div>

          {/* Quick info as terminal-style table */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.3, duration:0.8 }}
            style={{ border:'1px solid var(--border)', borderRadius:'var(--radius)', background:'var(--bg-1)', overflow:'hidden' }}
          >
            <div style={{ padding:'0.6rem 1rem', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#ff5f56', display:'inline-block' }} />
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#ffbd2e', display:'inline-block' }} />
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#27c93f', display:'inline-block' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-3)', marginLeft:'0.5rem', letterSpacing:'0.05em' }}>
                mohan@portfolio ~ profile.json
              </span>
            </div>
            {quickInfo.map((q, i) => (
              <motion.div
                key={q.key}
                initial={{ opacity:0, x:-10 }}
                animate={inView ? { opacity:1, x:0 } : {}}
                transition={{ delay:0.4 + i*0.07, duration:0.5 }}
                style={{
                  display:'grid', gridTemplateColumns:'140px 1fr',
                  padding:'0.6rem 1rem',
                  borderBottom: i < quickInfo.length-1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--accent)', letterSpacing:'0.05em' }}>
                  {q.key}:
                </span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-2)' }}>
                  "{q.val}"
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Bio + stats */}
        <div>
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.15, duration:0.9, ease:[0.16,1,0.3,1] }}
          >
            <h3 style={{
              fontFamily:'var(--font-display)', fontWeight:700,
              fontSize:'clamp(1.8rem,4vw,3rem)',
              letterSpacing:'-0.01em', lineHeight:1.1,
              marginBottom:'2rem', color:'var(--text)',
            }}>
              Crafting AI-powered<br />
              <span style={{ color:'var(--accent)' }}>experiences</span>
            </h3>

            <p style={{ color:'var(--text-2)', lineHeight:1.85, marginBottom:'1rem', fontSize:'0.95rem' }}>
              I'm a <strong style={{ color:'var(--text)' }}>Full Stack Software Engineer</strong> proficient in JavaScript, React.js, Node.js, and MongoDB, with hands-on experience in Docker and CI/CD pipelines on AWS.
            </p>
            <p style={{ color:'var(--text-2)', lineHeight:1.85, marginBottom:'2.5rem', fontSize:'0.95rem' }}>
              Currently building AI-powered web applications at <strong style={{ color:'var(--accent)' }}>Novintix</strong> — integrating LLM APIs into product workflows, shipping RESTful APIs, and participating in Agile ceremonies.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.3, duration:0.9 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', marginBottom:'2.5rem', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden' }}
          >
            {statCards.map(s => (
              <motion.div
                key={s.label}
                whileHover={{ background:'var(--accent-dim)' }}
                style={{
                  padding:'1.5rem',
                  background:'var(--bg-1)',
                  borderRight:'1px solid var(--border)',
                  borderBottom:'1px solid var(--border)',
                  transition:'background 0.2s',
                }}
              >
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'3rem', color:'var(--accent)', letterSpacing:'-0.01em', lineHeight:1 }}>
                  <CountUp value={s.val} />
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-3)', letterSpacing:'0.12em', marginTop:'0.4rem' }}>
                  {s.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ delay:0.5, duration:0.8 }}
            style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}
          >
            <CyberBtn primary onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth' })}>
              Let's Talk
            </CyberBtn>
            <CyberBtn onClick={() => window.open(personal.github, '_blank')}>
              GitHub →
            </CyberBtn>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #about > div > div:last-child { grid-template-columns:1fr !important; gap:3rem !important; }
        }
      `}</style>
    </section>
  )
}
