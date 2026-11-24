import type { ItemResult } from './game'

/** A friend's result, carried in the link they shared. No server involved. */
export interface Challenge {
  puzzleNumber: number
  score: number
  results: ItemResult[]
  name: string
}

const CODE: Record<ItemResult, string> = { star: 's', hint: 'h', miss: 'm' }
const DECODE: Record<string, ItemResult> = { s: 'star', h: 'hint', m: 'miss' }

export function challengeUrl(base: string, c: Challenge): string {
  const params = new URLSearchParams({
    c: String(c.puzzleNumber),
    s: String(c.score),
    r: c.results.map((r) => CODE[r]).join(''),
  })
  if (c.name) params.set('by', c.name)
  return `${base}?${params}`
}

/** Returns null for missing or malformed links instead of throwing. */
export function parseChallenge(search: string, maxPuzzle: number): Challenge | null {
  const p = new URLSearchParams(search)
  const puzzleNumber = Number(p.get('c'))
  const score = Number(p.get('s'))
  const r = p.get('r') ?? ''
  if (!Number.isInteger(puzzleNumber) || puzzleNumber < 1 || puzzleNumber > maxPuzzle) return null
  if (!Number.isInteger(score) || score < 0 || score > 10) return null
  if (!/^[shm]{5}$/.test(r)) return null
  const name = (p.get('by') ?? '').trim().slice(0, 12)
  return { puzzleNumber, score, results: Array.from(r, (ch) => DECODE[ch]), name }
}
