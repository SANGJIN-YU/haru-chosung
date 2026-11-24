const CHO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const

const SYLLABLE_START = 0xac00
const SYLLABLE_END = 0xd7a3

export function isHangulSyllable(ch: string): boolean {
  const code = ch.codePointAt(0) ?? 0
  return code >= SYLLABLE_START && code <= SYLLABLE_END
}

/** "붕어빵" -> "ㅂㅇㅃ". Non-syllable characters are kept as-is. */
export function toChosung(word: string): string {
  return Array.from(word)
    .map((ch) => {
      if (!isHangulSyllable(ch)) return ch
      const idx = Math.floor((ch.codePointAt(0)! - SYLLABLE_START) / 588)
      return CHO[idx]
    })
    .join('')
}

/** Strip whitespace and invisible characters so "붕어 빵 " matches "붕어빵". */
export function normalizeGuess(input: string): string {
  return input.normalize('NFC').replace(/[\s​]/g, '')
}
