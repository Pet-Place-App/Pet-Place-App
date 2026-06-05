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

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원", hotel: "펫호텔", cafe: "펫카페", park: "공원",
  grooming: "미용실", training: "훈련", sitter: "펫시터",
  supply: "용품점", taxi: "펫택시", photo: "사진관",
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
      <section className="bg-[#FFF3E8]">
        <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex items-center justify-between gap-6">
          <div className="flex-1 max-w-[560px]">
            <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 rounded-full px-3 py-1.5 text-[12px] text-orange-500 font-semibold mb-4 shadow-sm">
              🐾 우리 아이 행복의 시작, 명냥명냥
            </div>
            <h1 className="text-[28px] md:text-[44px] font-extrabold text-gray-900 leading-[1.2] mb-3">
              반려생활의<br />
              <span className="text-[#F97316]">모든 순간</span>을 함께
            </h1>
            <p className="text-[13px] md:text-[15px] text-gray-500 leading-relaxed mb-6">
              카페, 숙소, 산책로까지<br />
              한 번에 찾아보고 예약하세요.
            </p>

            {/* 검색바 */}
            <form action="/search" method="GET">
              <div className="flex items-center bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="pl-3 pr-1 flex items-center shrink-0">
                  <Image src="/searchbar-icon.png" alt="" width={32} height={32} className="rounded-lg" />
                </div>
                <div className="hidden sm:flex items-center gap-1 px-3 py-3 border-r border-gray-100 text-[12px] text-gray-500 whitespace-nowrap shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  지역을 선택해주세요
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="어떤 서비스를 찾고 있나요?"
                  className="flex-1 px-3 py-3 text-[13px] outline-none text-gray-700 placeholder:text-gray-300 min-w-0"
                />
                <button type="submit" className="w-12 h-12 bg-[#F97316] flex items-center justify-center shrink-0 hover:bg-[#EA6C0A] transition-colors">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* 우측 일러스트 — 모바일 숨김 */}
          <div className="hidden lg:block w-[380px] shrink-0">
            <Image src="/hero-pets.png" alt="강아지와 고양이" width={380} height={300} className="w-full h-auto object-contain" priority />
          </div>
        </div>
      </section>

      {/* ── 카테고리 아이콘 ── */}
      <section className="max-w-[1200px] mx-auto px-4 py-5 md:py-7">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* 모바일: 4열, 데스크탑: 8열 */}
          <div className="grid grid-cols-4 md:grid-cols-8">
            {CATEGORY_ICONS.map((cat, i) => (
              <Link
                key={cat.key}
                href={cat.href}
                className={`flex flex-col items-center gap-1.5 py-4 px-2 hover:bg-orange-50 transition-colors group ${
                  i < 7 ? "border-r border-gray-100" : ""
                } ${i >= 4 ? "border-t md:border-t-0 border-gray-100" : ""}`}
              >
                <Image src={cat.img} alt={cat.label} width={48} height={48} className="w-[40px] md:w-[52px] h-auto object-contain group-hover:scale-105 transition-transform" />
                <span className="text-[10px] md:text-[12px] font-medium text-gray-600 group-hover:text-[#F97316] transition-colors text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 추천 서비스 ── */}
      <section className="max-w-[1200px] mx-auto px-4 pb-8 md:pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] md:text-[17px] font-bold text-gray-900">명냥이 맞춤 추천 서비스 🐾</h2>
          <Link href="/search" className="text-[12px] md:text-[13px] text-gray-400 hover:text-[#F97316] flex items-center gap-0.5">
            더보기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>

        {/* 모바일: 2열, 태블릿: 3열, 데스크탑: 5열 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {featured.map((place, i) => (
            <PlaceCard key={place.id || i} place={place} />
          ))}
        </div>
      </section>

      {/* ── 하단 배너 ── */}
      <section className="max-w-[1200px] mx-auto px-4 pb-10">
        {/* 모바일: 2열, 데스크탑: 4열 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BOTTOM_BANNERS.map((b) => (
            <div key={b.title} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <span className="text-[24px] md:text-[28px] shrink-0">{b.icon}</span>
              <div>
                <p className="font-bold text-[12px] md:text-[13px] text-gray-900 leading-tight">{b.title}</p>
                <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5 hidden sm:block">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

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
      <div className="relative bg-[#FFF3E8] aspect-[4/3]">
        <Image src={imgSrc} alt={place.name} fill className="object-cover group-hover:scale-105 transition-transform" />
        <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/95 text-gray-700 shadow-sm">
          {CATEGORY_LABEL[place.category] ?? place.category}
        </span>
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-gray-300 text-[12px]">♡</span>
      </div>
      <div className="p-2.5">
        <h3 className="font-bold text-[12px] md:text-[13px] text-gray-900 group-hover:text-[#F97316] transition-colors mb-0.5 truncate">{place.name}</h3>
        {place.address && <p className="text-[10px] md:text-[11px] text-gray-400 truncate mb-1">{place.address}</p>}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-0.5 text-[10px] md:text-[11px]">
            <span className="text-yellow-400">★</span>
            <strong className="text-gray-700">{(place.rating ?? 0).toFixed(1)}</strong>
            <span className="text-gray-400 hidden sm:inline">({place.review_count ?? 0})</span>
          </span>
          {place.price_info && <span className="text-[10px] md:text-[11px] font-bold text-[#F97316] truncate ml-1">{place.price_info}</span>}
        </div>
      </div>
    </Link>
  );
}
