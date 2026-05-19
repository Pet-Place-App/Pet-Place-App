export type Hotel = {
  name: string;
  area: string;
  district: string;
  address: string;
  phone: string;
  pets: string[];
  options: string[];
  prices: Record<string, number>;
  open: boolean;
  online: boolean;
  sameDay: boolean;
  longStay: boolean;
  hours: string;
  distance: number;
  reservation: string;
  features: string;
};

export const hotels: Hotel[] = [
  {
    name: "강남 포근펫 호텔",
    area: "서울",
    district: "강남구 역삼동",
    address: "서울 강남구 테헤란로 152",
    phone: "02-555-1200",
    pets: ["소형견", "중형견", "고양이"],
    options: ["기본룸", "프리미엄룸", "CCTV", "산책"],
    prices: { 소형견: 45000, 중형견: 58000, 고양이: 50000, 프리미엄룸: 78000 },
    open: true, online: true, sameDay: true, longStay: true,
    hours: "08:00 - 22:00", distance: 1.2,
    reservation: "온라인예약 · 전화예약 · 당일예약",
    features: "실시간 CCTV, 1일 2회 산책, 장기숙박 할인",
  },
  {
    name: "홍대 냥멍 스테이",
    area: "서울",
    district: "마포구 서교동",
    address: "서울 마포구 와우산로 84",
    phone: "02-332-7701",
    pets: ["소형견", "고양이"],
    options: ["기본룸", "고양이전용룸", "CCTV"],
    prices: { 소형견: 39000, 고양이: 42000, 고양이전용룸: 56000 },
    open: true, online: true, sameDay: false, longStay: false,
    hours: "09:00 - 21:00", distance: 3.8,
    reservation: "온라인예약 · 전화예약",
    features: "고양이 전용룸, 분리 대기, 사진 리포트",
  },
  {
    name: "분당 숲속 펫보딩",
    area: "경기",
    district: "성남시 분당구",
    address: "경기 성남시 분당구 정자일로 95",
    phone: "031-711-4200",
    pets: ["소형견", "중형견", "대형견"],
    options: ["기본룸", "프리미엄룸", "산책", "픽업"],
    prices: { 소형견: 36000, 중형견: 49000, 대형견: 69000, 픽업: 15000 },
    open: true, online: false, sameDay: true, longStay: true,
    hours: "07:30 - 20:30", distance: 8.6,
    reservation: "전화예약 · 당일예약",
    features: "넓은 운동장, 픽업 가능, 7박 이상 할인",
  },
  {
    name: "해운대 오션 펫호텔",
    area: "부산",
    district: "해운대구 우동",
    address: "부산 해운대구 해운대로 620",
    phone: "051-744-0911",
    pets: ["소형견", "중형견", "대형견", "고양이"],
    options: ["기본룸", "프리미엄룸", "CCTV", "산책", "픽업"],
    prices: { 소형견: 42000, 중형견: 56000, 대형견: 76000, 고양이: 47000, 프리미엄룸: 85000 },
    open: true, online: true, sameDay: true, longStay: true,
    hours: "08:00 - 23:00", distance: 13.4,
    reservation: "온라인예약 · 전화예약 · 성수기 선결제",
    features: "CCTV, 해변 산책 코스, 픽업 상담",
  },
  {
    name: "대구 달빛 반려호텔",
    area: "대구",
    district: "수성구 범어동",
    address: "대구 수성구 동대구로 340",
    phone: "053-742-3011",
    pets: ["소형견", "중형견", "고양이"],
    options: ["기본룸", "고양이전용룸", "CCTV"],
    prices: { 소형견: 33000, 중형견: 45000, 고양이: 39000, 고양이전용룸: 52000 },
    open: true, online: true, sameDay: false, longStay: true,
    hours: "09:00 - 20:00", distance: 18.1,
    reservation: "온라인예약 · 5박 이상 할인",
    features: "고양이 전용층, 사진 알림, 장기숙박 할인",
  },
  {
    name: "광주 편한하루 펫스테이",
    area: "광주",
    district: "서구 치평동",
    address: "광주 서구 상무중앙로 75",
    phone: "062-511-8842",
    pets: ["소형견", "중형견", "대형견"],
    options: ["기본룸", "산책", "픽업"],
    prices: { 소형견: 31000, 중형견: 43000, 대형견: 63000, 픽업: 12000 },
    open: true, online: false, sameDay: true, longStay: false,
    hours: "08:30 - 21:00", distance: 22.5,
    reservation: "전화예약 · 당일예약",
    features: "당일 맡김 가능, 산책 옵션, 근거리 픽업",
  },
  {
    name: "제주 바람 펫리조트",
    area: "제주",
    district: "제주시 애월읍",
    address: "제주 제주시 애월읍 애월해안로 210",
    phone: "064-799-8820",
    pets: ["소형견", "중형견", "대형견", "고양이"],
    options: ["프리미엄룸", "고양이전용룸", "CCTV", "산책", "픽업"],
    prices: { 소형견: 52000, 중형견: 68000, 대형견: 88000, 고양이: 59000, 프리미엄룸: 105000 },
    open: true, online: true, sameDay: false, longStay: true,
    hours: "09:00 - 22:00", distance: 31.7,
    reservation: "온라인예약 · 공항 픽업 상담",
    features: "공항 픽업, 개별 마당, 장기 여행 케어",
  },
];
