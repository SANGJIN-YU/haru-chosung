import { describe, expect, it } from 'vitest'
import { applyGuess, newDayState, score, shareText, takeHint } from './game'
import { toChosung, normalizeGuess } from './hangul'
import { puzzleNumberAt, msUntilNextPuzzle } from './day'
import { EMPTY_STATS, currentStreak, recordCompletion } from './stats'
import type { Puzzle } from '../puzzles'

const P: Puzzle = {
  theme: '테스트',
  items: [
    { answer: '사과', clue: 'a' },
    { answer: '딸기', clue: 'b' },
    { answer: '수박', clue: 'c' },
    { answer: '포도', clue: 'd' },
    { answer: '소파', clue: 'e', accept: ['쇼파'] },
  ],
}

describe('hangul', () => {
  it('extracts chosung including double consonants', () => {
    expect(toChosung('붕어빵')).toBe('ㅂㅇㅃ')
    expect(toChosung('썰매')).toBe('ㅆㅁ')
  })
  it('normalizes spaces', () => expect(normalizeGuess(' 사 과 ')).toBe('사과'))
})

describe('day', () => {
  it('puzzle #1 starts at 00:00 KST on launch day', () => {
    expect(puzzleNumberAt(Date.parse('2026-11-23T15:00:00Z'))).toBe(1)
    expect(puzzleNumberAt(Date.parse('2026-11-23T14:59:59Z'))).toBe(0)
    expect(puzzleNumberAt(Date.parse('2026-11-24T15:00:00Z'))).toBe(2)
  })
  it('counts down to KST midnight', () => {
    expect(msUntilNextPuzzle(Date.parse('2026-11-24T14:00:00Z'))).toBe(3_600_000)
  })
})

describe('game', () => {
  it('scores star, hint and accepted spellings', () => {
    let s = newDayState(1, P)
    s = applyGuess(s, P, 0, '사과').state
    s = takeHint(s, 1)
    s = applyGuess(s, P, 1, '딸기').state
    s = applyGuess(s, P, 4, '쇼파').state
    expect(s.results).toEqual(['star', 'hint', null, null, 'star'])
    expect(score(s)).toBe(5)
  })
  it('wrong guesses cost hearts, repeats do not, and 3 misses end the day', () => {
    let s = newDayState(1, P)
    s = applyGuess(s, P, 2, '수건').state
    const r = applyGuess(s, P, 2, '수건')
    expect(r.outcome).toBe('repeat')
    expect(r.state.hearts).toBe(2)
    s = applyGuess(s, P, 2, '수영').state
    s = applyGuess(s, P, 3, '포크').state
    expect(s.done).toBe(true)
    expect(s.results.every((x) => x === 'miss')).toBe(true)
  })
  it('share text hides answers', () => {
    let s = newDayState(7, P)
    for (const [i, it] of P.items.entries()) s = applyGuess(s, P, i, it.answer).state
    const text = shareText(s, P, '하루초성 #7 · 테스트', 3, 'https://example.com/')
    expect(s.done).toBe(true)
    expect(text).toContain('#7')
    expect(text).toContain('🔥 3일 연속')
    for (const it of P.items) expect(text).not.toContain(it.answer)
  })
})

describe('stats', () => {
  it('builds and breaks streaks', () => {
    let st = recordCompletion(EMPTY_STATS, 1, 10, true)
    st = recordCompletion(st, 2, 6, false)
    expect(st.streak).toBe(2)
    expect(recordCompletion(st, 2, 0, false)).toBe(st)
    expect(currentStreak(st, 3)).toBe(2)
    expect(currentStreak(st, 4)).toBe(0)
    st = recordCompletion(st, 5, 4, false)
    expect(st.streak).toBe(1)
    expect(st.maxStreak).toBe(2)
  })
})
