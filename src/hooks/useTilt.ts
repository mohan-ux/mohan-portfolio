import { useMotionValue, useSpring } from 'framer-motion'

// Mouse-tracked 3D tilt for cards. Pass the returned handlers to
// onMouseMove/onMouseLeave and rX/rY into style.rotateX/rotateY.
export function useTilt(strength = 5) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const rY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * strength)
    rotateX.set(py * -strength)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { rX, rY, handleMove, handleLeave }
}
