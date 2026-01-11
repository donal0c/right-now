import { useLocation } from 'preact-iso'
import { path } from '../utils/paths'

export function NotFound() {
  const { route } = useLocation()

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 safe-area-inset">
      <h1 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        Page not found
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        Let's get you back on track.
      </p>
      <button
        onClick={() => route(path('/'))}
        className="px-8 py-4 rounded-full text-lg font-medium"
        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
      >
        Go home
      </button>
    </main>
  )
}
