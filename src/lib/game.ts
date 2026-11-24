import type { Puzzle } from '../puzzles'
import { normalizeGuess } from './hangul'

export const MAX_HEARTS = 3

/** star: solved without hint · hint: solved after hint · miss: not solved */
export type ItemResult = 'star' | 'hint' | 'miss'

export interface DayState {
  puzzleNumber: number
  hearts: number
  hintUsed: boolean[]
  results: (ItemResult | null)[]
  /** Wrong guesses typed, kept so a reload shows the same screen. */
  wrong: string[][]
  done: boolean
}

export function newDayState(puzzleNumber: number, puzzle: Puzzle): DayState {
  const n = puzzle.items.length
  return {
    puzzleNumber,
    hearts: MAX_HEARTS,
    hintUsed: Array(n).fill(false),
    results: Array(n).fill(null),
    wrong: Array.from({ length: n }, () => []),
    done: false,
  }
}

export function isCorrect(puzzle: Puzzle, index: number, guess: string): boolean {
  const item = puzzle.items[index]
  const g = normalizeGuess(guess)
  return [item.answer, ...(item.accept ?? [])].some((a) => normalizeGuess(a) === g)
}

function finishIfOver(state: DayState): DayState {
  const allSolved = state.results.every((r) => r !== null)
  if (!allSolved && state.hearts > 0) return state
  return {
    ...state,
    results: state.results.map((r) => r ?? 'miss'),
    done: true,
  }
}

export type GuessOutcome = 'correct' | 'wrong' | 'repeat' | 'ignored'

export function applyGuess(
  state: DayState,
  puzzle: Puzzle,
  index: number,
  guess: string,
): { state: DayState; outcome: GuessOutcome } {
  const g = normalizeGuess(guess)
  if (state.done || state.results[index] !== null || g === '') {
    return { state, outcome: 'ignored' }
  }
  if (isCorrect(puzzle, index, g)) {
    const results = [...state.results]
    results[index] = state.hintUsed[index] ? 'hint' : 'star'
    return { state: finishIfOver({ ...state, results }), outcome: 'correct' }
  }
  if (state.wrong[index].includes(g)) return { state, outcome: 'repeat' }
  const wrong = state.wrong.map((w, i) => (i === index ? [...w, g] : w))
  return {
    state: finishIfOver({ ...state, wrong, hearts: state.hearts - 1 }),
    outcome: 'wrong',
  }
}

export function takeHint(state: DayState, index: number): DayState {
  if (state.done || state.results[index] !== null) return state
  const hintUsed = state.hintUsed.map((h, i) => (i === index ? true : h))
  return { ...state, hintUsed }
}

const POINTS: Record<ItemResult, number> = { star: 2, hint: 1, miss: 0 }

export function score(state: DayState): number {
  return state.results.reduce((sum, r) => sum + (r ? POINTS[r] : 0), 0)
}

export function maxScore(puzzle: Puzzle): number {
  return puzzle.items.length * POINTS.star
}

const EMOJI: Record<ItemResult, string> = { star: '⭐', hint: '💡', miss: '🌫️' }

export function resultEmojis(results: (ItemResult | null)[]): string {
  return results.map((r) => (r ? EMOJI[r] : '⬜')).join('')
}

export function heartsText(hearts: number): string {
  return '❤️'.repeat(hearts) + '🤍'.repeat(MAX_HEARTS - hearts)
}

/** Share text that never reveals answers. `title` is the first line. */
export function shareText(
  state: DayState,
  puzzle: Puzzle,
  title: string,
  streak: number,
  url: string,
): string {
  const lines = [
    title,
    `${resultEmojis(state.results)}  ${score(state)}/${maxScore(puzzle)}점`,
    heartsText(state.hearts),
  ]
  if (streak >= 2) lines.push(`🔥 ${streak}일 연속`)
  lines.push(url)
  return lines.join('\n')
}
