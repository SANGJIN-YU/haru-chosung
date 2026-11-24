import { useEffect, useMemo, useRef, useState } from 'react'
import { PUZZLES, type Puzzle } from './puzzles'
import { toChosung } from './lib/hangul'
import { formatCountdown, msUntilNextPuzzle, puzzleNumberAt } from './lib/day'
import {
  MAX_HEARTS,
  applyGuess,
  maxScore,
  newDayState,
  score,
  shareText,
  takeHint,
  type DayState,
  type ItemResult,
} from './lib/game'
import { currentStreak, recordCompletion, type Stats } from './lib/stats'
import { loadDay, loadStats, saveDay, saveStats } from './lib/storage'
import { track } from './lib/track'

const SEEN_HELP_KEY = 'haru-chosung:seen-help'

function todayNumber(): number {
  // Dev builds can preview another day with ?n=3
  if (import.meta.env.DEV) {
    const n = Number(new URLSearchParams(location.search).get('n'))
    if (n > 0) return n
  }
  return puzzleNumberAt(Date.now())
}

export default function App() {
  const [number] = useState(todayNumber)
  const puzzle: Puzzle | undefined = PUZZLES[number - 1]
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(SEEN_HELP_KEY)
    } catch {
      return true
    }
  })
  const [showStats, setShowStats] = useState(false)
  const [stats, setStats] = useState<Stats>(loadStats)

  const closeHelp = () => {
    setShowHelp(false)
    try {
      localStorage.setItem(SEEN_HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="app">
      <header className="top">
        <button className="icon-btn" onClick={() => setShowHelp(true)} aria-label="게임 방법">
          ?
        </button>
        <div className="brand">
          <h1>하루초성</h1>
          <span className="sub">#{number} · 하루 한 판</span>
        </div>
        <button className="icon-btn" onClick={() => setShowStats(true)} aria-label="내 기록">
          🔥{currentStreak(stats, number)}
        </button>
      </header>

      {puzzle ? (
        <Game key={number} number={number} puzzle={puzzle} stats={stats} onStats={setStats} />
      ) : (
        <section className="card empty">
          <p>오늘의 문제를 준비하고 있어요.</p>
          <Countdown />
        </section>
      )}

      {showHelp && <HelpModal onClose={closeHelp} />}
      {showStats && (
        <StatsModal stats={stats} today={number} onClose={() => setShowStats(false)} />
      )}
    </div>
  )
}

function Game({
  number,
  puzzle,
  stats,
  onStats,
}: {
  number: number
  puzzle: Puzzle
  stats: Stats
  onStats: (s: Stats) => void
}) {
  const [state, setState] = useState<DayState>(
    () => loadDay(number) ?? newDayState(number, puzzle),
  )
  const firstOpen = state.results.findIndex((r) => r === null)
  const [active, setActive] = useState(firstOpen === -1 ? 0 : firstOpen)
  const [guess, setGuess] = useState('')
  const [flash, setFlash] = useState<'wrong' | 'repeat' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => saveDay(state), [state])

  useEffect(() => {
    if (!state.done) return
    const next = recordCompletion(stats, number, score(state), score(state) === maxScore(puzzle))
    if (next !== stats) {
      saveStats(next)
      onStats(next)
      track('complete', { n: number, score: score(state) })
    }
  }, [state.done]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const { state: next, outcome } = applyGuess(state, puzzle, active, guess)
    if (outcome === 'ignored') return
    if (outcome === 'correct') {
      setGuess('')
      setFlash(null)
      const nextOpen = next.results.findIndex((r, i) => r === null && i !== active)
      if (nextOpen !== -1) setActive(nextOpen)
    } else {
      setFlash(outcome)
      setTimeout(() => setFlash(null), 600)
      if (outcome === 'wrong') setGuess('')
    }
    setState(next)
    inputRef.current?.focus()
  }

  const select = (i: number) => {
    if (state.done || state.results[i] !== null) return
    setActive(i)
    setGuess('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <main>
      <section className="theme card">
        <span className="label">오늘의 주제</span>
        <strong>{puzzle.theme}</strong>
        <Hearts hearts={state.hearts} />
      </section>

      <ol className="items">
        {puzzle.items.map((item, i) => {
          const result = state.results[i]
          const isActive = !state.done && i === active && result === null
          return (
            <li
              key={i}
              className={`item card ${isActive ? 'active' : ''} ${result ?? ''} ${
                isActive && flash ? `flash-${flash}` : ''
              }`}
              onClick={() => select(i)}
            >
              <div className="item-head">
                <span className="step">{i + 1}고개</span>
                <Tiles
                  chosung={toChosung(item.answer)}
                  answer={result ? item.answer : null}
                  result={result}
                />
                <ResultBadge result={result} />
              </div>

              {(state.hintUsed[i] || state.done) && <p className="clue">💡 {item.clue}</p>}

              {state.wrong[i].length > 0 && (
                <p className="wrong-list">
                  {state.wrong[i].map((w) => (
                    <s key={w}>{w}</s>
                  ))}
                </p>
              )}

              {isActive && (
                <form className="guess" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
                  <input
                    ref={inputRef}
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="정답 입력"
                    autoComplete="off"
                    enterKeyHint="done"
                    aria-label={`${i + 1}고개 정답 입력`}
                  />
                  <button type="submit" className="primary">
                    확인
                  </button>
                  {!state.hintUsed[i] && (
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => setState(takeHint(state, i))}
                    >
                      힌트
                    </button>
                  )}
                </form>
              )}
              {isActive && flash === 'repeat' && <p className="note">이미 넣어 본 답이에요.</p>}
            </li>
          )
        })}
      </ol>

      {state.done && <ResultPanel state={state} puzzle={puzzle} stats={stats} number={number} />}
    </main>
  )
}

