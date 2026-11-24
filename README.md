# 하루초성

매일 자정(한국 시간) 모두에게 같은 **주제 하나 + 초성 다섯 고개**가 열리는 한국어 데일리 퍼즐.

- 틀리면 하트 -1 (총 3개), 힌트 없이 맞히면 ⭐ 2점, 힌트 보면 💡 1점
- 연속 기록(🔥)과 최고 기록은 브라우저 localStorage에 저장 (로그인 없음)
- 결과는 정답을 가린 이모지 카드로 공유 (모바일은 공유 시트, PC는 클립보드 복사)

## 개발

```bash
npm install
npm run dev            # http://localhost:5173  (개발 모드에서 ?n=3 으로 다른 날 미리보기)
npm test               # 게임 로직·날짜·스트릭 테스트
npm run check:puzzles  # 문제 데이터 검사 (초성 일치, 중복, 힌트에 정답 노출 등)
npm run build          # 검사 + 타입체크 + dist/ 생성
```

## 문제 추가

`src/puzzles.ts` 배열 끝에 하루치를 추가합니다. 0번이 #1(출시일 `src/lib/day.ts`의 `LAUNCH_DATE`).
초성은 정답에서 자동으로 만들어지므로 따로 적지 않습니다. `accept`는 초성이 같은 다른 표기만 허용됩니다.
문제가 떨어진 날은 "준비 중" 화면이 뜨므로, 항상 2주 이상 앞서 채워 두세요.

## 배포 (Cloudflare Pages 예시)

빌드 명령 `npm run build`, 출력 폴더 `dist`. 분석은 `src/lib/track.ts`에 연결합니다.
