import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [text, setText] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window) return

    let x = 0, y = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px,${y}px)`
      }
    }

    const lerp = () => {
      ringX += (x - ringX) * 0.15
      ringY += (y - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px,${ringY}px)`
      }
      raf = requestAnimationFrame(lerp)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(lerp)

    const addHover = () => setHovering(true)
    const removeHover = () => setHovering(false)
    const addText = () => { setHovering(true); setText(true) }
    const removeText = () => { setHovering(false); setText(false) }

    const clickables = document.querySelectorAll('a, button, [data-cursor]')
    const projectItems = document.querySelectorAll('[data-cursor="view"]')

    clickables.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })
    projectItems.forEach(el => {
      el.addEventListener('mouseenter', addText)
      el.addEventListener('mouseleave', removeText)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          pointerEvents: 'none',
          width: hovering ? 0 : 6, height: hovering ? 0 : 6,
          background: 'var(--accent)',
          borderRadius: '50%',
          marginLeft: hovering ? 0 : -3,
          marginTop: hovering ? 0 : -3,
          transition: 'width 0.2s, height 0.2s, margin 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          pointerEvents: 'none',
          width: hovering ? 50 : 32,
          height: hovering ? 50 : 32,
          border: `1px solid ${hovering ? 'var(--accent)' : 'var(--border-h)'}`,
          borderRadius: '50%',
          marginLeft: hovering ? -25 : -16,
          marginTop: hovering ? -25 : -16,
          transition: 'width 0.25s, height 0.25s, margin 0.25s, border-color 0.25s',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.55rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          color: 'var(--accent)',
          opacity: text ? 1 : 0.8,
        }}
      >
        {text && 'VIEW'}
      </div>
    </>
  )
}