function Tiles({
  chosung,
  answer,
  result,
}: {
  chosung: string
  answer: string | null
  result: ItemResult | null
}) {
  const chars = Array.from(answer ?? chosung)
  return (
    <span className={`tiles ${answer ? 'open' : ''} ${result ?? ''}`} aria-label={answer ?? chosung}>
      {chars.map((c, i) => (
        <span key={i} className="tile">
          {c}
        </span>
      ))}
    </span>
  )
}

function ResultBadge({ result }: { result: ItemResult | null }) {
  if (!result) return <span className="badge" />
  const map: Record<ItemResult, string> = { star: '⭐', hint: '💡', miss: '🌫️' }
  return <span className="badge">{map[result]}</span>
}

function Hearts({ hearts }: { hearts: number }) {
  return (
    <span className="hearts" aria-label={`남은 기회 ${hearts}개`}>
      {Array.from({ length: MAX_HEARTS }, (_, i) => (
        <span key={i} className={i < hearts ? 'on' : 'off'}>
          {i < hearts ? '❤️' : '🤍'}
        </span>
      ))}
    </span>
  )
}

function ResultPanel({
  state,
  puzzle,
  stats,
  number,
}: {
  state: DayState
  puzzle: Puzzle
  stats: Stats
  number: number
}) {
  const [copied, setCopied] = useState(false)
  const streak = currentStreak(stats, number)
  const url = location.origin + location.pathname
  const text = useMemo(() => shareText(state, puzzle, streak, url), [state, puzzle, streak, url])
  const s = score(state)
  const max = maxScore(puzzle)
  const headline =
    s === max ? '완벽해요!' : s >= max * 0.7 ? '잘했어요!' : s > 0 ? '아깝네요!' : '내일 다시 도전!'

  const share = async () => {
    track('share', { n: number })
    if (navigator.share) {
      try {
        await navigator.share({ text })
        return
      } catch {
        /* cancelled or unsupported: fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('아래 내용을 복사해 공유하세요', text)
    }
  }

  return (
    <section className="result card">
      <h2>{headline}</h2>
      <p className="score">
        {s}
        <small>/{max}점</small>
      </p>
      <pre className="share-preview">{text}</pre>
      <button className="primary big" onClick={share}>
        {copied ? '복사했어요! 단톡방에 붙여 넣으세요' : '결과 공유하기'}
      </button>
      <div className="next">
        <span>다음 문제까지</span>
        <Countdown />
      </div>
    </section>
  )
}

function Countdown() {
  const [left, setLeft] = useState(() => msUntilNextPuzzle(Date.now()))
  useEffect(() => {
    const id = setInterval(() => {
      const ms = msUntilNextPuzzle(Date.now())
      setLeft(ms)
      if (ms < 1000) setTimeout(() => location.reload(), 1500)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <strong className="countdown">{formatCountdown(left)}</strong>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal card" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="게임 방법" onClose={onClose}>
      <ul className="help">
        <li>매일 자정, 모두에게 같은 <b>주제 하나와 초성 다섯 고개</b>가 열려요.</li>
        <li>
          초성을 보고 주제에 맞는 단어를 맞혀요. 예: 주제 <b>과일</b>, <b>ㅅㄱ</b> → 사과
        </li>
        <li>틀리면 하트가 하나 줄어요. 하트 {MAX_HEARTS}개를 다 쓰면 오늘 판은 끝!</li>
        <li>막히면 힌트를 볼 수 있어요. 힌트 없이 맞히면 ⭐ 2점, 힌트를 보면 💡 1점.</li>
        <li>매일 이어서 풀면 🔥 연속 기록이 쌓여요. 결과는 정답을 가리고 공유돼요.</li>
      </ul>
      <button className="primary big" onClick={onClose}>
        시작하기
      </button>
    </Modal>
  )
}

function StatsModal({ stats, today, onClose }: { stats: Stats; today: number; onClose: () => void }) {
  const cells: [string, number][] = [
    ['푼 날', stats.played],
    ['만점', stats.perfect],
    ['연속', currentStreak(stats, today)],
    ['최고 연속', stats.maxStreak],
  ]
  return (
    <Modal title="내 기록" onClose={onClose}>
      <div className="stat-grid">
        {cells.map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="muted">기록은 이 기기의 브라우저에만 저장돼요.</p>
    </Modal>
  )
}
