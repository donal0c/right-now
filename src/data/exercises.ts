// Exercise data layer for Right Now app
// Defines exercises, protocols, state mappings, and duration options

// ============================================================================
// Types
// ============================================================================

export type ExerciseId =
  | 'phys_sigh'
  | 'paced_breath'
  | 'ground_54321'
  | 'defusion_thought'
  | 'panoramic_gaze'
  | 'pmr_quick'

export type StateId =
  | 'anxious'
  | 'overwhelmed'
  | 'angry'
  | 'restless'
  | 'low'
  | 'foggy'
  | 'overstimulated'
  | 'tense'

export type RefinementId =
  | 'panicky'
  | 'ruminating'
  | 'snap'
  | 'stewing'
  | 'cant_start'
  | 'cant_focus'

export interface ProtocolStep {
  instruction: string
  durationMs?: number // for timed steps like breathing phases
}

export interface BreathingPhase {
  phase: 'inhale' | 'hold' | 'exhale'
  durationMs: number
  instruction: string
}

export interface Exercise {
  id: ExerciseId
  name: string
  shortName: string
  description: string
  defaultDurationSec: number
  durationOptions: number[] // in seconds
  protocol: ProtocolStep[]
  breathingPattern?: BreathingPhase[] // for breathing exercises
  category: 'breathing' | 'grounding' | 'cognitive' | 'somatic'
}

export interface EmotionalState {
  id: StateId
  label: string
  icon?: string // emoji or icon identifier
  refinements?: Refinement[]
  defaultExercise: ExerciseId
}

export interface Refinement {
  id: RefinementId
  label: string
  exercise: ExerciseId
}

// ============================================================================
// Exercises
// ============================================================================

export const exercises: Record<ExerciseId, Exercise> = {
  phys_sigh: {
    id: 'phys_sigh',
    name: 'Physiological Sigh',
    shortName: 'Sigh',
    description: 'Rapid calming through double-inhale sighing breath',
    defaultDurationSec: 60,
    durationOptions: [30, 60, 120],
    category: 'breathing',
    protocol: [
      { instruction: 'Inhale deeply through your nose' },
      { instruction: 'Take a short second inhale on top' },
      { instruction: 'Long, slow exhale through your mouth' },
      { instruction: 'Repeat' },
    ],
    breathingPattern: [
      { phase: 'inhale', durationMs: 2000, instruction: 'Inhale through nose' },
      { phase: 'inhale', durationMs: 1000, instruction: 'Second inhale' },
      { phase: 'exhale', durationMs: 6000, instruction: 'Slow exhale' },
    ],
  },

  paced_breath: {
    id: 'paced_breath',
    name: 'Paced Breathing',
    shortName: 'Breathe',
    description: 'Slow, rhythmic breathing at 6 breaths per minute',
    defaultDurationSec: 120,
    durationOptions: [60, 120, 300],
    category: 'breathing',
    protocol: [
      { instruction: 'Inhale slowly for 4 seconds' },
      { instruction: 'Exhale slowly for 6 seconds' },
      { instruction: 'Continue at a steady pace' },
    ],
    breathingPattern: [
      { phase: 'inhale', durationMs: 4000, instruction: 'Inhale' },
      { phase: 'exhale', durationMs: 6000, instruction: 'Exhale' },
    ],
  },

  ground_54321: {
    id: 'ground_54321',
    name: '5-4-3-2-1 Grounding',
    shortName: 'Ground',
    description: 'Sensory grounding to anchor in the present moment',
    defaultDurationSec: 120,
    durationOptions: [60, 120, 180],
    category: 'grounding',
    protocol: [
      { instruction: 'Notice 5 things you can see' },
      { instruction: 'Notice 4 things you can feel' },
      { instruction: 'Notice 3 things you can hear' },
      { instruction: 'Notice 2 things you can smell' },
      { instruction: 'Notice 1 thing you can taste (or take a breath)' },
    ],
  },

  defusion_thought: {
    id: 'defusion_thought',
    name: 'Cognitive Defusion',
    shortName: 'Defuse',
    description: 'Create distance from overwhelming thoughts',
    defaultDurationSec: 90,
    durationOptions: [60, 90, 120],
    category: 'cognitive',
    protocol: [
      { instruction: 'Identify the thought troubling you' },
      { instruction: 'Say to yourself: "I\'m having the thought that..."' },
      { instruction: 'Repeat the thought with this prefix' },
      { instruction: 'Notice any shift in how it feels' },
    ],
  },

  panoramic_gaze: {
    id: 'panoramic_gaze',
    name: 'Panoramic Gaze',
    shortName: 'Gaze',
    description: 'Wide-angle vision to activate calm alertness',
    defaultDurationSec: 60,
    durationOptions: [30, 60, 120],
    category: 'somatic',
    protocol: [
      { instruction: 'Relax your eyes' },
      { instruction: 'Soften your focus' },
      { instruction: 'Expand your field of view to the periphery' },
      { instruction: 'Take in the whole scene without focusing' },
    ],
  },

  pmr_quick: {
    id: 'pmr_quick',
    name: 'Quick Muscle Release',
    shortName: 'Release',
    description: 'Progressive tension and release for physical calm',
    defaultDurationSec: 120,
    durationOptions: [60, 120, 180],
    category: 'somatic',
    protocol: [
      { instruction: 'Raise your shoulders to your ears, hold, release' },
      { instruction: 'Make tight fists, hold, release' },
      { instruction: 'Clench your jaw, hold, release' },
      { instruction: 'Notice the relaxation spreading' },
    ],
  },
}

