import { useLocation, useRoute } from 'preact-iso'
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import {
  exercises,
  type ExerciseId,
  type BreathingPhase,
  formatDuration,
  formatDurationLabel,
} from '../data/exercises'
import { BreathingOrb } from '../components/BreathingOrb'
import { triggerHaptic } from '../hooks/useHaptic'

type PlayerState = 'playing' | 'paused' | 'completed'

export function Exercise() {
  const { route } = useLocation()
  const { params, query } = useRoute()
  const exerciseId = params.exerciseId as ExerciseId
  const initialDuration = query.dur ? parseInt(query.dur, 10) : undefined

  const exercise = exercises[exerciseId]

  // Player state
  const [selectedDuration, setSelectedDuration] = useState(
    initialDuration || exercise?.defaultDurationSec || 60
  )
  const [timeRemaining, setTimeRemaining] = useState(selectedDuration)
  const [playerState, setPlayerState] = useState<PlayerState>('playing')
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  // Refs
  const timerRef = useRef<number | null>(null)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reset time when duration changes
  useEffect(() => {
    setTimeRemaining(selectedDuration)
    setPlayerState('playing')
  }, [selectedDuration])

  // Timer logic
  useEffect(() => {
    if (playerState === 'playing' && timeRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((t) => {
          if (t <= 1) {
            setPlayerState('completed')
            triggerHaptic('exerciseComplete')
            return 0
          }
          return t - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [playerState, timeRemaining])

  // Phase change handler with haptics
  const handlePhaseChange = useCallback((phase: BreathingPhase | null) => {
    setCurrentPhase(phase)
    if (phase) {
      if (phase.phase === 'inhale') {
        triggerHaptic('inhaleStart')
      } else if (phase.phase === 'exhale') {
        triggerHaptic('exhaleStart')
      } else {
        triggerHaptic('holdBreath')
      }
    }
  }, [])

  // Control handlers
  const handlePlayPause = () => {
    triggerHaptic('buttonPress')
    if (playerState === 'playing') {
      setPlayerState('paused')
    } else if (playerState === 'paused') {
      setPlayerState('playing')
    }
  }

  const handleDone = () => {
    triggerHaptic('buttonPress')
    route('/')
  }

  const handleRestart = () => {
    triggerHaptic('buttonPress')
    setTimeRemaining(selectedDuration)
    setPlayerState('playing')
  }

  const handleDurationSelect = (duration: number) => {
    triggerHaptic('buttonPress')
    setSelectedDuration(duration)
  }

  const handleToggleInfo = () => {
    triggerHaptic('buttonPress')
    if (!showInfo && playerState === 'playing') {
      setPlayerState('paused')
    }
    setShowInfo(!showInfo)
  }

  // Not found state
  if (!exercise) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <p style={{ color: 'var(--color-text-secondary)' }}>Exercise not found</p>
        <button
          onClick={() => route('/')}
          className="mt-4 px-6 py-3 rounded-full"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          Go back
        </button>
      </main>
    )
  }

  // Completed state
  if (playerState === 'completed') {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6 safe-area-inset">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Well done
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {exercise.shortName} complete
          </p>
        </div>

        <BreathingOrb
          isPlaying={false}
          reducedMotion={reducedMotion}
        />

        <div className="flex flex-col gap-4 mt-12 w-full max-w-xs">
          <button
            onClick={handleRestart}
            className="px-8 py-4 rounded-full text-lg font-medium"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
            }}
          >
            Go again
          </button>
          <button
            onClick={handleDone}
            className="px-8 py-4 rounded-full text-lg font-medium"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Done
          </button>
        </div>
      </main>
    )
  }

  // Active player state
  const progress = ((selectedDuration - timeRemaining) / selectedDuration) * 100

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 safe-area-inset relative">
      {/* Close button */}
      <button
        onClick={handleDone}
        className="absolute top-4 right-4 p-2 rounded-full"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Close"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Exercise name with info button */}
      <div className="flex items-center gap-2 mb-2">
        <h1
          className="text-xl font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {exercise.name}
        </h1>
        <button
          onClick={handleToggleInfo}
          className="p-1 rounded-full"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="How to do this exercise"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </button>
      </div>

      {/* Phase instruction */}
      <p
        className="text-base mb-8 h-6"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {currentPhase?.instruction || (playerState === 'paused' ? 'Paused' : '')}
      </p>

      {/* Breathing orb */}
      <BreathingOrb
        isPlaying={playerState === 'playing'}
        breathingPattern={exercise.breathingPattern}
        onPhaseChange={handlePhaseChange}
        reducedMotion={reducedMotion}
      />

      {/* Timer */}
      <p
        className="text-4xl font-light mt-8 mb-2 tabular-nums"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {formatDuration(timeRemaining)}
      </p>

      {/* Progress bar */}
      <div
        className="w-48 h-1 rounded-full mb-8 overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--color-primary)',
          }}
        />
      </div>

      {/* Duration selector */}
      <div className="flex gap-2 mb-8">
        {exercise.durationOptions.map((dur) => (
          <button
            key={dur}
            onClick={() => handleDurationSelect(dur)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor:
                selectedDuration === dur
                  ? 'var(--color-primary)'
                  : 'var(--color-bg-secondary)',
              color:
                selectedDuration === dur ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            {formatDurationLabel(dur)}
          </button>
        ))}
      </div>

      {/* Play/Pause control */}
      <button
        onClick={handlePlayPause}
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        aria-label={playerState === 'playing' ? 'Pause' : 'Resume'}
      >
        {playerState === 'playing' ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="var(--color-text-primary)"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="var(--color-text-primary)"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Info Modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleToggleInfo}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                How to: {exercise.name}
              </h2>
              <button
                onClick={handleToggleInfo}
                className="p-1 -mr-1 -mt-1"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p
              className="text-sm mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {exercise.description}
            </p>

            <ol className="space-y-2">
              {exercise.protocol.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>{step.instruction}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={handleToggleInfo}
              className="w-full mt-6 py-3 rounded-full font-medium"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
