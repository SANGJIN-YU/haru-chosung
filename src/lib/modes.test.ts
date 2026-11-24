import { describe, expect, it } from 'vitest'
import { challengeUrl, parseChallenge } from './challenge'
import { buildPracticeRound, practicePool } from './practice-round'
import { toChosung } from './hangul'
import { PUZZLES } from '../puzzles'
import { PRACTICE_SETS } from '../practice'
import { puzzleDateLabel } from './day'

describe('challenge links', () => {
  it('round-trips through a URL', () => {
    const url = challengeUrl('https://x.dev/', {
      puzzleNumber: 3,
      score: 7,
      results: ['star', 'hint', 'miss', 'star', 'hint'],
      name: '상진',
    })
    const c = parseChallenge(new URL(url).search, 10)
    expect(c).toEqual({ puzzleNumber: 3, score: 7, results: ['star', 'hint', 'miss', 'star', 'hint'], name: '상진' })
  })
  it('rejects future puzzles and malformed values', () => {
    expect(parseChallenge('?c=11&s=5&r=sssss', 10)).toBeNull()
    expect(parseChallenge('?c=2&s=99&r=sssss', 10)).toBeNull()
    expect(parseChallenge('?c=2&s=5&r=xx', 10)).toBeNull()
    expect(parseChallenge('', 10)).toBeNull()
  })
})

describe('practice', () => {
  it('only uses daily puzzles that have already opened', () => {
    const pool = practicePool(3)
    const dailyAnswers = new Set(PUZZLES.slice(2).flatMap((p) => p.items.map((i) => i.answer)))
    expect(pool.length).toBe((PRACTICE_SETS.length + 2) * 5)
    expect(pool.some((i) => dailyAnswers.has(i.answer))).toBe(false)
  })
  it('builds 5 items with distinct 초성 and a theme each', () => {
    let seed = 1
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let k = 0; k < 50; k++) {
      const round = buildPracticeRound(1, rand)
      expect(round.items).toHaveLength(5)
      expect(new Set(round.items.map((i) => toChosung(i.answer))).size).toBe(5)
      expect(round.items.every((i) => i.theme)).toBe(true)
      expect(new Set(round.items.map((i) => i.theme)).size).toBe(5)
    }
  })
})

it('labels puzzle dates in Korean', () => {
  expect(puzzleDateLabel(1)).toBe('11월 24일')
  expect(puzzleDateLabel(39)).toBe('1월 1일')
})
