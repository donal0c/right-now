import { useLocation, useRoute } from 'preact-iso'
import { states, hasRefinements, type StateId } from '../data/exercises'

export function Refine() {
  const { route } = useLocation()
  const { params } = useRoute()
  const stateId = params.state as StateId

  const state = states[stateId]

  // If state not found or no refinements, redirect to default exercise
  if (!state || !hasRefinements(stateId)) {
    const exerciseId = state?.defaultExercise || 'paced_breath'
    // Use setTimeout to avoid render-time navigation
    setTimeout(() => route(`/x/${exerciseId}`), 0)
    return null
  }

  const handleSelect = (exerciseId: string) => {
    route(`/x/${exerciseId}`)
  }

  const handleBack = () => {
    route('/')
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 safe-area-inset">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 rounded-full"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-2xl font-semibold text-center mb-2" style={{ color: 'var(--color-text-primary)' }}>
        What kind?
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        Feeling {state.label.toLowerCase()}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {state.refinements!.map((refinement) => (
          <button
            key={refinement.id}
            onClick={() => handleSelect(refinement.exercise)}
            className="flex items-center justify-center p-6 rounded-2xl transition-all active:scale-95"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              minHeight: '64px',
            }}
          >
            <span className="text-lg font-medium">{refinement.label}</span>
          </button>
        ))}
      </div>
    </main>
  )
}
