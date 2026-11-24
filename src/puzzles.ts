export interface PuzzleItem {
  /** The word to find. Its 초성 is shown to the player. */
  answer: string
  /** One-line clue, revealed only when the player asks for a hint. */
  clue: string
  /** Other spellings that count as correct. Must share the answer's 초성. */
  accept?: string[]
}

export interface Puzzle {
  theme: string
  items: PuzzleItem[]
}

/** Index 0 is puzzle #1 (the launch day). Run `npm run check:puzzles` after editing. */
export const PUZZLES: Puzzle[] = [
  {
    theme: '겨울 길거리 간식',
    items: [
      { answer: '붕어빵', clue: '팥이나 슈크림이 든 물고기 모양 빵' },
      { answer: '호떡', clue: '설탕 꿀이 흘러나오는 납작한 빵' },
      { answer: '군고구마', clue: '드럼통에서 구워 파는 주황빛 간식' },
      { answer: '어묵', clue: '꼬치에 꽂아 국물과 함께 먹어요' },
      { answer: '군밤', clue: '껍질에 칼집을 내 구운 가을 열매' },
    ],
  },
  {
    theme: '과일 가게',
    items: [
      { answer: '사과', clue: '빨갛고 아삭한, 하루 하나면 의사가 필요 없다는 과일' },
      { answer: '딸기', clue: '겉에 씨가 콕콕 박힌 빨간 과일' },
      { answer: '수박', clue: '초록 줄무늬 껍질 속이 빨간 여름 과일' },
      { answer: '복숭아', clue: '솜털이 보송한 분홍빛 여름 과일' },
      { answer: '포도', clue: '송이째 달린 보라색 알맹이' },
    ],
  },
  {
    theme: '우리 동네 직업',
    items: [
      { answer: '소방관', clue: '불을 끄고 사람을 구해요' },
      { answer: '간호사', clue: '병원에서 환자를 돌보고 주사를 놓아요' },
      { answer: '요리사', clue: '주방에서 음식을 만들어요' },
      { answer: '경찰관', clue: '범인을 잡고 치안을 지켜요' },
      { answer: '우체부', clue: '편지와 소포를 배달해요' },
    ],
  },
  {
    theme: '동물원 나들이',
    items: [
      { answer: '호랑이', clue: '줄무늬가 있는 큰 고양잇과 동물' },
      { answer: '코끼리', clue: '코가 길고 귀가 커다란 동물' },
      { answer: '기린', clue: '목이 가장 긴 동물' },
      { answer: '원숭이', clue: '바나나를 좋아하고 나무를 잘 타요' },
      { answer: '펭귄', clue: '날지 못하고 뒤뚱뒤뚱 걷는 새' },
    ],
  },
  {
    theme: '출근길 교통수단',
    items: [
      { answer: '지하철', clue: '땅 아래를 달리는 열차' },
      { answer: '버스', clue: '번호를 보고 정류장에서 타요' },
      { answer: '자전거', clue: '페달을 밟아 움직이는 두 바퀴' },
      { answer: '택시', clue: '손을 들거나 앱으로 부르는 차' },
      { answer: '킥보드', clue: '한 발로 서서 타는, 공유로도 빌리는 탈것' },
    ],
  },
  {
    theme: '한식 밥상',
    items: [
      { answer: '김치찌개', clue: '신 김치와 돼지고기를 넣고 끓인 찌개' },
      { answer: '비빔밥', clue: '나물과 고추장을 넣고 섞어 먹는 밥' },
      { answer: '불고기', clue: '간장 양념에 재운 얇은 소고기 구이' },
      { answer: '떡볶이', clue: '빨간 고추장 양념의 쫄깃한 분식' },
      { answer: '삼겹살', clue: '세 겹으로 층이 진 돼지고기 구이' },
    ],
  },
  {
    theme: '오늘의 날씨',
    items: [
      { answer: '소나기', clue: '갑자기 쏟아지다 금방 그치는 비' },
      { answer: '무지개', clue: '비 갠 뒤 하늘에 뜨는 일곱 빛깔' },
      { answer: '태풍', clue: '여름에 남쪽 바다에서 올라오는 강한 바람' },
      { answer: '장마', clue: '초여름에 여러 날 이어지는 비' },
      { answer: '안개', clue: '앞이 뿌옇게 안 보이는 아침' },
    ],
  },
  {
    theme: '학교 생활',
    items: [
      { answer: '칠판', clue: '선생님이 분필로 글씨를 써요' },
      { answer: '교과서', clue: '과목마다 한 권씩 받는 책' },
      { answer: '운동장', clue: '체육 시간에 뛰노는 넓은 마당' },
      { answer: '급식', clue: '점심시간에 줄 서서 받는 밥' },
      { answer: '방학', clue: '여름과 겨울에 학교를 쉬는 기간' },
    ],
  },
  {
    theme: '악기 연주',
    items: [
      { answer: '피아노', clue: '흰 건반과 검은 건반' },
      { answer: '기타', clue: '줄 여섯 개를 튕기는 악기' },
      { answer: '바이올린', clue: '활로 켜는, 턱에 대고 연주하는 악기' },
      { answer: '장구', clue: '허리가 잘록한 우리 전통 타악기' },
      { answer: '드럼', clue: '스틱으로 두드리는 밴드의 박자 담당' },
    ],
  },
  {
    theme: '부엌 살림',
    items: [
      { answer: '냄비', clue: '라면을 끓일 때 쓰는 그릇' },
      { answer: '프라이팬', clue: '달걀 프라이를 부치는 납작한 팬' },
      { answer: '도마', clue: '칼질할 때 밑에 까는 판' },
      { answer: '국자', clue: '국을 뜰 때 쓰는 손잡이 긴 도구' },
      { answer: '밥솥', clue: '쌀을 넣고 버튼을 누르면 밥이 돼요' },
    ],
  },
  {
    theme: '우주 여행',
    items: [
      { answer: '행성', clue: '태양 주위를 도는 지구 같은 천체' },
      { answer: '은하수', clue: '밤하늘을 가로지르는 별의 강' },
      { answer: '별똥별', clue: '소원을 빌게 되는 떨어지는 별' },
      { answer: '우주선', clue: '사람을 태우고 우주로 가는 탈것' },
      { answer: '블랙홀', clue: '빛조차 빠져나오지 못하는 곳' },
    ],
  },
  {
    theme: '바닷가',
    items: [
      { answer: '고래', clue: '바다에 사는 가장 큰 포유류' },
      { answer: '해파리', clue: '투명하고 흐물흐물, 쏘이면 따가워요' },
      { answer: '문어', clue: '다리가 여덟 개, 먹물을 뿜어요' },
      { answer: '파도', clue: '밀려왔다 부서지는 물결' },
      { answer: '등대', clue: '밤바다에 불빛으로 길을 알려 줘요' },
    ],
  },
  {
    theme: '공으로 하는 운동',
    items: [
      { answer: '축구', clue: '손을 쓰면 안 되는 11명의 경기' },
      { answer: '야구', clue: '투수가 던지고 타자가 쳐요' },
      { answer: '농구', clue: '높이 달린 링에 공을 넣어요' },
      { answer: '배구', clue: '네트 너머로 공을 받아 넘겨요' },
      { answer: '탁구', clue: '작은 탁자 위에서 하는 라켓 경기' },
    ],
  },
  {
    theme: '설날과 추석',
    items: [
      { answer: '송편', clue: '추석에 빚는 반달 모양 떡' },
      { answer: '세배', clue: '새해에 어른께 드리는 큰절' },
      { answer: '윷놀이', clue: '네 개의 막대를 던져 말을 옮기는 놀이' },
      { answer: '떡국', clue: '설날 아침에 먹으면 한 살 더 먹는 음식' },
      { answer: '세뱃돈', clue: '큰절을 하고 받는 용돈' },
    ],
  },
  {
    theme: '우리 몸',
    items: [
      { answer: '어깨', clue: '팔이 몸통과 이어지는 곳' },
      { answer: '무릎', clue: '다리가 접히는 곳' },
      { answer: '손가락', clue: '한 손에 다섯 개' },
      { answer: '발바닥', clue: '서 있을 때 땅에 닿는 곳' },
      { answer: '눈썹', clue: '눈 위에 난 짧은 털' },
    ],
  },
  {
    theme: '필통 속',
    items: [
      { answer: '연필', clue: '깎아서 쓰는 나무 필기구' },
      { answer: '지우개', clue: '잘못 쓴 글씨를 문질러 없애요' },
      { answer: '공책', clue: '줄이 그어진 필기용 책' },
      { answer: '가위', clue: '종이를 자르는 도구' },
      { answer: '테이프', clue: '찢어진 곳을 붙이는 끈끈한 띠' },
    ],
  },
  {
    theme: '카페에서',
    items: [
      { answer: '아메리카노', clue: '에스프레소에 물을 탄, 가장 흔한 커피' },
      { answer: '라떼', clue: '커피에 우유를 듬뿍' },
      { answer: '케이크', clue: '생일에 초를 꽂는 디저트' },
      { answer: '빨대', clue: '음료를 쭉 빨아 마시는 관' },
      { answer: '머그컵', clue: '손잡이가 달린 두툼한 잔' },
    ],
  },
  {
    theme: '봄꽃 구경',
    items: [
      { answer: '벚꽃', clue: '4월에 흩날리는 분홍빛 꽃잎' },
      { answer: '개나리', clue: '담장을 노랗게 물들이는 꽃' },
      { answer: '진달래', clue: '산을 분홍빛으로 덮는, 화전에 쓰는 꽃' },
      { answer: '튤립', clue: '컵 모양 꽃, 네덜란드가 유명해요' },
      { answer: '민들레', clue: '씨앗이 솜털처럼 바람에 날아가요' },
    ],
  },
  {
    theme: '한여름',
    items: [
      { answer: '수영장', clue: '물놀이를 하는 곳, 튜브를 챙겨요' },
      { answer: '선풍기', clue: '날개가 돌며 바람을 보내는 가전' },
      { answer: '모기', clue: '밤에 앵앵거리며 피를 빨아요' },
      { answer: '팥빙수', clue: '얼음 위에 팥과 떡을 올린 디저트' },
      { answer: '매미', clue: '나무에 붙어 맴맴 우는 곤충' },
    ],
  },
  {
    theme: '거실과 침실',
    items: [
      { answer: '냉장고', clue: '음식을 차갑게 보관하는 가전' },
      { answer: '세탁기', clue: '빨래를 돌리는 가전' },
      { answer: '소파', clue: '거실에 놓는 푹신한 긴 의자', accept: ['쇼파'] },
      { answer: '거울', clue: '내 모습을 비춰 봐요' },
      { answer: '베개', clue: '잘 때 머리를 받쳐요' },
    ],
  },
  {
    theme: '풀숲의 곤충',
    items: [
      { answer: '나비', clue: '알록달록 날개로 꽃 사이를 날아요' },
      { answer: '개미', clue: '줄지어 다니는 부지런한 곤충' },
      { answer: '잠자리', clue: '가을 하늘을 나는, 날개가 투명한 곤충' },
      { answer: '무당벌레', clue: '빨간 등에 검은 점' },
      { answer: '메뚜기', clue: '풀밭에서 폴짝폴짝 뛰어요' },
    ],
  },
  {
    theme: '장바구니 채소',
    items: [
      { answer: '당근', clue: '토끼가 좋아하는 주황색 뿌리' },
      { answer: '양파', clue: '썰면 눈물이 나요' },
      { answer: '오이', clue: '초록색 길쭉이, 여름에 시원하게' },
      { answer: '감자', clue: '땅속에서 캐는, 튀기면 프라이' },
      { answer: '배추', clue: '김장할 때 절이는 채소' },
    ],
  },
  {
    theme: '직장인의 하루',
    items: [
      { answer: '출근', clue: '아침에 회사로 가는 일' },
      { answer: '회의', clue: '모여서 안건을 이야기해요' },
      { answer: '월급', clue: '한 달 일하고 받는 돈' },
      { answer: '점심', clue: '12시, 오늘은 뭐 먹지?' },
      { answer: '퇴근', clue: '하루 중 가장 기다려지는 순간' },
    ],
  },
  {
    theme: '병원에 가면',
    items: [
      { answer: '주사', clue: '따끔! 팔에 맞아요' },
      { answer: '감기', clue: '콧물과 기침이 나는 흔한 병' },
      { answer: '처방전', clue: '약국에 내는 의사의 종이' },
      { answer: '체온계', clue: '열이 나는지 재는 도구' },
      { answer: '붕대', clue: '다친 곳에 감는 하얀 천' },
    ],
  },
  {
    theme: '놀이공원',
    items: [
      { answer: '회전목마', clue: '말을 타고 빙글빙글 도는 놀이기구' },
      { answer: '롤러코스터', clue: '레일 위를 빠르게 오르내리는 놀이기구' },
      { answer: '관람차', clue: '높이 올라 경치를 보는 큰 바퀴' },
      { answer: '솜사탕', clue: '구름처럼 부푼 설탕 간식' },
      { answer: '퍼레이드', clue: '캐릭터들이 줄지어 행진하는 공연' },
    ],
  },
  {
    theme: '무지개 색깔',
    items: [
      { answer: '빨강', clue: '신호등에서 멈추라는 색', accept: ['빨간'] },
      { answer: '노랑', clue: '병아리 색', accept: ['노란'] },
      { answer: '초록', clue: '풀잎 색' },
      { answer: '파랑', clue: '맑은 하늘 색', accept: ['파란'] },
      { answer: '보라', clue: '포도 색' },
    ],
  },
  {
    theme: '우리 가족',
    items: [
      { answer: '할머니', clue: '아빠나 엄마의 어머니' },
      { answer: '삼촌', clue: '아빠의 남자 형제' },
      { answer: '이모', clue: '엄마의 여자 형제' },
      { answer: '손주', clue: '할머니 할아버지가 부르는 손자와 손녀' },
      { answer: '조카', clue: '형제자매의 자녀' },
    ],
  },
  {
    theme: '영화 보러 가는 날',
    items: [
      { answer: '팝콘', clue: '영화 볼 때 먹는 튀긴 옥수수' },
      { answer: '예매', clue: '미리 표를 사 두는 일' },
      { answer: '자막', clue: '외국 영화 아래에 뜨는 글자' },
      { answer: '좌석', clue: '표에 적힌 내 자리' },
      { answer: '예고편', clue: '본편 전에 보여 주는 다른 영화 맛보기' },
    ],
  },
  {
    theme: '돈 공부',
    items: [
      { answer: '저금통', clue: '동전을 모으는 돼지 모양 통' },
      { answer: '적금', clue: '매달 정해진 돈을 넣는 예금' },
      { answer: '주식', clue: '회사의 지분을 쪼갠 증서' },
      { answer: '환율', clue: '원화와 달러를 바꾸는 비율' },
      { answer: '이자', clue: '돈을 맡기거나 빌리면 붙는 돈' },
    ],
  },
  {
    theme: '눈 오는 날',
    items: [
      { answer: '눈사람', clue: '눈을 굴려 만든 사람' },
      { answer: '장갑', clue: '손이 시리지 않게 끼어요' },
      { answer: '목도리', clue: '목에 두르는 따뜻한 천' },
      { answer: '스키', clue: '발에 긴 판을 신고 비탈을 내려가요' },
      { answer: '썰매', clue: '눈이나 얼음 위에서 미끄러지며 타요' },
    ],
  },
]
