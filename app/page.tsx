import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getCategoryImage } from "@/lib/images";

export const revalidate = 0;

const CATEGORY_ICONS = [
  { key: "hotel",    label: "펫호텔",    img: "/cat-hotel.png",    href: "/search?category=hotel" },
  { key: "grooming", label: "미용실",    img: "/cat-grooming.png", href: "/search?category=grooming" },
  { key: "hospital", label: "동물병원",  img: "/cat-hospital.png", href: "/search?category=hospital" },
  { key: "training", label: "훈련·유치원", img: "/cat-training.png", href: "/search?category=training" },
  { key: "taxi",     label: "펫택시",    img: "/cat-taxi.png",     href: "/search?category=taxi" },
  { key: "sitter",   label: "펫시터",    img: "/cat-sitter.png",   href: "/search?category=sitter" },
  { key: "supply",   label: "용품·간식", img: "/cat-supply.png",   href: "/search?category=supply" },
  { key: "all",      label: "전체보기",  img: "/cat-all.png",      href: "/search" },
];


const BOTTOM_BANNERS = [
  { icon: "🛡️", title: "안심할 수 있는 서비스", desc: "검증된 업체와 리뷰 시스템" },
  { icon: "📅", title: "간편한 예약",            desc: "원하는 시간에 쉽게 예약" },
  { icon: "🎁", title: "다양한 혜택",            desc: "명냥명냥만의 특별 할인" },
  { icon: "💬", title: "24시간 고객센터",         desc: "언제든지 문의하세요" },
];

const DUMMY_PLACES = [
  { id: 0, name: "명명 호텔",      category: "hotel",    address: "서울 강남구", rating: 4.9, review_count: 125, price_info: "1박 35,000원~" },
  { id: 0, name: "댕댕이 미용실",  category: "grooming", address: "서울 서초구", rating: 4.8, review_count: 98,  price_info: "30,000원~" },
  { id: 0, name: "명냥 동물병원",  category: "hospital", address: "서울 송파구", rating: 4.9, review_count: 312, price_info: "진료비 10,000원~" },
  { id: 0, name: "명냥 훈련소",    category: "training", address: "경기 성남시", rating: 4.7, review_count: 76,  price_info: "월 200,000원~" },
  { id: 0, name: "명냥 펫시터",    category: "sitter",   address: "서울 마포구", rating: 4.9, review_count: 156, price_info: "1시간 15,000원~" },
];

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
      <section className="bg-[#FFF3E8]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex items-center justify-between gap-6">

          {/* 좌측 */}
          <div className="flex-1 max-w-[560px]">
            {/* 배지 */}
            <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 rounded-full px-3 py-1.5 text-[12px] text-orange-500 font-semibold mb-5 shadow-sm">
              🐾 우리 아이 행복의 시작, 명냥명냥
            </div>

            <h1 className="text-[44px] font-extrabold text-gray-900 leading-[1.2] mb-3">
              반려생활의<br />
              <span className="text-[#F97316]">모든 순간</span>을 함께
            </h1>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              카페, 숙소, 산책로까지<br />
              한 번에 찾아보고 예약하세요.
            </p>

            {/* 검색바 — 원본과 동일한 디자인 */}
            <form action="/search" method="GET">
              <div className="flex items-center bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {/* 강아지 아이콘 */}
                <div className="pl-3 pr-1 flex items-center shrink-0">
                  <Image src="/searchbar-icon.png" alt="" width={36} height={36} className="rounded-lg" />
                </div>
                {/* 지역 선택 */}
                <div className="flex items-center gap-1 px-3 py-3 border-r border-gray-100 text-[13px] text-gray-500 cursor-pointer whitespace-nowrap shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  지역을 선택해주세요
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {/* 검색어 */}
                <input
                  type="text"
                  name="q"
                  placeholder="어떤 서비스를 찾고 있나요?"
                  className="flex-1 px-4 py-3 text-[13px] outline-none text-gray-700 placeholder:text-gray-300"
                />
                {/* 검색 버튼 */}
                <button
                  type="submit"
                  className="w-12 h-12 bg-[#F97316] flex items-center justify-center shrink-0 hover:bg-[#EA6C0A] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* 우측 — 크롭한 일러스트 이미지 */}
          <div className="hidden lg:block w-[420px] shrink-0">
            <Image
              src="/hero-pets.png"
              alt="강아지와 고양이"
              width={420}
              height={340}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 카테고리 아이콘 ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-8">
            {CATEGORY_ICONS.map((cat, i) => (
              <Link
                key={cat.key}
                href={cat.href}
                className={`flex flex-col items-center gap-2 py-5 px-2 hover:bg-orange-50 transition-colors group ${i < 7 ? "border-r border-gray-100" : ""}`}
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] object-contain group-hover:scale-105 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 추천 서비스 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-gray-900 flex items-center gap-1">
            명냥이 맞춤 추천 서비스 🐾
          </h2>
          <Link href="/search" className="text-[13px] text-gray-400 hover:text-[#F97316] flex items-center gap-0.5">
            더보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {featured.map((place, i) => (
            <PlaceCard key={place.id || i} place={place} />
          ))}
        </div>
      </section>

      {/* ── 하단 배너 4개 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-4 gap-4">
          {BOTTOM_BANNERS.map((b) => (
            <div key={b.title} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <span className="text-[28px] shrink-0">{b.icon}</span>
              <div>
                <p className="font-bold text-[13px] text-gray-900">{b.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ── 장소 카드 ── */
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
  const imgSrc = getCategoryImage(place.category, place.id);

  return (
    <Link href={href} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group">
      {/* 카드 이미지 */}
      <div className="relative bg-[#FFF3E8]">
        <Image
          src={imgSrc}
          alt={place.name}
          width={254}
          height={158}
          className="w-full h-auto object-cover"
        />
        {/* 카테고리 뱃지 */}
        <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/95 text-gray-700 shadow-sm">
          {place.category === "hotel" ? "펫호텔" :
           place.category === "grooming" ? "미용실" :
           place.category === "hospital" ? "동물병원" :
           place.category === "training" ? "훈련·유치원" :
           place.category === "sitter" ? "펫시터" :
           place.category === "cafe" ? "펫카페" : place.category}
        </span>
        {/* 찜 버튼 */}
        <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-gray-300 text-[14px]">
          ♡
        </span>
      </div>

      {/* 카드 정보 */}
      <div className="p-3">
        <h3 className="font-bold text-[13px] text-gray-900 group-hover:text-[#F97316] transition-colors mb-0.5 truncate">
          {place.name}
        </h3>
        {place.address && (
          <p className="text-[11px] text-gray-400 mb-1.5 truncate flex items-center gap-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#9CA3AF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {place.address}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px]">
            <span className="text-yellow-400">★</span>
            <strong className="text-gray-700">{(place.rating ?? 0).toFixed(1)}</strong>
            <span className="text-gray-400">({place.review_count ?? 0})</span>
          </span>
          {place.price_info && (
            <span className="text-[11px] font-bold text-[#F97316]">{place.price_info}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
