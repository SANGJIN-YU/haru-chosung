import { PUZZLES, type Puzzle, type PuzzleItem } from '../puzzles'
import { PRACTICE_SETS } from '../practice'
import { toChosung } from './hangul'

/** Items practice may use: practice-only sets plus daily puzzles that have already opened. */
export function practicePool(todayNumber: number): PuzzleItem[] {
  const opened = PUZZLES.slice(0, Math.max(0, todayNumber - 1))
  return [...PRACTICE_SETS, ...opened].flatMap((p) =>
    p.items.map((item) => ({ ...item, theme: p.theme })),
  )
}

/** Five random items with distinct 초성, each labelled with its own theme. */
export function buildPracticeRound(
  todayNumber: number,
  random: () => number = Math.random,
  size = 5,
): Puzzle {
  const pool = practicePool(todayNumber)
  // Fisher–Yates shuffle, then take the first items with unused 초성.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  // Prefer one item per theme; allow repeats only if the pool runs short.
  const used = new Set<string>()
  const themes = new Set<string>()
  const items: PuzzleItem[] = []
  for (const allowSameTheme of [false, true]) {
    for (const item of pool) {
      if (items.length === size) break
      const c = toChosung(item.answer)
      if (used.has(c) || (!allowSameTheme && themes.has(item.theme ?? ''))) continue
      used.add(c)
      themes.add(item.theme ?? '')
      items.push(item)
    }
  }
  return { theme: '주제 섞어 풀기', items }
}
