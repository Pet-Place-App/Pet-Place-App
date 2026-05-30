import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const CATEGORY_ICONS = [
  { key: "hospital",  label: "동물병원", icon: "🏥", href: "/search?category=hospital" },
  { key: "hotel",     label: "호텔",     icon: "🏨", href: "/search?category=hotel" },
  { key: "cafe",      label: "펫카페",   icon: "☕", href: "/search?category=cafe" },
  { key: "park",      label: "공원",     icon: "🌳", href: "/search?category=park" },
  { key: "grooming",  label: "미용",     icon: "✂️", href: "/search?category=grooming" },
  { key: "training",  label: "훈련",     icon: "🎓", href: "/search?category=training" },
  { key: "supply",    label: "용품점",   icon: "🛒", href: "/search?category=supply" },
  { key: "photo",     label: "촬영",     icon: "📷", href: "/search?category=photo" },
];

const BOTTOM_BANNERS = [
  { icon: "👨‍⚕️", title: "수의사 상담", desc: "집에서 편하게 전문 수의사 상담", color: "bg-orange-50 border-orange-100" },
  { icon: "📅", title: "24시간 예약", desc: "언제든지 간편하게 예약하세요", color: "bg-blue-50 border-blue-100" },
  { icon: "🐾", title: "동물보험", desc: "소중한 반려동물 건강을 지켜요", color: "bg-green-50 border-green-100" },
  { icon: "24", title: "24시간 고객센터", desc: "02-123-4567", color: "bg-purple-50 border-purple-100" },
];

const DUMMY_PLACES = [
  { id: 0, name: "멍냥 동물병원", category: "hospital", address: "서울시 마포구 합정동", rating: 4.8, review_count: 124, price_info: "30,000원~" },
  { id: 0, name: "멍냥하우스 홈텔", category: "hotel", address: "서울시 강남구 청담동", rating: 4.6, review_count: 87, price_info: "30,000원/박~" },
  { id: 0, name: "한강 반려견 공원", category: "park", address: "서울시 영등포구 여의도동", rating: 4.9, review_count: 312, price_info: "무료" },
  { id: 0, name: "도그라이즈 카페", category: "cafe", address: "서울시 마포구 연남동", rating: 4.7, review_count: 203, price_info: "10,000원~" },
  { id: 0, name: "냥냥 미용실", category: "grooming", address: "서울시 용산구 이태원동", rating: 4.5, review_count: 56, price_info: "35,000원~" },
];

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원", hotel: "펫호텔", cafe: "펫카페", park: "공원",
  grooming: "미용", training: "훈련", supply: "용품점", photo: "촬영",
};
const CATEGORY_EMOJI: Record<string, string> = {
  hospital: "🏥", hotel: "🏨", cafe: "☕", park: "🌳",
  grooming: "✂️", training: "🎓", supply: "🛒", photo: "📷",
};
const CATEGORY_BG: Record<string, string> = {
  hospital: "bg-red-50", hotel: "bg-blue-50", cafe: "bg-yellow-50", park: "bg-green-50",
  grooming: "bg-purple-50", training: "bg-indigo-50", supply: "bg-pink-50", photo: "bg-teal-50",
};

