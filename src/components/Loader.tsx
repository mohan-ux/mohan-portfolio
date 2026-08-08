import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CarLoader2D } from './CarLoader2D'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface LoaderProps {
  progress: number
  done: boolean
}

// Matches the car-drive CSS animation duration (7s) plus a beat for the
// exhaust puffs to finish fading.
const CAR_SEQUENCE_MS = 7800

const PHRASES = ['CALIBRATING INTERFACE', 'SYNTHESIZING EXPERIENCE', 'COMPILING PORTFOLIO', 'READY']
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01'

// Cycles phrases with a cipher-decode effect — characters resolve
// left-to-right out of noise instead of sliding/fading in.
function DecodeText() {
  const [display, setDisplay] = useState(PHRASES[0])

  useEffect(() => {
    let cancelled = false
    let raf = 0
    let phraseIdx = 0

    function runPhrase() {
      const target = PHRASES[phraseIdx % PHRASES.length]
      const start = performance.now()
      const duration = 500

      function tick(now: number) {
        if (cancelled) return
        const t = Math.min((now - start) / duration, 1)
        const revealCount = Math.floor(t * target.length)
        let out = ''
        for (let i = 0; i < target.length; i++) {
          if (i < revealCount || target[i] === ' ') out += target[i]
          else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
        setDisplay(out)
        if (t < 1) raf = requestAnimationFrame(tick)
        else setTimeout(() => { if (!cancelled) { phraseIdx++; runPhrase() } }, 800)
      }
      raf = requestAnimationFrame(tick)
    }

    runPhrase()
    return () => { cancelled = true; cancelAnimationFrame(raf) }
  }, [])

  return <span>{display}</span>
}

export default function Loader({ progress, done }: LoaderProps) {
  const pct = Math.round(progress)
  const reducedMotion = useReducedMotion()
  const [sequenceComplete, setSequenceComplete] = useState(false)

  // The car drive always plays out in full — it isn't tied 1:1 to real
  // asset-load time (that's normal for a branded preloader). We only exit
  // once BOTH the intro has finished AND the page is actually ready.
  // Reduced-motion skips the animation entirely and exits as soon as ready.
  useEffect(() => {
    if (reducedMotion) return
    const t = setTimeout(() => setSequenceComplete(true), CAR_SEQUENCE_MS)
    return () => clearTimeout(t)
  }, [reducedMotion])

  const shouldExit = done && (sequenceComplete || reducedMotion)

  return (
    <AnimatePresence>
      {!shouldExit && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'var(--bg)',
            overflow: 'hidden',
          }}
        >
          {!reducedMotion && <CarLoader2D />}

          <motion.div
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: '3rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.2em' }}>
              <DecodeText />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>
              {pct}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
