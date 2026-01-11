# Research Findings - January 2026

Research conducted via 6 parallel Opus agents analyzing wellness app UI patterns, typography, icons, colors, tech stack, and animations.

---

## 1. Typography Recommendation

### Primary: Nunito
- Rounded terminals create softer, friendlier appearance
- Well-balanced, approachable character
- Weight range 200-900
- Geometric sans-serif with humanist qualities

### Alternative: Lexend
- Research-backed for improved reading performance
- Reduces cognitive load - perfect for wellness context
- Variable font with weight and width axes

### Why NOT Inter
- Too clinical/utilitarian for wellness
- Commonly associated with productivity tools (Figma, GitHub)
- Lacks soft, approachable character

### Typography System
```css
:root {
  --font-primary: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Type Scale (Minor Third - 1.2 ratio) */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

---

## 2. Icon Approach

### Strategy: Hybrid
- **Phosphor Icons** for general UI (navigation, actions, settings)
- **Custom abstract shapes** for 8 emotional states

### Why Custom Icons for Emotions
- Culturally neutral (faces interpreted differently across cultures)
- Aligns with calm, soft aesthetic
- Users project own meaning onto abstract forms
- More sophisticated, less infantilizing

### Emotional State Icon Concepts

| State | Shape | Visual Metaphor |
|-------|-------|-----------------|
| Anxious | Scattered dots/particles | Dispersed energy, racing thoughts |
| Overwhelmed | Overlapping circles/waves | Too much at once |
| Angry | Sharp angular burst | Contained heat |
| Restless | Wavy lines/squiggle | Inability to settle |
| Low | Drooping curve/crescent | Weighted down |
| Foggy | Soft blur/cloud | Unclear, diffuse |
| Overstimulated | Radiating lines/starburst | Too much input |
| Tense | Tight coil/spring | Held tight |

### Style Guidelines
- Stroke weight: 1.5-2px
- Corners: Rounded (except Angry)
- Single muted tone per state
- 24x24px base grid
- Format: SVG

---

## 3. Color Palette

### Light Mode

```css
:root {
  /* Primary */
  --color-primary: #4A90C2;
  --color-primary-light: #7BB3D6;
  --color-primary-dark: #2E6A96;

  /* Secondary */
  --color-sage: #8FAE94;
  --color-sage-light: #B8CCBB;
  --color-lavender: #B8A9C9;
  --color-coral: #D4A59A;

  /* Backgrounds */
  --color-bg-primary: #FAF8F5;
  --color-bg-secondary: #F5F0EB;
  --color-bg-tertiary: #EDE7E0;

  /* Text */
  --color-text-primary: #2D3436;
  --color-text-secondary: #5A6368;
  --color-text-tertiary: #8B9499;

  /* Borders */
  --color-border-light: #E8E2DB;
  --color-border-medium: #D9D1C8;

  /* Semantic */
  --color-success: #5A9E6B;
  --color-warning: #C4935A;
  --color-error: #C47070;

  /* Gradients */
  --gradient-bg: linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 100%);
  --gradient-calm: linear-gradient(135deg, #EEF4F9 0%, #E4EDF5 50%, #F0ECF5 100%);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Primary (desaturated) */
    --color-primary: #6BA3CB;
    --color-primary-light: #8FBFDF;
    --color-primary-dark: #4A7A9E;

    /* Backgrounds */
    --color-bg-primary: #121418;
    --color-bg-secondary: #1A1D22;
    --color-bg-tertiary: #22262D;

    /* Text */
    --color-text-primary: #F0F2F4;
    --color-text-secondary: #B8BEC4;
    --color-text-tertiary: #7A8490;
  }
}
```

### Color Psychology Rationale
- Blue: Trust, peace, stability
- Sage Green: Healing, growth, nature
- Soft Lavender: Tranquility, meditation
- Warm neutrals: Safety, comfort

---

## 4. Tech Stack (Validated January 2026)

### Recommended Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Build Tool | Vite | 7.x (stable, not beta 8) |
| PWA Plugin | vite-plugin-pwa | 1.2.x |
| UI Framework | Preact | 11.x |
| Routing | preact-iso | latest |
| Styling | Tailwind CSS | 4.x |
| Storage | LocalStorage | native |
| TypeScript | TypeScript | 5.x |

### Why Preact over React
- 3KB vs 40KB bundle size
- Same API (hooks, JSX)
- Faster parsing on mobile devices
- preact-iso provides tiny router (~1KB)

### Why Tailwind CSS
- Automatic dead code elimination
- No runtime overhead
- Built-in dark mode
- Container queries support

### PWA Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calm State',
        short_name: 'CalmState',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ]
})
```