export default async function HomePage() {
  const { data: places } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const featured = (places && places.length > 0) ? places : DUMMY_PLACES;

  return (
    <div className="bg-white min-h-screen">

      {/* ── 히어로 섹션 ── */}
      <section className="bg-[#FFF3E8] border-b border-orange-100">
        <div className="max-w-[1200px] mx-auto px-5 py-12 flex items-center justify-between gap-8">

          {/* 좌측 콘텐츠 */}
          <div className="flex-1 max-w-[520px]">
            {/* 위치 태그 */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#F97316] font-medium mb-4">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              우리 동네 맛집, 동물병원, 산책길
            </div>

            {/* 메인 슬로건 */}
            <h1 className="text-[38px] font-extrabold text-gray-900 leading-[1.25] mb-3">
              반려생활의<br />
              <span className="text-[#F97316]">모든 순간</span>을 함께
            </h1>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-7">
              카페, 녹소, 산책로까지<br />
              한 번에 만나보고 예약하세요.
            </p>

            {/* 검색바 */}
            <form action="/search" method="GET">
              <div className="flex gap-2 bg-white rounded-2xl shadow-md p-2 border border-gray-100">
                {/* 위치 선택 */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl text-[13px] text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  서울 시내 전체
                </div>
                <div className="w-px bg-gray-200 my-1" />
                {/* 검색어 입력 */}
                <input
                  type="text"
                  name="q"
                  placeholder="어디서 찾고 싶으세요?"
                  className="flex-1 text-[13px] outline-none text-gray-700 placeholder:text-gray-300 bg-transparent px-2"
                />
                {/* 검색 버튼 */}
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-[13px] font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  검색
                </button>
              </div>
            </form>
          </div>

          {/* 우측 일러스트 */}
          <div className="hidden lg:flex items-end justify-center gap-0 relative w-[340px] h-[220px] shrink-0">
            {/* 배경 집/나무 장식 */}
            <div className="absolute inset-0 flex items-end justify-center gap-3 opacity-20">
              <div className="w-16 h-20 bg-orange-300 rounded-t-full" />
              <div className="w-24 h-28 bg-orange-400 rounded-t-lg" />
              <div className="w-12 h-16 bg-orange-200 rounded-t-full" />
            </div>
            {/* 동물 이모지 */}
            <div className="relative z-10 text-center">
              <div className="text-[90px] leading-none select-none">🐶</div>
            </div>
            <div className="relative z-10 text-center mb-4">
              <div className="text-[70px] leading-none select-none">🐱</div>
            </div>
            {/* 하트 장식 */}
            <div className="absolute top-4 right-8 text-3xl animate-bounce select-none">❤️</div>
          </div>
        </div>
      </section>

      {/* ── 카테고리 아이콘 ── */}
      <section className="max-w-[1200px] mx-auto px-5 py-8">
        <div className="grid grid-cols-8 gap-3">
          {CATEGORY_ICONS.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className="flex flex-col items-center gap-2 py-4 px-2 bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <span className="text-[28px] group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-[12px] font-medium text-gray-600 group-hover:text-[#F97316] transition-colors">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 추천 서비스 섹션 ── */}
      <section className="max-w-[1200px] mx-auto px-5 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">멍냥이 추천 서비스</h2>
          <Link href="/search" className="text-[13px] text-gray-400 hover:text-[#F97316] transition-colors flex items-center gap-0.5">
            더보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {featured.map((place, i) => (
            <PlaceCard key={place.id || i} place={place} />
          ))}
        </div>
      </section>

      {/* ── 하단 배너 3개 ── */}
      <section className="max-w-[1200px] mx-auto px-5 pb-12">
        <div className="grid grid-cols-4 gap-4">
          {BOTTOM_BANNERS.map((banner) => (
            <div key={banner.title} className={`${banner.color} border rounded-2xl p-5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all`}>
              <div className="text-3xl shrink-0">{banner.icon}</div>
              <div>
                <p className="font-bold text-[13px] text-gray-900">{banner.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{banner.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ── 장소 카드 컴포넌트 ── */
type PlaceType = {
  id: number;
  name: string;
  category: string;
  address?: string;
  price_info?: string;
  rating?: number;
  review_count?: number;
};

function PlaceCard({ place }: { place: PlaceType }) {
  const href = place.id ? `/places/${place.id}` : "/search";
  return (
    <Link href={href} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group">
      {/* 이미지/썸네일 영역 */}
      <div className={`h-[120px] ${CATEGORY_BG[place.category] ?? "bg-gray-50"} flex items-center justify-center relative`}>
        <span className="text-[48px] opacity-50 group-hover:scale-110 transition-transform">
          {CATEGORY_EMOJI[place.category] ?? "🐾"}
        </span>
        {/* 카테고리 뱃지 */}
        <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-gray-700 shadow-sm">
          {CATEGORY_LABEL[place.category] ?? place.category}
        </span>
        {/* 찜하기 버튼 — 클라이언트 인터랙션은 상세 페이지에서 처리 */}
        <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-300 text-[14px]">
          ♡
        </span>
      </div>

      {/* 정보 */}
      <div className="p-3">
        <h3 className="font-bold text-[13px] text-gray-900 group-hover:text-[#F97316] transition-colors mb-0.5 truncate">
          {place.name}
        </h3>
        {place.address && (
          <p className="text-[11px] text-gray-400 truncate mb-1.5">{place.address}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-[11px]">★</span>
            <span className="text-[11px] font-semibold text-gray-700">{(place.rating ?? 0).toFixed(1)}</span>
            <span className="text-[11px] text-gray-400">({place.review_count ?? 0})</span>
          </div>
          {place.price_info && (
            <span className="text-[11px] font-semibold text-[#F97316]">{place.price_info}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
