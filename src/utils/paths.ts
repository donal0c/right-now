// Base path utility for GitHub Pages deployment
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function path(p: string): string {
  return `${base}${p}`
}
