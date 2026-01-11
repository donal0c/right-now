import { useLocation } from 'preact-iso'
import { path } from '../utils/paths'

export function About() {
  const { route } = useLocation()

  const handleBack = () => {
    route(path('/'))
  }

  return (
    <main className="flex-1 flex flex-col p-6 safe-area-inset">
      <button
        onClick={handleBack}
        className="self-start p-2 -ml-2 rounded-full mb-4"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
        About Right Now
      </h1>

      <div className="space-y-6" style={{ color: 'var(--color-text-secondary)' }}>
        <section>
          <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            What is this?
          </h2>
          <p className="text-base leading-relaxed">
            Right Now provides instant access to short, science-backed exercises that help you
            regulate your emotional state in the moment. No accounts, no tracking, just simple
            tools when you need them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            The exercises
          </h2>
          <p className="text-base leading-relaxed">
            Each exercise is based on established techniques from clinical psychology,
            neuroscience, and mindfulness practices. They're designed to work quickly
            and require no prior experience.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Important note
          </h2>
          <p className="text-base leading-relaxed">
            This app is not a substitute for professional mental health support.
            If you're experiencing persistent distress, please reach out to a
            qualified healthcare provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Privacy
          </h2>
          <p className="text-base leading-relaxed">
            Your data stays on your device. We don't collect analytics, track usage,
            or require any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Sources
          </h2>
          <ul className="text-base leading-relaxed space-y-2 list-disc list-inside">
            <li>
              <strong>Physiological Sigh</strong> — Stanford research on controlled breathing
              and stress reduction (Balban et al., Cell Reports Medicine, 2023)
            </li>
            <li>
              <strong>Paced Breathing</strong> — Heart rate variability and vagal tone
              research; standard clinical practice for anxiety
            </li>
            <li>
              <strong>5-4-3-2-1 Grounding</strong> — Widely used in clinical psychology
              for anxiety and dissociation management
            </li>
            <li>
              <strong>Cognitive Defusion</strong> — From Acceptance and Commitment Therapy
              (ACT) developed by Steven Hayes
            </li>
            <li>
              <strong>Panoramic Gaze</strong> — Research on optic flow and autonomic
              nervous system regulation
            </li>
            <li>
              <strong>Progressive Muscle Relaxation</strong> — Developed by Edmund Jacobson
              (1930s); well-established evidence base
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
