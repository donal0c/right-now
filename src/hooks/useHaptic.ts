// Haptic feedback patterns for exercise phases
const hapticPatterns = {
  inhaleStart: [50],
  holdBreath: [30, 50, 30],
  exhaleStart: [40],
  phaseChange: [30],
  exerciseComplete: [50, 100, 50, 100, 100],
  buttonPress: [20],
} as const

type HapticPattern = keyof typeof hapticPatterns

export function triggerHaptic(pattern: HapticPattern): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(hapticPatterns[pattern])
  }
}

export function useHaptic() {
  return { triggerHaptic }
}