---

## 5. Animation Approach

### Primary: CSS + Web Animations API
- Transform + opacity only (GPU accelerated)
- Web Animations API for phase control

### Why NOT Lottie
- ~150KB+ library overhead
- Overkill for simple breathing orb
- CSS handles organic animations efficiently

### Breathing Orb CSS

```css
.breathing-orb {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    #7dd3fc 0%,
    #0284c7 50%,
    #0c4a6e 100%
  );
  box-shadow:
    0 0 60px 30px rgba(56, 189, 248, 0.3),
    0 0 100px 60px rgba(56, 189, 248, 0.15);
  will-change: transform, opacity;
}

@keyframes breathe-paced {
  0% { transform: scale(1); opacity: 0.8; }
  40% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

.breathing-orb--paced {
  animation: breathe-paced 10s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .breathing-orb { animation: none; }
}
```

### Web Animations API for Phase Control

```javascript
class BreathingAnimator {
  constructor(element) {
    this.element = element;
  }

  async pacedBreathing(cycles = 5) {
    for (let i = 0; i < cycles; i++) {
      await this.inhale(4000);
      await this.exhale(6000);
    }
  }

  inhale(duration, targetScale = 1.5) {
    return this.animate([
      { transform: 'scale(1)', opacity: 0.8 },
      { transform: `scale(${targetScale})`, opacity: 1 }
    ], { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });
  }

  exhale(duration) {
    return this.animate([
      { transform: 'scale(1.5)', opacity: 1 },
      { transform: 'scale(1)', opacity: 0.8 }
    ], { duration, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'forwards' });
  }

  animate(keyframes, options) {
    return new Promise(resolve => {
      const anim = this.element.animate(keyframes, options);
      anim.onfinish = resolve;
    });
  }
}
```

### Haptic Feedback

```javascript
const hapticPatterns = {
  inhaleStart: [50],
  holdBreath: [30, 50, 30],
  exhaleStart: [40],
  exerciseComplete: [50, 100, 50, 100, 100]
};

function triggerHaptic(pattern) {
  if ('vibrate' in navigator) {
    navigator.vibrate(hapticPatterns[pattern]);
  }
}
```

---

## 6. Touch Targets & Accessibility

### Minimum Sizes
- WCAG AAA: 44x44px
- For stressed users: 56-64px recommended
- Gaps between targets: 12-16px minimum

### Key Patterns
- Large emotion buttons (64-80px)
- Full-width cards on mobile
- Avoid precision interactions
- Generous debouncing for double-taps
- Always visible escape/back button

---

## 7. UI Patterns from Leading Apps

### From Headspace
- Custom rounded typography
- Warm yellow + blue palette
- Illustrated characters
- Category-based navigation

### From Calm
- Nature-focused imagery
- Dark blue/teal palette
- Sleep stories as differentiator
- More fluid/ambient experience

### From Balance
- Black background, cream text
- Heavy personalization
- Animated transitions

### Common Patterns
- Warm neutrals (not pure white)
- Soft gradients over flat colors
- Generous whitespace
- One decision per screen
- Max 2 screens to reach content
