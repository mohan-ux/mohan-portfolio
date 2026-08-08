import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { personal } from '../data/resume'

const links = [
  { href:'#about',      label:'About',      num:'01' },
  { href:'#skills',     label:'Skills',     num:'02' },
  { href:'#projects',   label:'Work',       num:'03' },
  { href:'#experience', label:'Journey',    num:'04' },
  { href:'#contact',    label:'Contact',    num:'05' },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 150) setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ delay:0.4, duration:0.8, ease:[0.16,1,0.3,1] }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:500,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding: scrolled ? '0.85rem 3rem' : '1.5rem 3rem',
          background: scrolled ? 'rgba(11,13,19,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition:'all 0.4s ease',
        }}
      >
        {/* Logo — monospace style */}
        <button
          onClick={() => scrollTo('#hero')}
          style={{ background:'none', border:'none', cursor:'none', display:'flex', alignItems:'center', gap:'0.5rem' }}
        >
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', color:'var(--text-3)', letterSpacing:'0.05em' }}>./</span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem', color:'var(--text)', letterSpacing:'0.1em' }}>MB</span>
          <motion.span
            animate={{ opacity:[1,0,1] }}
            transition={{ duration:1.2, repeat:Infinity }}
            style={{ width:2, height:16, background:'var(--accent)', display:'inline-block' }}
          />
        </button>

        {/* Desktop nav — minimal numbered links */}
        <ul style={{ display:'flex', gap:'2.5rem', alignItems:'center' }} className="nav-desktop">
          {links.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background:'none', border:'none', cursor:'none',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem',
                  }}
                >
                  <span style={{
                    fontFamily:'var(--font-mono)', fontSize:'0.62rem',
                    color: isActive ? 'var(--accent)' : 'var(--text-3)',
                    letterSpacing:'0.08em',
                    transition:'color 0.2s',
                  }}>
                    {l.num}
                  </span>
                  <span style={{
                    fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:500,
                    color: isActive ? 'var(--text)' : 'var(--text-2)',
                    transition:'color 0.2s',
                    letterSpacing:'0.02em',
                  }}>
                    {l.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      style={{ width:4, height:4, borderRadius:'50%', background:'var(--accent)' }}
                      transition={{ type:'spring', stiffness:500, damping:30 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Hire me */}
        <a
          href={`mailto:${personal.email}`}
          className="nav-cta-btn"
          style={{
            fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.01em',
            padding:'0.55rem 1.3rem', borderRadius:999,
            border:'1px solid var(--border-h)',
            color:'var(--accent)', background:'var(--accent-dim)',
            transition:'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background='var(--accent)'
            ;(e.currentTarget as HTMLElement).style.color='#0b0d13'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background='var(--accent-dim)'
            ;(e.currentTarget as HTMLElement).style.color='var(--accent)'
          }}
        >
          Hire Me ↗
        </a>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          style={{ display:'none', background:'none', border:'none', cursor:'none', flexDirection:'column', gap:5 }}
          aria-label="Menu"
        >
          <motion.span animate={open ? { rotate:45, y:6.5 } : { rotate:0, y:0 }}
            style={{ display:'block', width:22, height:1.5, background:'var(--text)', transformOrigin:'center' }} />
          <motion.span animate={open ? { opacity:0 } : { opacity:1 }}
            style={{ display:'block', width:22, height:1.5, background:'var(--text)' }} />
          <motion.span animate={open ? { rotate:-45, y:-6.5 } : { rotate:0, y:0 }}
            style={{ display:'block', width:22, height:1.5, background:'var(--text)', transformOrigin:'center' }} />
        </button>
        <motion.div
          style={{
            position:'absolute', bottom:0, left:0, right:0, height:2,
            background:'var(--accent)', transformOrigin:'left', scaleX: progress,
          }}
        />
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:490, background:'rgba(11,13,19,0.97)', display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <ul style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2.5rem' }}>
              {links.map((l, i) => (
                <motion.li key={l.href}
                  initial={{ opacity:0, y:30 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.05*i, duration:0.5, ease:[0.16,1,0.3,1] }}
                >
                  <button
                    onClick={() => { scrollTo(l.href); setOpen(false) }}
                    style={{ background:'none', border:'none', cursor:'none', textAlign:'center' }}
                  >
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--accent)', letterSpacing:'0.12em' }}>{l.num}</div>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(2.5rem,8vw,4rem)', color:'var(--text)', letterSpacing:'-0.01em' }}>{l.label}</div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none!important;}
          .nav-cta-btn{display:none!important;}
          .nav-hamburger{display:flex!important;}
        }
      `}</style>
    </>
  )
}