// ============================================================================
// Emotional States & Mappings
// ============================================================================

export const states: Record<StateId, EmotionalState> = {
  anxious: {
    id: 'anxious',
    label: 'Anxious',
    defaultExercise: 'phys_sigh',
    refinements: [
      { id: 'panicky', label: 'Panicky', exercise: 'phys_sigh' },
      { id: 'ruminating', label: 'Ruminating', exercise: 'ground_54321' },
    ],
  },

  overwhelmed: {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    defaultExercise: 'paced_breath',
  },

  angry: {
    id: 'angry',
    label: 'Angry',
    defaultExercise: 'paced_breath',
    refinements: [
      { id: 'snap', label: 'About to snap', exercise: 'paced_breath' },
      { id: 'stewing', label: 'Stewing', exercise: 'defusion_thought' },
    ],
  },

  restless: {
    id: 'restless',
    label: 'Restless',
    defaultExercise: 'pmr_quick', // Physical release for agitation
  },

  low: {
    id: 'low',
    label: 'Low',
    defaultExercise: 'phys_sigh', // Activating breath to boost energy
  },

  foggy: {
    id: 'foggy',
    label: 'Foggy',
    defaultExercise: 'panoramic_gaze',
    refinements: [
      { id: 'cant_start', label: "Can't start", exercise: 'defusion_thought' },
      { id: 'cant_focus', label: "Can't focus", exercise: 'panoramic_gaze' },
    ],
  },

  overstimulated: {
    id: 'overstimulated',
    label: 'Overstimulated',
    defaultExercise: 'panoramic_gaze',
  },

  tense: {
    id: 'tense',
    label: 'Tense',
    defaultExercise: 'pmr_quick',
  },
}

// ============================================================================
// Helper Functions
// ============================================================================

/** Get an exercise by ID */
export function getExercise(id: ExerciseId): Exercise {
  return exercises[id]
}

/** Get a state by ID */
export function getState(id: StateId): EmotionalState | undefined {
  return states[id]
}

/** Check if a state has refinement options */
export function hasRefinements(stateId: StateId): boolean {
  const state = states[stateId]
  return !!state?.refinements && state.refinements.length > 0
}

/** Get the exercise for a state (uses default if no refinement) */
export function getExerciseForState(stateId: StateId, refinementId?: RefinementId): Exercise {
  const state = states[stateId]
  if (!state) {
    return exercises.paced_breath // fallback
  }

  if (refinementId && state.refinements) {
    const refinement = state.refinements.find((r) => r.id === refinementId)
    if (refinement) {
      return exercises[refinement.exercise]
    }
  }

  return exercises[state.defaultExercise]
}

/** Get all states as an ordered array for display */
export function getAllStates(): EmotionalState[] {
  return [
    states.anxious,
    states.overwhelmed,
    states.angry,
    states.restless,
    states.low,
    states.foggy,
    states.overstimulated,
    states.tense,
  ]
}

/** Get all exercises as an array */
export function getAllExercises(): Exercise[] {
  return Object.values(exercises)
}

/** Format duration for display (e.g., "2:00") */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/** Format duration as label (e.g., "30s", "2m") */
export function formatDurationLabel(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const mins = seconds / 60
  return mins === Math.floor(mins) ? `${mins}m` : `${mins.toFixed(1)}m`
}
