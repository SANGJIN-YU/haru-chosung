import { useEffect, useMemo, useRef, useState } from 'react'
import { PUZZLES, type Puzzle } from './puzzles'
import { toChosung } from './lib/hangul'
import { formatCountdown, msUntilNextPuzzle, puzzleDateLabel, puzzleNumberAt } from './lib/day'
import {
  MAX_HEARTS,
  applyGuess,
  maxScore,
  newDayState,
  resultEmojis,
  score,
  shareText,
  takeHint,
  type DayState,
  type ItemResult,
} from './lib/game'
import { currentStreak, recordCompletion, type Stats } from './lib/stats'
import { loadName, loadPlay, loadStats, saveName, savePlay, saveStats } from './lib/storage'
import { challengeUrl, parseChallenge, type Challenge } from './lib/challenge'
import { buildPracticeRound } from './lib/practice-round'
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

type View = 'today' | 'archive' | 'practice'
type Mode = 'daily' | 'archive' | 'practice'

export default function App() {
  const [number] = useState(todayNumber)
  const puzzle: Puzzle | undefined = PUZZLES[number - 1]
  const [challenge] = useState<Challenge | null>(() =>
    parseChallenge(location.search, Math.min(number, PUZZLES.length)),
  )
  const [view, setView] = useState<View>(() =>
    challenge && challenge.puzzleNumber < number ? 'archive' : 'today',
  )
  const [archivePick, setArchivePick] = useState<number | null>(() =>
    challenge && challenge.puzzleNumber < number ? challenge.puzzleNumber : null,
  )
  const [practiceRound, setPracticeRound] = useState(0)
  const [showHelp, setShowHelp] = useState(() => {
    if (challenge) return false
    try {
      return !localStorage.getItem(SEEN_HELP_KEY)
    } catch {
      return true
    }
  })
  const [showStats, setShowStats] = useState(false)
  const [stats, setStats] = useState<Stats>(loadStats)

  useEffect(() => {
    if (challenge) track('challenge_open', { n: challenge.puzzleNumber })
  }, [challenge])

  const closeHelp = () => {
    setShowHelp(false)
    try {
      localStorage.setItem(SEEN_HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const go = (next: View) => {
    setView(next)
    if (next === 'archive') setArchivePick(null)
    if (next === 'practice') setPracticeRound((r) => r + 1)
    track('view', { view: next })
    window.scrollTo(0, 0)
  }

  const archivePuzzle = archivePick ? PUZZLES[archivePick - 1] : undefined

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

      <nav className="tabs" aria-label="모드">
        {(
          [
            ['today', '오늘의 문제'],
            ['archive', '지난 문제'],
            ['practice', '연습'],
          ] as [View, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            className={view === v ? 'on' : ''}
            aria-current={view === v ? 'page' : undefined}
            onClick={() => go(v)}
          >
            {label}
          </button>
        ))}
      </nav>

      {view === 'today' &&
        (puzzle ? (
          <Game
            key={`d${number}`}
            mode="daily"
            number={number}
            puzzle={puzzle}
            stats={stats}
            onStats={setStats}
            challenge={challenge?.puzzleNumber === number ? challenge : null}
            onPractice={() => go('practice')}
          />
        ) : (
          <section className="card empty">
            <p>오늘의 문제를 준비하고 있어요.</p>
            <Countdown />
          </section>
        ))}

      {view === 'archive' &&
        (archivePick && archivePuzzle ? (
          <>
            <button className="back" onClick={() => setArchivePick(null)}>
              ← 지난 문제 목록
            </button>
            <Game
              key={`a${archivePick}`}
              mode="archive"
              number={archivePick}
              puzzle={archivePuzzle}
              stats={stats}
              challenge={challenge?.puzzleNumber === archivePick ? challenge : null}
              onPractice={() => go('practice')}
            />
          </>
        ) : (
          <ArchiveList today={number} stats={stats} onPick={setArchivePick} onPractice={() => go('practice')} />
        ))}

      {view === 'practice' && (
        <Practice key={practiceRound} today={number} onNext={() => setPracticeRound((r) => r + 1)} />
      )}

      {showHelp && <HelpModal onClose={closeHelp} />}
      {showStats && (
        <StatsModal stats={stats} today={number} onClose={() => setShowStats(false)} />
      )}
    </div>
  )
}

function Practice({ today, onNext }: { today: number; onNext: () => void }) {
  const [puzzle] = useState(() => buildPracticeRound(today))
  useEffect(() => track('practice_start'), [])
  return <Game mode="practice" number={0} puzzle={puzzle} onNext={onNext} />
}

function ArchiveList({
  today,
  stats,
  onPick,
  onPractice,
}: {
  today: number
  stats: Stats
  onPick: (n: number) => void
  onPractice: () => void
}) {
  const last = Math.min(today - 1, PUZZLES.length)
  if (last < 1) {
    return (
      <section className="card empty">
        <p>아직 지난 문제가 없어요. 오늘이 첫날이에요!</p>
        <p className="muted">내일부터 놓친 날의 문제를 여기서 풀 수 있어요.</p>
        <button className="primary big" onClick={onPractice}>
          연습 모드로 더 풀기
        </button>
      </section>
    )
  }
  const rows = Array.from({ length: last }, (_, i) => last - i)
  return (
    <section>
      <p className="muted archive-note">놓친 날의 문제를 풀 수 있어요. 연속 기록에는 들어가지 않아요.</p>
      <ul className="archive">
        {rows.map((n) => {
          const daily = stats.history[n]
          const play = loadPlay(n)
          const s = daily ?? (play?.done ? score(play) : undefined)
          return (
            <li key={n}>
              <button className="card archive-row" onClick={() => onPick(n)}>
                <span className="num">#{n}</span>
                <span className="meta">
                  <strong>{PUZZLES[n - 1].theme}</strong>
                  <small>{puzzleDateLabel(n)}</small>
                </span>
                <span className={`pill ${s === undefined ? 'todo' : 'done'}`}>
                  {s === undefined ? (play ? '푸는 중' : '안 풂') : `${s}점`}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Game({
  mode,
  number,
  puzzle,
  stats,
  onStats,
  challenge,
  onPractice,
  onNext,
}: {
  mode: Mode
  number: number
  puzzle: Puzzle
  stats?: Stats
  onStats?: (s: Stats) => void
  challenge?: Challenge | null
  onPractice?: () => void
  onNext?: () => void
}) {
  const [state, setState] = useState<DayState>(
    () => (mode === 'practice' ? null : loadPlay(number)) ?? newDayState(number, puzzle),
  )
  const firstOpen = state.results.findIndex((r) => r === null)
  const [active, setActive] = useState(firstOpen === -1 ? 0 : firstOpen)
  const [guess, setGuess] = useState('')
  const [flash, setFlash] = useState<'wrong' | 'repeat' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode !== 'practice') savePlay(state)
  }, [state, mode])

  useEffect(() => {
    if (!state.done) return
    track('complete', { mode, n: number, score: score(state) })
    if (mode !== 'daily' || !stats || !onStats) return
    const next = recordCompletion(stats, number, score(state), score(state) === maxScore(puzzle))
    if (next !== stats) {
      saveStats(next)
      onStats(next)
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
      {challenge && <ChallengeBanner challenge={challenge} mine={state.done ? score(state) : null} />}
      <section className="theme card">
        <span className="label">
          {mode === 'daily' ? '오늘의 주제' : mode === 'archive' ? `#${number} · ${puzzleDateLabel(number)}의 주제` : '연습 모드'}
        </span>
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
              {item.theme && <span className="item-theme">{item.theme}</span>}
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

      {state.done &&
        (mode === 'practice' ? (
          <section className="result card">
            <h2>연습 {score(state)}/{maxScore(puzzle)}점</h2>
            <p className="muted">연습 기록은 저장되지 않아요. 원하는 만큼 계속 풀 수 있어요.</p>
            <button className="primary big" onClick={onNext}>
              다음 연습 문제
            </button>
          </section>
        ) : (
          <ResultPanel
            mode={mode}
            state={state}
            puzzle={puzzle}
            streak={mode === 'daily' && stats ? currentStreak(stats, number) : 0}
            number={number}
            onPractice={onPractice}
          />
        ))}
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

function ChallengeBanner({ challenge, mine }: { challenge: Challenge; mine: number | null }) {
  const who = challenge.name ? `${challenge.name} 님` : '친구'
  let verdict = '같은 문제를 풀고 점수를 비교해 보세요.'
  if (mine !== null) {
    verdict =
      mine > challenge.score
        ? `내 점수 ${mine}점, 이겼어요! 🎉`
        : mine === challenge.score
          ? `내 점수 ${mine}점, 비겼어요!`
          : `내 점수 ${mine}점, 아쉽게 졌어요.`
  }
  return (
    <section className="challenge card" aria-live="polite">
      <span className="label">도전장</span>
      <p>
        <b>{who}</b>의 기록 {resultEmojis(challenge.results)} <b>{challenge.score}점</b>
      </p>
      <p className="muted">{verdict}</p>
    </section>
  )
}

function ResultPanel({
  mode,
  state,
  puzzle,
  streak,
  number,
  onPractice,
}: {
  mode: 'daily' | 'archive'
  state: DayState
  puzzle: Puzzle
  streak: number
  number: number
  onPractice?: () => void
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const [name, setName] = useState(loadName)
  const url = location.origin + location.pathname
  const title = `하루초성 #${number} · ${puzzle.theme}${mode === 'archive' ? ' (지난 문제)' : ''}`
  const s = score(state)
  const max = maxScore(puzzle)
  const text = useMemo(
    () => shareText(state, puzzle, title, streak, url),
    [state, puzzle, title, streak, url],
  )
  const headline =
    s === max ? '완벽해요!' : s >= max * 0.7 ? '잘했어요!' : s > 0 ? '아깝네요!' : '내일 다시 도전!'

  const send = async (body: string, kind: 'share' | 'challenge') => {
    track(kind, { n: number })
    if (navigator.share) {
      try {
        await navigator.share({ text: body })
        return
      } catch {
        /* cancelled or unsupported: fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(body)
      setCopied(kind)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      window.prompt('아래 내용을 복사해 공유하세요', body)
    }
  }

  const challengeText = () => {
    const link = challengeUrl(url, {
      puzzleNumber: number,
      score: s,
      results: state.results.map((r) => r ?? 'miss'),
      name: name.trim(),
    })
    const who = name.trim() ? `${name.trim()}의 기록` : '내 기록'
    return `하루초성 #${number} ${who}은 ${s}점! 같은 문제로 이겨 볼래?\n${resultEmojis(state.results)}\n${link}`
  }

  return (
    <section className="result card">
      <h2>{headline}</h2>
      <p className="score">
        {s}
        <small>/{max}점</small>
      </p>
      <pre className="share-preview">{text}</pre>
      <button className="primary big" onClick={() => send(text, 'share')}>
        {copied === 'share' ? '복사했어요! 단톡방에 붙여 넣으세요' : '결과 공유하기'}
      </button>

      <div className="duel">
        <label htmlFor="duel-name">친구에게 도전장 보내기</label>
        <div className="duel-row">
          <input
            id="duel-name"
            value={name}
            maxLength={12}
            placeholder="내 이름 (선택)"
            onChange={(e) => {
              setName(e.target.value)
              saveName(e.target.value)
            }}
          />
          <button className="ghost" onClick={() => send(challengeText(), 'challenge')}>
            {copied === 'challenge' ? '복사됨' : '도전장 보내기'}
          </button>
        </div>
        <p className="muted">링크를 연 친구는 같은 문제를 풀고 내 점수와 비교해요.</p>
      </div>

      <button className="ghost wide" onClick={onPractice}>
        연습 모드로 더 풀기
      </button>
      {mode === 'daily' && (
        <div className="next">
          <span>다음 문제까지</span>
          <Countdown />
        </div>
      )}
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
        <li>더 풀고 싶다면 <b>지난 문제</b>와 <b>연습</b> 탭에서 계속할 수 있어요.</li>
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
