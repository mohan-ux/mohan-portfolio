import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats, roles } from '../data/resume'
import heroPhoto from '../assets/screen.png'
import { CountUp } from './CountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// =====================================================
// "Living photo" — a static image can't get real leaf/grass
// physics without segmentation, but a cursor-driven parallax
// tilt + slow breathing zoom + drifting light reads as alive.
// =====================================================
function LivingPhoto({ src, alt }: { src: string; alt: string }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 35, damping: 18 })
  const y = useSpring(rawY, { stiffness: 35, damping: 18 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      rawX.set(nx * -12)
      rawY.set(ny * -8)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, reducedMotion])

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
      <motion.div
        style={{ position:'absolute', inset:'-3%', width:'106%', height:'106%', x, y }}
        animate={reducedMotion ? {} : { scale:[1, 1.02, 1], rotate:[-0.2, 0.2, -0.2] }}
        transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 32%' }}
        />
      </motion.div>

      {/* Dappled sunlight flicker — mimics light shifting through moving branches */}
      <motion.div
        style={{ position:'absolute', inset:0, mixBlendMode:'soft-light', pointerEvents:'none' }}
        animate={reducedMotion ? { opacity: 0.2 } : { opacity:[0.15, 0.4, 0.18, 0.35, 0.15] }}
        transition={{ duration:6, repeat: reducedMotion ? 0 : Infinity, ease:'easeInOut' }}
      >
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 22% 12%, rgba(255,244,224,0.95), transparent 42%)',
        }} />
      </motion.div>
    </div>
  )
}

// =====================================================
// Subtle drifting petals over the hero photo — echoes the
// cherry blossoms already in the image instead of fighting it.
// =====================================================
function PetalDrift() {
  const ref = useRef<THREE.Points>(null!)
  const count = 180

  const { positions, speeds } = (() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 26
      pos[i * 3 + 1] = Math.random() * 16 - 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3
      spd[i] = 0.2 + Math.random() * 0.3
    }
    return { positions: pos, speeds: spd }
  })()

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i] * delta
      pos[i * 3] += Math.sin(t * 0.3 + i) * 0.0025
      if (pos[i * 3 + 1] < -8) pos[i * 3 + 1] = 8
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.055} color="#ffd9c2" transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  )
}

