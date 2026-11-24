// Validates puzzle data. Run: npm run check:puzzles
import { PUZZLES, type Puzzle } from '../src/puzzles.ts'
import { PRACTICE_SETS } from '../src/practice.ts'
import { isHangulSyllable, toChosung } from '../src/lib/hangul.ts'

const errors: string[] = []
const warnings: string[] = []
const seen = new Map<string, number>()

function check(p: Puzzle, tag: string, d: number) {
  if (!p.theme.trim()) errors.push(`${tag}: 주제가 비어 있음`)
  if (p.items.length !== 5) errors.push(`${tag}: 문제 수 ${p.items.length}개 (5개여야 함)`)
  const chosungs = new Set<string>()
  p.items.forEach((it) => {
    const chars = Array.from(it.answer)
    if (chars.length < 2 || chars.length > 5) errors.push(`${tag}: '${it.answer}' 길이 2~5자 아님`)
    if (!chars.every(isHangulSyllable)) errors.push(`${tag}: '${it.answer}' 한글 음절만 허용`)
    if (!it.clue.trim()) errors.push(`${tag}: '${it.answer}' 힌트 없음`)
    if (it.clue.includes(it.answer)) errors.push(`${tag}: '${it.answer}' 힌트에 정답이 들어 있음`)
    const c = toChosung(it.answer)
    if (chosungs.has(c)) errors.push(`${tag}: 초성 '${c}' 이 같은 날 중복`)
    chosungs.add(c)
    for (const a of it.accept ?? []) {
      if (toChosung(a) !== c) errors.push(`${tag}: 허용답 '${a}' 의 초성이 '${c}' 와 다름`)
    }
    const prev = seen.get(it.answer)
    if (prev !== undefined) warnings.push(`'${it.answer}' 가 #${prev + 1}, #${d + 1} 에 중복 출제`)
    seen.set(it.answer, d)
  })
}

PUZZLES.forEach((p, d) => check(p, `#${d + 1} ${p.theme}`, d))
// Practice sets are numbered after the daily ones so an overlap shows as a duplicate.
PRACTICE_SETS.forEach((p, i) => check(p, `연습${i + 1} ${p.theme}`, PUZZLES.length + i))

for (const w of warnings) console.warn('경고:', w)
for (const e of errors) console.error('오류:', e)
console.log(`${PUZZLES.length}일치 + 연습 ${PRACTICE_SETS.length}세트 검사: 오류 ${errors.length}개, 경고 ${warnings.length}개`)
if (errors.length || warnings.length) process.exit(1)
