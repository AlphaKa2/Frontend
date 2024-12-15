const mbtiQuestions = [
  {
    id: 1,
    question: "비 오는 날, 숙소에서 쉬고 있는데 밖에서 재밌는 행사가 열리고 있다. 이때 나는...",
    options: [
      { text: "비는 오지만 재밌어 보이기 때문에 바로 구경을 간다.", alphabet: "A" },
      { text: "비도 오고 귀찮기 때문에 창 밖으로 구경만 하고 숙소에서 휴식을 취한다.", alphabet: "R" },
    ],
  },
  {
    id: 2,
    question: "해변가에서 재밌는 액티비티를 체험할 수 있다. 이때 나는...",
    options: [
      { text: "바로 체험하러 간다.", alphabet: "A" },
      { text: "그냥 해변가를 걸으며 여유를 즐긴다.", alphabet: "R" },
    ],
  },
  {
    id: 3,
    question: "여행지 숙소 바로 앞에서 자전거를 대여해준다. 이때 나는...",
    options: [
      { text: "자전거를 타고 주변을 둘러본다.", alphabet: "A" },
      { text: "숙소에서 휴식하며 주변 갈 곳을 찾아본다.", alphabet: "R" },
    ],
  },
  {
    id: 4,
    question: "숙소에 무료 수영장이 있다. 이때 나는...",
    options: [
      { text: "수영장에 뛰어들어 물놀이를 즐긴다.", alphabet: "A" },
      { text: "선베드에 앉아 휴식을 취한다.", alphabet: "R" },
    ],
  },
  {
    id: 5,
    question: "오랜만에 찾은 유명 관광지, 정상에 올라가면 멋진 전망이 펼쳐진다. 이때 나는...",
    options: [
      { text: "정상까지 힘들게 올라가서 멋진 경치를 꼭 본다.", alphabet: "A" },
      { text: "정상까지는 힘들고 멀기 때문에 중간쯤에서 경치를 보며 충분히 만족한다.", alphabet: "R" },
    ],
  },
  {
    id: 6,
    question: "관광 명소를 전부 다 방문하려면 오후가 빡빡하다. 이때 나는...",
    options: [
      { text: "더 효율적으로 움직여서 모두 다 방문할 수 있도록 노력한다.", alphabet: "B" },
      { text: "꼭 가보고 싶은 몇 군데만 고르고 여유롭게 둘러본다.", alphabet: "C" },
    ],
  },
  {
    id: 7,
    question: "저녁 늦게까지 놀고 피곤해 지쳐있다. 이때 나는...",
    options: [
      { text: "조금 피곤하지만, 그래도 일정에 맞춰 일찍 움직인다.", alphabet: "B" },
      { text: "다음날 아침 일정을 늦추고 조금 더 잔다.", alphabet: "C" },
    ],
  },
  {
    id: 8,
    question: "여행 중 갑자기 비가 내리기 시작한다. 다행히 우산은 갖고 있다. 이때 나는...",
    options: [
      { text: "비에도 불구하고 일정을 계속 소화한다.", alphabet: "B" },
      { text: "비를 피해 근처 카페에서 잠시 쉬며 상황을 본다.", alphabet: "C" },
    ],
  },
  {
    id: 9,
    question: "오늘 일정에 두 개의 관광 명소가 더 남아있다. 피곤하지만 나는...",
    options: [
      { text: "남은 명소까지 모두 둘러본다.", alphabet: "B" },
      { text: "피곤하니 지금 가던 곳에서 천천히 여유를 즐긴다.", alphabet: "C" },
    ],
  },
  {
    id: 10,
    question: "여행 마지막 날인데 가고 싶은 곳이 아직 많이 남았다. 이때 나는...",
    options: [
      { text: "가능한 모든 장소를 방문할 수 있도록 일정을 압축한다.", alphabet: "B" },
      { text: "가고 싶은 몇 군데만 선택해 여유롭게 다닌다.", alphabet: "C" },
    ],
  },
  {
    id: 11,
    question: "여행 중, 근사한 레스토랑과 현지 시장에서 파는 길거리 음식 중 하나를 선택해야 한다. 이때 나는...",
    options: [
      { text: "근사한 레스토랑에서 저녁을 즐긴다.", alphabet: "L" },
      { text: "현지 시장에서 현지 음식을 먹으며 로컬 분위기를 즐긴다.", alphabet: "S" },
    ],
  },
  {
    id: 12,
    question: "여행 중 고급 레스토랑에서 특별 메뉴를 추천받았다. 이때 나는...",
    options: [
      { text: "특별한 날이니 꼭 먹어본다.", alphabet: "L" },
      { text: "그냥 현지 음식으로 충분하다.", alphabet: "S" },
    ],
  },
  {
    id: 13,
    question: "여행지의 숙소를 고르고 있다. 이때 나는...",
    options: [
      { text: "그래도 여행이니 만큼 비싸더라도 좋은 숙소를 예약한다.", alphabet: "L" },
      { text: "어짜피 숙소에서는 잠만 잘거니 그럭저럭 잘만한 곳으로 예약한다.", alphabet: "S" },
    ],
  },
  {
    id: 14,
    question: "여행지에서 기념품 샵에 왔다. 이때 나는...",
    options: [
      { text: "조금 비싸더라도 여행지인 것을 감안하고 기념품을 구매한다.", alphabet: "L" },
      { text: "아무리 여행지라도 터무니 없는 가격의 돈을 주고 기념품을 살 순 없다.", alphabet: "S" },
    ],
  },
  {
    id: 15,
    question: "여행 계획을 다 짜고 마지막으로 교통수단을 정해야 한다. 이때 나는...",
    options: [
      { text: "돈을 더 내더라도 편안한 교통수단으로 이동한다.", alphabet: "L" },
      { text: "돈을 아끼기 위해 아침 일찍, 또는 저녁 늦게 이동한다.", alphabet: "S" },
    ],
  },
  {
    id: 16,
    question: "배고픈 상태에서 이미 찾아둔 식당으로 이동하는 길에, 맛있어 보이는 식당 앞을 지나가고 있다. 이때 나는...",
    options: [
      { text: "그래도 원래 가려던 식당으로 간다.", alphabet: "J" },
      { text: "그냥 눈에 보이는 식당에 들어간다.", alphabet: "P" },
    ],
  },
  {
    id: 17,
    question: "정해둔 여행 계획이 있지만, 예상치 못한 축제(행사)가 열리고 있다. 이때 나는...",
    options: [
      { text: "그래도 원래 계획한 여행을 한다.", alphabet: "J" },
      { text: "추후 일정이 조금 변경되더라도 축제(행사)에 참여한다.", alphabet: "P" },
    ],
  },
  {
    id: 18,
    question: "원래 계획한 투어가 지연될 것 같다. 이때 나는...",
    options: [
      { text: "조금 기다리더라도 투어를 한다.", alphabet: "J" },
      { text: "투어 대신 다른 갈만한 곳을 찾아보고 움직인다.", alphabet: "P" },
    ],
  },
  {
    id: 19,
    question: "여행지에서 갈만한 곳을 찾아보고 있다. 이때 나는...",
    options: [
      { text: "혹시 모를 상황을 대비해서 여행지와 맛집을 여유있게 더 찾아둔다.", alphabet: "J" },
      { text: "그냥 갈만한 곳 몇 군데를 대충 찾아본다.", alphabet: "P" },
    ],
  },
  {
    id: 20,
    question: "여행 중 사전에 계획한 시간이 지나서도 더 머물고 싶은 장소를 발견했다. 이때 나는...",
    options: [
      { text: "아쉽더라도 정해진 시간에 맞춰 다음 장소로 이동한다.", alphabet: "J" },
      { text: "마음에 드는 곳을 지나칠 수 없어 일정을 조정한다.", alphabet: "P" },
    ],
  },
];

export default mbtiQuestions;