// =====================================================
// ROLE TICKER
// =====================================================
function RoleTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % roles.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', overflow:'hidden', height:'1.6em' }}>
      <span style={{ color:'var(--text-3)', fontFamily:'var(--font-mono)', fontSize:'0.75rem', letterSpacing:'0.1em', flexShrink:0 }}>
        SPECIALIZING IN
      </span>
      <div style={{ position:'relative', overflow:'hidden', height:'100%', flex:1 }}>
        {roles.map((r, i) => (
          <motion.span
            key={r}
            animate={{ y: i===idx ? '0%' : i < idx ? '-110%' : '110%', opacity: i===idx ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:'absolute', top:0, left:0,
              fontFamily:'var(--font-mono)', fontSize:'0.78rem',
              color:'var(--accent)', letterSpacing:'0.05em', textTransform:'uppercase',
              whiteSpace:'nowrap',
            }}
          >
            {r}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// =====================================================
// MAIN HERO
// =====================================================
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Scroll-scrubbed cinematic zoom-through: as the hero scrolls out, the
  // photo pushes in and dims — a "camera moving through the scene" cut
  // into the next section, driven by GSAP ScrollTrigger + the Lenis loop.
  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !photoWrapRef.current) return
    const tween = gsap.to(photoWrapRef.current, {
      scale: 1.3,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
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
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position:'relative', minHeight:'100vh',
        display:'flex', alignItems:'center', justifyContent:'flex-start',
        overflow:'hidden',
        paddingTop:'6rem',
      }}
    >
      {/* Cinematic photo backdrop — parallax + breathing zoom + light flicker */}
      <div ref={photoWrapRef} style={{ position:'absolute', inset:0, zIndex:0 }}>
        <LivingPhoto src={heroPhoto} alt="Mohan Babu M" />
      </div>

      {/* Drifting petals layered over the photo */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
        <Canvas camera={{ position:[0, 0, 10], fov:50 }} gl={{ alpha:true, antialias:true }}>
          <PetalDrift />
        </Canvas>
      </div>

      {/* Cinematic gradient overlays for text legibility — soft enough that the photo stays visible */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:'linear-gradient(180deg, rgba(11,13,19,0.05) 0%, rgba(11,13,19,0.3) 62%, rgba(11,13,19,0.72) 100%)',
      }} />
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:'linear-gradient(100deg, rgba(11,13,19,0.82) 0%, rgba(11,13,19,0.2) 42%, transparent 68%)',
      }} />

      {/* Content — vertically centered so it never clips under the navbar */}
      <div style={{ position:'relative', zIndex:3, maxWidth:820, width:'100%', padding:'0 6vw' }}>

        {/* Status pill */}
        <motion.div
          initial={{ y:20, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.5rem' }}
        >
          <span style={{
            display:'inline-flex', alignItems:'center', gap:'0.5rem',
            padding:'0.35rem 0.9rem',
            background:'var(--accent-dim)', border:'1px solid var(--border-h)',
            borderRadius:999, fontFamily:'var(--font-mono)', fontSize:'0.7rem',
            color:'var(--accent)', letterSpacing:'0.08em',
          }}>
            <motion.span
              animate={{ opacity:[1,0,1] }}
              transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }}
            />
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y:40, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.3, duration:0.9, ease:[0.16,1,0.3,1] }}
        >
          <h1 style={{
            fontFamily:'var(--font-display)',
            fontWeight:700,
            fontSize:'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight:1.02,
            letterSpacing:'-0.01em',
            color:'var(--text)',
            marginBottom:'0.4rem',
          }}>
            Mohan Babu M
          </h1>
        </motion.div>

        {/* Divider + role ticker */}
        <motion.div
          initial={{ scaleX:0, opacity:0 }}
          animate={{ scaleX:1, opacity:1 }}
          transition={{ delay:0.5, duration:0.8, ease:[0.16,1,0.3,1] }}
          style={{ transformOrigin:'left', marginBottom:'1.25rem' }}
        >
          <div style={{ width:'100%', maxWidth:360, height:1, background:'linear-gradient(90deg, var(--accent), transparent)' }} />
        </motion.div>

        <motion.div
          initial={{ y:16, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.6, duration:0.8 }}
          style={{ marginBottom:'1.5rem' }}
        >
          <RoleTicker />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y:16, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.7, duration:0.8 }}
          style={{ color:'var(--text-2)', fontSize:'1.02rem', lineHeight:1.7, maxWidth:480, marginBottom:'2.25rem' }}
        >
          Full Stack Software Engineer · Tirupur, India.<br />
          Building AI-powered experiences with React, Node.js & Cloud.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ y:16, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.8, duration:0.8 }}
          style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap', marginBottom:'3rem' }}
        >
          <CyberBtn
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior:'smooth' })}
            primary
          >
            View Work
          </CyberBtn>
          <CyberBtn
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth' })}
          >
            Get In Touch
          </CyberBtn>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ y:16, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.9, duration:0.8 }}
          style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.9rem',
                color:'var(--accent)', lineHeight:1,
              }}>
                <CountUp value={s.value} />
              </div>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:'0.62rem',
                color:'var(--text-3)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'0.3rem',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom-right scroll cue */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.4, duration:1 }}
        style={{
          position:'absolute', bottom:'1.75rem', right:'6vw',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem',
          zIndex:3,
        }}
      >
        <motion.div
          animate={{ y:[0,8,0] }}
          transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
          style={{
            width:20, height:32,
            border:'1px solid var(--border-h)',
            borderRadius:10, position:'relative',
            display:'flex', justifyContent:'center',
          }}
        >
          <motion.div
            animate={{ y:[2,14,2], opacity:[1,0,1] }}
            transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:3, height:6, borderRadius:2, background:'var(--accent)', marginTop:4 }}
          />
        </motion.div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--text-3)', letterSpacing:'0.2em' }}>SCROLL</span>
      </motion.div>
    </section>
  )
}

// =====================================================
// PILL BUTTON COMPONENT
// =====================================================
export function CyberBtn({
  children, onClick, primary = false, small = false
}: {
  children: React.ReactNode
  onClick?: () => void
  primary?: boolean
  small?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 15 })
  const sy = useSpring(my, { stiffness: 200, damping: 15 })

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }
  const handleLeave = () => { setHovered(false); mx.set(0); my.set(0) }

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      style={{
        x: sx, y: sy,
        padding: small ? '0.55rem 1.1rem' : '0.75rem 1.6rem',
        borderRadius: 999,
        background: primary
          ? (hovered ? 'var(--accent-bright)' : 'var(--accent)')
          : (hovered ? 'var(--accent-dim)' : 'transparent'),
        border: `1px solid ${primary ? 'var(--accent)' : 'var(--border-h)'}`,
        color: primary ? '#0b0d13' : (hovered ? 'var(--accent)' : 'var(--text-2)'),
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: small ? '0.78rem' : '0.88rem',
        letterSpacing: '0.01em',
        cursor: 'none',
        transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {children}
    </motion.button>
  )
}
