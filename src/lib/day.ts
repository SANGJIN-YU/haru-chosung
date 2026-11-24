const DAY_MS = 86_400_000
const KST_OFFSET_MS = 9 * 60 * 60 * 1000

/** Puzzle #1 opens at 00:00 KST on this date. */
export const LAUNCH_DATE = '2026-11-24'

function kstDayNumber(ms: number): number {
  return Math.floor((ms + KST_OFFSET_MS) / DAY_MS)
}

const LAUNCH_DAY = Math.floor(Date.parse(`${LAUNCH_DATE}T00:00:00Z`) / DAY_MS)

/** 1-based puzzle number for the given moment, in Korea time. */
export function puzzleNumberAt(ms: number): number {
  return kstDayNumber(ms) - LAUNCH_DAY + 1
}

/** Milliseconds until the next 00:00 KST. */
export function msUntilNextPuzzle(ms: number): number {
  const shifted = ms + KST_OFFSET_MS
  return DAY_MS - (shifted % DAY_MS)
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

/** "12월 24일" for puzzle #31. */
export function puzzleDateLabel(puzzleNumber: number): string {
  const d = new Date(Date.parse(`${LAUNCH_DATE}T00:00:00Z`) + (puzzleNumber - 1) * DAY_MS)
  return `${d.getUTCMonth() + 1}월 ${d.getUTCDate()}일`
}
