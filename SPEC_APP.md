# SPEC_APP.md

## App Specification — Calm State Micro-Intervention App

### Purpose
This app provides instant, low-friction access to scientifically grounded micro-exercises (30s–5m) that help users regulate their mental and emotional state in the moment.

The app prioritises:
- speed of access
- simplicity
- emotional safety
- visual calm

It is not a wellness platform, tracker, or social product.

---

## Core Principles
1. Instant over informative – act first, explain later.
2. One decision per screen – never overwhelm.
3. State-based navigation – user chooses how they feel.
4. Minimal text, gentle guidance.
5. No accounts, no onboarding.

---

## Target Platform
- Android-first via Progressive Web App (PWA)
- Built with Vite
- Modern mobile browsers
- Offline-capable after first load

---

## Routes & Navigation
- / → State Picker
- /s/:state → Optional refine
- /x/:exerciseId?dur=SECONDS → Exercise Player (auto-start)
- /resume → Resume last exercise
- /about → Disclaimers & sources

---

## Screens

### State Picker
Prompt: “How do you feel?”

States:
- Anxious
- Overwhelmed
- Angry
- Restless
- Low
- Foggy
- Overstimulated
- Tense

Large icon grid, no scrolling.

---

### Refine (Conditional)
Shown only where useful:
- Anxious → Panicky | Ruminating
- Angry → About to snap | Stewing
- Foggy → Can’t start | Can’t focus

---

### Exercise Player
- Fullscreen
- Central breathing orb / focus ring
- Minimal guidance text
- Duration pills (30s / 2m / 5m)
- Pause / Resume / Done
- Haptics & optional sound

---

## Visual Design
- Calm, Headspace-like
- Soft gradients
- Rounded shapes
- Low saturation
- Friendly typography (Inter / Nunito)

---

## PWA Access
- Installable
- Standalone display
- Offline shell
- App shortcuts:
  - Calm now (60s)
  - Slow breath (2m)
  - Ground (2m)

---

## Data & Privacy
- No accounts
- LocalStorage only
- No analytics in v1

---

## Out of Scope
- Profiles
- Notifications
- Gamification
- Feeds
