import { useLocation } from 'preact-iso'
import { getAllStates, type StateId } from '../data/exercises'
import { path } from '../utils/paths'

// Import icons
import anxiousIcon from '../assets/icons/anxious.png'
import overwhelmedIcon from '../assets/icons/overwhelmed.png'
import angryIcon from '../assets/icons/angry.png'
import restlessIcon from '../assets/icons/restless.png'
import lowIcon from '../assets/icons/low.png'
import foggyIcon from '../assets/icons/foggy.png'
import overstimulatedIcon from '../assets/icons/overstimulated.png'
import tenseIcon from '../assets/icons/tense.png'

const stateIcons: Record<StateId, string> = {
  anxious: anxiousIcon,
  overwhelmed: overwhelmedIcon,
  angry: angryIcon,
  restless: restlessIcon,
  low: lowIcon,
  foggy: foggyIcon,
  overstimulated: overstimulatedIcon,
  tense: tenseIcon,
}

const states = getAllStates()

export function Home() {
  const { route } = useLocation()

  const handleSelect = (stateId: string) => {
    route(path(`/s/${stateId}`))
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 safe-area-inset">
      <h1 className="text-2xl font-semibold text-center mb-8" style={{ color: 'var(--color-text-primary)' }}>
        How do you feel?
      </h1>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => handleSelect(state.id)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              minHeight: '100px',
            }}
          >
            <img
              src={stateIcons[state.id]}
              alt=""
              className="w-12 h-12 mb-2 object-contain"
            />
            <span className="text-base font-medium">{state.label}</span>
          </button>
        ))}
      </div>

      <a
        href={path('/about')}
        className="mt-12 text-sm"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        About this app
      </a>
    </main>
  )
}
