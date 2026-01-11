import { useRef, useEffect, useCallback } from 'preact/hooks'
import type { BreathingPhase } from '../data/exercises'

interface BreathingOrbProps {
  isPlaying: boolean
  breathingPattern?: BreathingPhase[]
  onPhaseChange?: (phase: BreathingPhase | null) => void
  reducedMotion?: boolean
}

export function BreathingOrb({
  isPlaying,
  breathingPattern,
  onPhaseChange,
  reducedMotion = false,
}: BreathingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const loopRef = useRef<boolean>(false)

  const animatePhase = useCallback(
    async (phase: BreathingPhase): Promise<void> => {
      const orb = orbRef.current
      if (!orb || reducedMotion) return

      const isInhale = phase.phase === 'inhale'
      const isExhale = phase.phase === 'exhale'

      const keyframes: Keyframe[] = isInhale
        ? [
            { transform: 'scale(1)', opacity: 0.85 },
            { transform: 'scale(1.4)', opacity: 1 },
          ]
        : isExhale
          ? [
              { transform: 'scale(1.4)', opacity: 1 },
              { transform: 'scale(1)', opacity: 0.85 },
            ]
          : [
              // hold - subtle pulse
              { transform: 'scale(1.4)', opacity: 1 },
              { transform: 'scale(1.38)', opacity: 0.98 },
              { transform: 'scale(1.4)', opacity: 1 },
            ]

      const easing = isInhale
        ? 'cubic-bezier(0.4, 0, 0.2, 1)'
        : isExhale
          ? 'cubic-bezier(0.4, 0, 0.6, 1)'
          : 'ease-in-out'

      return new Promise((resolve) => {
        animationRef.current = orb.animate(keyframes, {
          duration: phase.durationMs,
          easing,
          fill: 'forwards',
        })
        animationRef.current.onfinish = () => resolve()
        animationRef.current.oncancel = () => resolve()
      })
    },
    [reducedMotion]
  )

  const runBreathingLoop = useCallback(async () => {
    if (!breathingPattern || breathingPattern.length === 0) return

    loopRef.current = true

    while (loopRef.current) {
      for (const phase of breathingPattern) {
        if (!loopRef.current) break
        onPhaseChange?.(phase)
        await animatePhase(phase)
      }
    }

    onPhaseChange?.(null)
  }, [breathingPattern, animatePhase, onPhaseChange])

  useEffect(() => {
    if (isPlaying && breathingPattern) {
      runBreathingLoop()
    } else {
      loopRef.current = false
      animationRef.current?.cancel()
    }

    return () => {
      loopRef.current = false
      animationRef.current?.cancel()
    }
  }, [isPlaying, breathingPattern, runBreathingLoop])

  // Reset scale when not playing
  useEffect(() => {
    if (!isPlaying && orbRef.current) {
      orbRef.current.style.transform = 'scale(1)'
      orbRef.current.style.opacity = '0.85'
    }
  }, [isPlaying])

  return (
    <div
      ref={orbRef}
      className="breathing-orb"
      style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 30% 30%, var(--color-primary-light) 0%, var(--color-primary) 50%, var(--color-primary-dark) 100%)',
        boxShadow: '0 0 60px 30px rgba(74, 144, 194, 0.3), 0 0 100px 60px rgba(74, 144, 194, 0.15)',
        willChange: 'transform, opacity',
        opacity: 0.85,
      }}
      role="img"
      aria-label="Breathing guide animation"
    />
  )
}
