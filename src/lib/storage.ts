import type { DayState } from './game'
import { EMPTY_STATS, type Stats } from './stats'

const LEGACY_DAY_KEY = 'haru-chosung:day'
const PLAY_PREFIX = 'haru-chosung:play:'
const STATS_KEY = 'haru-chosung:stats'
const NAME_KEY = 'haru-chosung:name'

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

/** Saved progress for one puzzle (today's or a past one). */
export function loadPlay(puzzleNumber: number): DayState | null {
  const saved = read<DayState>(PLAY_PREFIX + puzzleNumber)
  if (saved) return saved
  // v0.1 kept only today's game under a single key.
  const legacy = read<DayState>(LEGACY_DAY_KEY)
  return legacy && legacy.puzzleNumber === puzzleNumber ? legacy : null
}

export const savePlay = (state: DayState) => write(PLAY_PREFIX + state.puzzleNumber, state)
export const loadStats = (): Stats => ({ ...EMPTY_STATS, ...read<Stats>(STATS_KEY) })
export const saveStats = (stats: Stats) => write(STATS_KEY, stats)
export const loadName = (): string => read<string>(NAME_KEY) ?? ''
export const saveName = (name: string) => write(NAME_KEY, name)
