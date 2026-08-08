import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

// Animates a numeric prefix (e.g. "8.5", "4", "2") from 0 to its target
// once scrolled into view, keeping any trailing suffix (e.g. "+") static.
export function CountUp({ value, duration = 1.2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState('0')

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay((target * eased).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, decimals, duration])

  return <span ref={ref}>{display}{suffix}</span>
}
