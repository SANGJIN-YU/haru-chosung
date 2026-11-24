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
  {
    theme: '크리스마스 이브',
    items: [
      { answer: '산타', clue: '빨간 옷에 흰 수염, 굴뚝으로 들어와요' },
      { answer: '트리', clue: '전구와 별로 꾸미는 초록 나무' },
      { answer: '선물', clue: '포장지를 뜯는 순간이 제일 설레요' },
      { answer: '루돌프', clue: '코가 빨간 썰매 끄는 사슴' },
      { answer: '양말', clue: '머리맡에 걸어 두면 뭔가 들어 있을지도' },
    ],
  },
  {
    theme: '뜨끈한 국물 요리',
    items: [
      { answer: '칼국수', clue: '밀가루 반죽을 칼로 썰어 만든 면 요리' },
      { answer: '순두부', clue: '몽글몽글 부드러운 두부로 끓인 빨간 찌개' },
      { answer: '미역국', clue: '생일 아침에 먹는 바다 채소 국' },
      { answer: '설렁탕', clue: '뽀얀 소뼈 국물, 깍두기와 함께' },
      { answer: '만둣국', clue: '빚은 소를 넣고 끓인 국' },
    ],
  },
  {
    theme: '편의점',
    items: [
      { answer: '삼각김밥', clue: '비닐을 1, 2, 3 순서로 뜯는 주먹밥' },
      { answer: '컵라면', clue: '뜨거운 물 붓고 3분' },
      { answer: '바나나우유', clue: '단지 모양 통에 든 노란 음료' },
      { answer: '도시락', clue: '전자레인지에 데워 먹는 한 끼 세트' },
      { answer: '영수증', clue: '계산하면 나오는, 필요 없으면 버려 달라는 종이' },
    ],
  },
  {
    theme: '운동하는 날',
    items: [
      { answer: '헬스장', clue: '러닝머신과 기구가 있는 운동 시설' },
      { answer: '줄넘기', clue: '줄을 돌리며 폴짝 뛰어넘어요' },
      { answer: '스트레칭', clue: '운동 전에 몸을 쭉쭉 늘려요' },
      { answer: '아령', clue: '양손에 하나씩 드는 작은 무게 기구' },
      { answer: '요가', clue: '매트 위에서 호흡과 자세에 집중해요' },
    ],
  },
  {
    theme: '숲속 동물',
    items: [
      { answer: '다람쥐', clue: '도토리를 볼에 잔뜩 넣는 줄무늬 동물' },
      { answer: '고슴도치', clue: '몸이 가시로 덮여 있어 동그랗게 말아요' },
      { answer: '부엉이', clue: '밤에 눈을 크게 뜨고 우는 새' },
      { answer: '사슴', clue: '나뭇가지 같은 뿔이 난 동물' },
      { answer: '너구리', clue: '눈 주위가 검은, 라면 이름으로도 유명한 동물' },
    ],
  },
  {
    theme: '전통 놀이',
    items: [
      { answer: '제기차기', clue: '술 달린 엽전을 발로 몇 번 찼나 세요' },
      { answer: '팽이', clue: '채로 쳐서 오래 돌리는 장난감' },
      { answer: '연날리기', clue: '바람 부는 날 실을 잡고 하늘로' },
      { answer: '공기', clue: '작은 돌 다섯 알을 던지고 받아요' },
      { answer: '딱지', clue: '종이를 접어 바닥에 내리쳐 뒤집어요' },
    ],
  },
  {
    theme: '해외여행 준비',
    items: [
      { answer: '여권', clue: '출국할 때 꼭 필요한 신분증' },
      { answer: '캐리어', clue: '바퀴 달린 여행 가방' },
      { answer: '항공권', clue: '비행기에 타기 위한 표' },
      { answer: '숙소', clue: '여행지에서 잠자는 곳' },
      { answer: '환전', clue: '원화를 현지 돈으로 바꿔요' },
    ],
  },
  {
    theme: '한 해의 마지막 주',
    items: [
      { answer: '송년회', clue: '한 해를 보내며 모이는 자리' },
      { answer: '건배', clue: '잔을 부딪치며 외치는 말' },
      { answer: '폭죽', clue: '펑 터지며 하늘에 불꽃을 그려요' },
      { answer: '시상식', clue: '연말 방송에서 트로피를 주는 행사' },
      { answer: '종소리', clue: '자정에 서른세 번 울려요' },
    ],
  },
  {
    theme: '새해 첫날',
    items: [
      { answer: '해돋이', clue: '1월 1일 아침 바다에서 보는 첫 해' },
      { answer: '다짐', clue: '올해는 꼭 하겠다고 스스로 하는 약속' },
      { answer: '달력', clue: '새로 걸어 두는 열두 장짜리' },
      { answer: '덕담', clue: '새해 복 많이 받으라는 좋은 말' },
      { answer: '복주머니', clue: '설빔에 차는, 복을 담는 작은 주머니' },
    ],
  },
  {
    theme: '빵집',
    items: [
      { answer: '식빵', clue: '네모난 모양, 토스트로 구워 먹어요' },
      { answer: '크루아상', clue: '겹겹이 결이 살아 있는 초승달 모양 빵' },
      { answer: '단팥빵', clue: '달콤한 팥소가 가득한 동그란 빵' },
      { answer: '바게트', clue: '프랑스의 길쭉하고 딱딱한 빵' },
      { answer: '베이글', clue: '가운데 구멍이 뚫린 쫄깃한 빵' },
    ],
  },
  {
    theme: '하늘을 올려다보면',
    items: [
      { answer: '구름', clue: '솜사탕처럼 하늘에 떠 있어요' },
      { answer: '노을', clue: '해 질 녘 하늘이 주황빛으로 물들어요' },
      { answer: '번개', clue: '하늘에서 번쩍이는 빛' },
      { answer: '천둥', clue: '번쩍 다음에 우르릉 쾅' },
      { answer: '초승달', clue: '눈썹처럼 가느다란 달' },
    ],
  },
  {
    theme: '타고 떠나요',
    items: [
      { answer: '기차', clue: '레일 위를 칙칙폭폭 달려요' },
      { answer: '헬리콥터', clue: '프로펠러가 위에서 도는 비행체' },
      { answer: '오토바이', clue: '헬멧 쓰고 타는 두 바퀴 엔진 탈것' },
      { answer: '유람선', clue: '강이나 바다를 구경하며 도는 배' },
      { answer: '케이블카', clue: '줄에 매달려 산 위로 올라가요' },
    ],
  },
  {
    theme: '도서관',
    items: [
      { answer: '사서', clue: '도서관에서 책을 관리하는 사람' },
      { answer: '연체', clue: '반납일을 넘기면 생기는 일' },
      { answer: '반납', clue: '빌린 책을 돌려줘요' },
      { answer: '책갈피', clue: '읽던 쪽에 끼워 두는 얇은 표시' },
      { answer: '열람실', clue: '조용히 공부하거나 책을 읽는 방' },
    ],
  },
  {
    theme: '세계의 도시',
    items: [
      { answer: '파리', clue: '에펠탑이 있는 프랑스의 수도' },
      { answer: '런던', clue: '빅벤과 빨간 이층 버스' },
      { answer: '도쿄', clue: '일본의 수도' },
      { answer: '뉴욕', clue: '자유의 여신상이 있는 미국 도시' },
      { answer: '로마', clue: '콜로세움이 있는 이탈리아의 수도' },
    ],
  },
  {
    theme: '국내 여행지',
    items: [
      { answer: '부산', clue: '광안대교와 돼지국밥의 항구 도시' },
      { answer: '제주도', clue: '감귤과 돌하르방의 섬' },
      { answer: '강릉', clue: '경포대와 커피 거리가 있는 동해안 도시' },
      { answer: '전주', clue: '한옥마을과 비빔밥으로 유명해요' },
      { answer: '경주', clue: '불국사와 첨성대, 신라의 수도' },
    ],
  },
  {
    theme: '분식집 메뉴',
    items: [
      { answer: '김밥', clue: '김 위에 밥과 재료를 올려 돌돌 말아요' },
      { answer: '순대', clue: '당면을 채운, 떡볶이 국물에 찍어 먹는 것' },
      { answer: '튀김', clue: '오징어, 고구마를 반죽 입혀 기름에' },
      { answer: '라면', clue: '꼬불꼬불 면에 스프를 넣고 끓여요' },
      { answer: '쫄면', clue: '쫄깃한 면을 새콤달콤 고추장에 비벼요' },
    ],
  },
  {
    theme: '오늘의 기분',
    items: [
      { answer: '행복', clue: '웃음이 절로 나는 마음' },
      { answer: '슬픔', clue: '눈물이 나는 마음' },
      { answer: '질투', clue: '남이 가진 게 부러워 속이 쓰려요' },
      { answer: '설렘', clue: '좋아하는 사람을 만나기 전 두근두근' },
      { answer: '짜증', clue: '일이 꼬여 신경질이 나요' },
    ],
  },
  {
    theme: '옷장 열기',
    items: [
      { answer: '청바지', clue: '파란 데님 바지' },
      { answer: '티셔츠', clue: '목이 둥근 반팔 윗옷' },
      { answer: '패딩', clue: '오리털로 빵빵한 겨울 외투' },
      { answer: '운동화', clue: '끈을 묶고 달리기할 때 신어요' },
      { answer: '모자', clue: '머리에 써서 햇빛을 가려요' },
    ],
  },
  {
    theme: '책상 위 컴퓨터',
    items: [
      { answer: '키보드', clue: '자판을 두드려 글자를 입력해요' },
      { answer: '마우스', clue: '손에 쥐고 움직이면 화살표가 따라와요' },
      { answer: '모니터', clue: '화면을 보여 주는 장치' },
      { answer: '노트북', clue: '접어서 들고 다니는 컴퓨터' },
      { answer: '충전기', clue: '배터리가 없을 때 꽂아요' },
    ],
  },
  {
    theme: '휴대폰 속 기능',
    items: [
      { answer: '카메라', clue: '찰칵, 사진을 찍어요' },
      { answer: '알람', clue: '아침마다 나를 깨워요' },
      { answer: '계산기', clue: '더치페이할 때 열어요' },
      { answer: '메모장', clue: '생각나는 걸 바로 적어 둬요' },
      { answer: '지도', clue: '길을 잃었을 때 내 위치를 보여 줘요' },
    ],
  },
  {
    theme: '옛날이야기 속',
    items: [
      { answer: '공주', clue: '왕의 딸' },
      { answer: '마법사', clue: '지팡이를 휘둘러 주문을 외워요' },
      { answer: '요정', clue: '작은 날개로 반짝이며 날아다녀요' },
      { answer: '마녀', clue: '빗자루를 타고 날아다니는 여자' },
      { answer: '보물상자', clue: '해적이 묻어 둔, 금화가 가득한 함' },
    ],
  },
  {
    theme: '생일 파티',
    items: [
      { answer: '소원', clue: '촛불을 끄기 전에 눈 감고 빌어요' },
      { answer: '축하', clue: '좋은 일에 함께 기뻐해 주는 말' },
      { answer: '풍선', clue: '입으로 불어 부풀려 벽에 붙여요' },
      { answer: '촛불', clue: '나이만큼 꽂고 후 불어 꺼요' },
      { answer: '고깔모자', clue: '뾰족한 원뿔 모양 파티용 모자' },
    ],
  },
  {
    theme: '은행 창구',
    items: [
      { answer: '통장', clue: '입출금 내역이 찍히는 작은 수첩' },
      { answer: '계좌', clue: '돈을 넣어 두는 나만의 번호' },
      { answer: '송금', clue: '다른 사람에게 돈을 보내요' },
      { answer: '번호표', clue: '뽑아 들고 내 차례를 기다려요' },
      { answer: '체크카드', clue: '통장 잔액 안에서만 결제되는 카드' },
    ],
  },
  {
    theme: '주식 용어',
    items: [
      { answer: '상한가', clue: '하루에 오를 수 있는 최고 가격' },
      { answer: '배당금', clue: '회사가 이익을 주주에게 나눠 주는 돈' },
      { answer: '시가총액', clue: '주가에 주식 수를 곱한 회사의 몸값' },
      { answer: '공매도', clue: '빌린 주식을 먼저 팔고 나중에 사서 갚아요' },
      { answer: '코스피', clue: '우리나라 대표 주가지수' },
    ],
  },
  {
    theme: '과학실',
    items: [
      { answer: '현미경', clue: '아주 작은 것을 크게 확대해 봐요' },
      { answer: '비커', clue: '눈금이 있는 원통형 유리 그릇' },
      { answer: '자석', clue: 'N극과 S극, 쇠붙이를 끌어당겨요' },
      { answer: '돋보기', clue: '볼록 렌즈 하나로 글씨를 크게' },
      { answer: '실험복', clue: '과학자가 입는 하얀 가운' },
    ],
  },
  {
    theme: '미술 시간',
    items: [
      { answer: '크레파스', clue: '손에 묻어나는 막대 모양 색칠 도구' },
      { answer: '물감', clue: '물에 개어 붓으로 칠해요' },
      { answer: '스케치북', clue: '그림 그리는 두꺼운 종이 묶음' },
      { answer: '팔레트', clue: '색을 짜서 섞는 판' },
      { answer: '찰흙', clue: '주물러서 모양을 빚는 흙' },
    ],
  },
  {
    theme: '가 볼 만한 우리 명소',
    items: [
      { answer: '경복궁', clue: '서울 광화문 뒤의 조선 궁궐' },
      { answer: '남산타워', clue: '서울 한가운데 산 위의 전망대' },
      { answer: '한라산', clue: '남한에서 가장 높은 산' },
      { answer: '독도', clue: '동해 끝, 우리 땅 바위섬' },
      { answer: '해운대', clue: '부산의 대표 해수욕장' },
    ],
  },
  {
    theme: '시골 농장',
    items: [
      { answer: '젖소', clue: '흰 바탕에 검은 무늬, 우유를 줘요' },
      { answer: '허수아비', clue: '논에 세워 참새를 쫓는 인형' },
      { answer: '트랙터', clue: '밭을 가는 커다란 농기계' },
      { answer: '비닐하우스', clue: '겨울에도 채소를 키우는 투명한 집' },
      { answer: '닭장', clue: '아침마다 달걀을 꺼내러 가는 곳' },
    ],
  },
  {
    theme: '반려동물',
    items: [
      { answer: '강아지', clue: '꼬리를 흔들며 반겨 줘요' },
      { answer: '고양이', clue: '야옹, 상자를 좋아해요' },
      { answer: '햄스터', clue: '쳇바퀴를 굴리는 작은 동물' },
      { answer: '금붕어', clue: '어항 속 주황색 물고기' },
      { answer: '앵무새', clue: '사람 말을 따라 하는 새' },
    ],
  },
  {
    theme: '시원한 음료',
    items: [
      { answer: '식혜', clue: '밥알이 동동 뜬 달콤한 전통 음료' },
      { answer: '수정과', clue: '계피와 생강으로 만든 곶감 띄운 음료' },
      { answer: '사이다', clue: '톡 쏘는 투명한 탄산음료' },
      { answer: '녹차', clue: '초록빛으로 우려낸 차' },
      { answer: '레몬에이드', clue: '새콤한 노란 과일로 만든 탄산 음료' },
    ],
  },
]
