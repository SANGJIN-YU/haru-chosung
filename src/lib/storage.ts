import type { DayState } from './game'
import { EMPTY_STATS, type Stats } from './stats'

const DAY_KEY = 'haru-chosung:day'
const STATS_KEY = 'haru-chosung:stats'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or storage full: the game still works for this visit.
  }
}

export function loadDay(puzzleNumber: number): DayState | null {
  const saved = read<DayState>(DAY_KEY)
  return saved && saved.puzzleNumber === puzzleNumber ? saved : null
}

export const saveDay = (state: DayState) => write(DAY_KEY, state)
export const loadStats = (): Stats => ({ ...EMPTY_STATS, ...read<Stats>(STATS_KEY) })
export const saveStats = (stats: Stats) => write(STATS_KEY, stats)
