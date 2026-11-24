import type { Puzzle } from './puzzles'

/**
 * Practice-only sets. They never appear as a daily puzzle, so practice can't
 * spoil an upcoming day. Practice mixes these with daily puzzles already opened.
 * `npm run check:puzzles` also checks this list and that no answer overlaps the daily ones.
 */
export const PRACTICE_SETS: Puzzle[] = [
  {
    theme: '바다 음식',
    items: [
      { answer: '오징어', clue: '다리가 열 개, 말려서 구워 먹기도 해요' },
      { answer: '새우', clue: '등이 굽은, 튀김으로 인기 많은 갑각류' },
      { answer: '조개', clue: '단단한 껍데기 두 장 속 살' },
      { answer: '굴비', clue: '소금에 절여 말린 조기' },
      { answer: '전복', clue: '바위에 붙어 사는 귀한 패류, 죽으로 끓여요' },
    ],
  },
  {
    theme: '욕실',
    items: [
      { answer: '칫솔', clue: '하루 세 번 이를 닦아요' },
      { answer: '치약', clue: '짜서 솔 위에 올려요' },
      { answer: '수건', clue: '씻고 물기를 닦아요' },
      { answer: '샴푸', clue: '머리 감을 때 쓰는 거품' },
      { answer: '비누', clue: '손을 씻는 미끌미끌한 덩어리' },
    ],
  },
  {
    theme: '날씨와 옷차림',
    items: [
      { answer: '우산', clue: '비 오는 날 펼쳐요' },
      { answer: '장화', clue: '물웅덩이를 첨벙첨벙 걸어도 괜찮은 신발' },
      { answer: '선글라스', clue: '햇빛이 눈부실 때 쓰는 까만 안경' },
      { answer: '마스크', clue: '미세먼지 많은 날 입을 가려요' },
      { answer: '귀마개', clue: '추운 날 귀를 감싸는 털 뭉치' },
    ],
  },
  {
    theme: '바닷속 친구들',
    items: [
      { answer: '상어', clue: '날카로운 이빨, 등지느러미가 물 위로' },
      { answer: '거북이', clue: '등껍질을 지고 다니는 느림보' },
      { answer: '돌고래', clue: '똑똑하고 점프를 잘하는 바다 포유류' },
      { answer: '불가사리', clue: '별 모양으로 바위에 붙어 있어요' },
      { answer: '산호', clue: '알록달록한 바닷속 숲을 이루는 생물' },
    ],
  },
  {
    theme: '자동차',
    items: [
      { answer: '핸들', clue: '돌려서 방향을 바꿔요' },
      { answer: '브레이크', clue: '밟으면 차가 멈춰요' },
      { answer: '안전벨트', clue: '타자마자 딸깍 매요' },
      { answer: '주유소', clue: '기름을 넣는 곳' },
      { answer: '내비게이션', clue: '목적지까지 길을 안내하는 기계' },
    ],
  },
  {
    theme: '한국 디저트',
    items: [
      { answer: '약과', clue: '꿀에 절인 꽃 모양 전통 과자' },
      { answer: '인절미', clue: '고소한 콩가루를 묻힌 떡' },
      { answer: '호두과자', clue: '천안 휴게소의 견과 모양 빵' },
      { answer: '꿀떡', clue: '깨물면 안에서 달콤한 물이 터지는 작은 떡' },
      { answer: '강정', clue: '튀밥에 조청을 묻혀 굳힌 과자' },
    ],
  },
  {
    theme: '캠핑',
    items: [
      { answer: '텐트', clue: '말뚝을 박아 치는 천막' },
      { answer: '침낭', clue: '지퍼를 올리고 들어가 자는 이불' },
      { answer: '모닥불', clue: '둘러앉아 불멍하는 장작불' },
      { answer: '랜턴', clue: '밤에 들고 다니는 등' },
      { answer: '마시멜로', clue: '꼬치에 꽂아 불에 구워 먹는 말랑한 과자' },
    ],
  },
  {
    theme: '야구장',
    items: [
      { answer: '홈런', clue: '공이 담장을 넘어가요' },
      { answer: '투수', clue: '마운드에서 공을 던지는 선수' },
      { answer: '포수', clue: '마스크를 쓰고 앉아 공을 받는 선수' },
      { answer: '응원가', clue: '선수마다 부르는 노래' },
      { answer: '치어리더', clue: '응원단상에서 춤추며 응원을 이끌어요' },
    ],
  },
  {
    theme: '공항',
    items: [
      { answer: '탑승권', clue: '게이트에서 보여 주는 표' },
      { answer: '면세점', clue: '출국 심사 뒤 세금 없이 쇼핑하는 곳' },
      { answer: '활주로', clue: '비행기가 달려서 뜨는 긴 길' },
      { answer: '수하물', clue: '부치는 짐' },
      { answer: '기내식', clue: '하늘 위에서 먹는 한 끼' },
    ],
  },
  {
    theme: '회사 사무실',
    items: [
      { answer: '복사기', clue: '서류를 똑같이 여러 장 뽑아요' },
      { answer: '명함', clue: '처음 만난 사람과 주고받는 작은 카드' },
      { answer: '결재', clue: '윗사람이 서류에 도장을 찍어 승인해요' },
      { answer: '탕비실', clue: '커피와 간식이 있는 작은 방' },
      { answer: '사원증', clue: '목에 걸고 출입문에 찍는 카드' },
    ],
  },
  {
    theme: '나무와 열매',
    items: [
      { answer: '도토리', clue: '모자를 쓴 갈색 열매, 묵을 쑤어요' },
      { answer: '솔방울', clue: '소나무에 달리는 비늘 같은 열매' },
      { answer: '은행', clue: '노란 잎, 냄새나는 열매' },
      { answer: '단풍', clue: '가을에 잎이 빨갛게 물드는 것' },
      { answer: '대나무', clue: '마디가 있고 속이 빈, 판다의 밥' },
    ],
  },
  {
    theme: '음악 방송',
    items: [
      { answer: '아이돌', clue: '칼군무와 팬덤의 주인공' },
      { answer: '무대', clue: '가수가 노래하는 곳' },
      { answer: '응원봉', clue: '콘서트에서 흔드는 빛나는 막대' },
      { answer: '컴백', clue: '새 앨범을 들고 돌아오는 일' },
      { answer: '안무', clue: '노래에 맞춘 춤 동작' },
    ],
  },
  {
    theme: '수학 시간',
    items: [
      { answer: '덧셈', clue: '1 + 1 같은 계산' },
      { answer: '분수', clue: '2분의 1처럼 쓰는 수' },
      { answer: '삼각형', clue: '꼭짓점이 세 개인 도형' },
      { answer: '각도기', clue: '반원 모양, 각을 재는 도구' },
      { answer: '구구단', clue: '2×1=2부터 9×9=81까지 외워요' },
    ],
  },
  {
    theme: '세탁소와 빨래',
    items: [
      { answer: '다리미', clue: '뜨겁게 데워 옷 주름을 펴요' },
      { answer: '옷걸이', clue: '옷장 안에 옷을 거는 철사' },
      { answer: '섬유유연제', clue: '빨래를 부드럽고 향기롭게' },
      { answer: '건조대', clue: '젖은 빨래를 널어 말리는 틀' },
      { answer: '세제', clue: '빨래할 때 넣는 가루나 액체' },
    ],
  },
  {
    theme: '중국집',
    items: [
      { answer: '짜장면', clue: '까만 춘장 소스 면' },
      { answer: '짬뽕', clue: '빨갛고 얼큰한 해물 면' },
      { answer: '탕수육', clue: '튀긴 고기에 새콤달콤 소스, 부먹 찍먹' },
      { answer: '군만두', clue: '서비스로 자주 오는 구운 만두' },
      { answer: '단무지', clue: '노란 무 절임' },
    ],
  },
  {
    theme: '피부와 화장품',
    items: [
      { answer: '로션', clue: '세수 뒤에 바르는 촉촉한 크림' },
      { answer: '립밤', clue: '갈라진 입술에 발라요' },
      { answer: '향수', clue: '칙 뿌리면 좋은 냄새' },
      { answer: '선크림', clue: '자외선을 막아 주는 크림' },
      { answer: '마스크팩', clue: '얼굴에 붙이는 촉촉한 시트' },
    ],
  },
  {
    theme: '시골 풍경',
    items: [
      { answer: '논두렁', clue: '논과 논 사이의 좁은 둑길' },
      { answer: '개울', clue: '졸졸 흐르는 작은 시냇물' },
      { answer: '초가집', clue: '볏짚으로 지붕을 얹은 집' },
      { answer: '장독대', clue: '된장, 고추장 항아리를 모아 둔 곳' },
      { answer: '정자', clue: '마을 어귀 쉬어 가는 지붕 있는 쉼터' },
    ],
  },
  {
    theme: '게임 용어',
    items: [
      { answer: '레벨업', clue: '경험치가 차서 한 단계 올라가요' },
      { answer: '아이템', clue: '줍거나 사서 쓰는 도구' },
      { answer: '보스', clue: '마지막 판의 가장 센 적' },
      { answer: '저장', clue: '꺼지기 전에 진행 상황을 남겨요' },
      { answer: '튜토리얼', clue: '처음 시작할 때 조작법을 배우는 단계' },
    ],
  },
  {
    theme: '이사하는 날',
    items: [
      { answer: '상자', clue: '짐을 담아 테이프로 붙이는 종이 박스' },
      { answer: '사다리차', clue: '높은 층 창문으로 짐을 나르는 차' },
      { answer: '집들이', clue: '새집에 친구들을 초대하는 날' },
      { answer: '열쇠', clue: '새집 문을 여는 것' },
      { answer: '전입신고', clue: '주소가 바뀌면 주민센터에 하는 일' },
    ],
  },
  {
    theme: '병아리부터 닭까지',
    items: [
      { answer: '달걀', clue: '깨면 노른자와 흰자' },
      { answer: '병아리', clue: '삐약삐약 노란 아기 새' },
      { answer: '수탉', clue: '새벽에 꼬끼오 우는 닭' },
      { answer: '깃털', clue: '새 몸을 덮은 가벼운 털' },
      { answer: '둥지', clue: '새가 알을 낳는 보금자리' },
    ],
  },
]
