import { useReducedMotion } from '../hooks/useReducedMotion'

// A soft, slowly drifting light blob behind section content — atmosphere
// that operates almost subconsciously rather than competing for attention.
export function AmbientGlow({
  color = 'var(--accent)',
  top = '20%',
  left = '20%',
  size = 420,
}: {
  color?: string
  top?: string
  left?: string
  size?: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top, left,
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        opacity: 0.12,
        filter: 'blur(90px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translate(-50%, -50%)',
        animation: reducedMotion ? 'none' : 'ambient-drift 22s ease-in-out infinite',
      }}
    />
  )
}
