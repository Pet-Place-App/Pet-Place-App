import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const CATEGORY_ICONS = [
  { key: "hospital", label: "동물병원", icon: "🏥", href: "/search?category=hospital" },
  { key: "hotel", label: "펫호텔", icon: "🏨", href: "/search?category=hotel" },
  { key: "cafe", label: "펫카페", icon: "☕", href: "/search?category=cafe" },
  { key: "park", label: "산책로", icon: "🌳", href: "/search?category=park" },
  { key: "grooming", label: "미용", icon: "✂️", href: "/search?category=grooming" },
  { key: "training", label: "훈련", icon: "🎓", href: "/search?category=training" },
  { key: "supply", label: "용품점", icon: "🛒", href: "/search?category=supply" },
  { key: "photo", label: "사진관", icon: "📷", href: "/search?category=photo" },
];

export default async function HomePage() {
  const { data: places } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const featured = places ?? [];

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-14 flex items-center justify-between gap-8">
          {/* 좌측 텍스트 */}
          <div className="flex-1 max-w-xl">
            <p className="text-sm text-orange-400 font-semibold mb-2 flex items-center gap-1">
              <span>📍</span> 우리 동네 맛집, 동물병원, 산책길
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              반려생활의<br />
              <span className="text-orange-500">모든 순간</span>을 함께
            </h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              카페, 녹소, 산책로까지<br />
              한 번에 만나보고 예약하세요.
            </p>

            {/* 검색바 */}
            <form action="/search" method="GET" className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <svg className="text-gray-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  name="q"
                  placeholder="어디서 찾고 싶으세요?"
                  className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm min-w-28">
                <svg className="text-gray-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm text-gray-500">서울 시내 전체</span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
              >
                검색
              </button>
            </form>
          </div>

          {/* 우측 일러스트 영역 */}
          <div className="hidden lg:flex items-center justify-center w-80 h-64 relative">
            <div className="absolute inset-0 bg-orange-100 rounded-3xl opacity-50" />
            <div className="relative text-center">
              <div className="text-8xl">🐶🐱</div>
              <p className="text-orange-400 font-semibold mt-2 text-sm">반려동물과 함께</p>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 아이콘 */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-8 gap-4">
          {CATEGORY_ICONS.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-orange-500 transition-colors text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 추천 서비스 섹션 */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">멍냥이 추천 서비스</h2>
          <Link href="/search" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            더보기 →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {DUMMY_CARDS.map((card, i) => (
              <PlaceCard key={i} {...card} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {featured.map((place) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                category={place.category}
                address={place.address}
                phone={place.phone}
                price_info={place.price_info}
                rating={place.rating ?? 4.5}
                review_count={place.review_count ?? 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* 앱 다운로드 배너 */}
      <section className="bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between gap-8">
          <div>
            <p className="text-orange-200 text-sm font-medium mb-1">📱 언제 어디서나</p>
            <h3 className="text-2xl font-bold mb-2">멍냥냥 앱으로 더 편하게!</h3>
            <p className="text-orange-100 text-sm">
              위치 기반 검색, 실시간 예약, 알림까지<br />
              앱에서 훨씬 빠르게 이용하세요.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-3 bg-white text-orange-500 font-bold rounded-xl text-sm hover:bg-orange-50 transition-colors">
              App Store
            </button>
            <button className="px-5 py-3 bg-white text-orange-500 font-bold rounded-xl text-sm hover:bg-orange-50 transition-colors">
              Google Play
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── 카드 컴포넌트 ── */
type PlaceCardProps = {
  id?: number;
  name: string;
  category: string;
  address?: string;
  phone?: string;
  price_info?: string;
  rating?: number;
  review_count?: number;
  imageUrl?: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원",
  hotel: "펫호텔",
  cafe: "펫카페",
  park: "산책로",
  grooming: "미용",
  training: "훈련",
  supply: "용품점",
  photo: "사진관",
};

const CATEGORY_BG: Record<string, string> = {
  hospital: "bg-red-50",
  hotel: "bg-blue-50",
  cafe: "bg-green-50",
  park: "bg-yellow-50",
  grooming: "bg-purple-50",
  training: "bg-indigo-50",
  supply: "bg-pink-50",
  photo: "bg-teal-50",
};

function PlaceCard({ id, name, category, address, price_info, rating = 4.5, review_count = 0, imageUrl }: PlaceCardProps) {
  const href = id ? `/places/${id}` : "#";
  return (
    <Link href={href} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all group">
      {/* 이미지 영역 */}
      <div className={`h-40 ${CATEGORY_BG[category] ?? "bg-gray-50"} flex items-center justify-center relative overflow-hidden`}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-5xl opacity-60">
            {category === "hospital" ? "🏥" :
             category === "hotel" ? "🏨" :
             category === "cafe" ? "☕" :
             category === "park" ? "🌳" : "🐾"}
          </span>
        )}
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 shadow-sm">
          {CATEGORY_LABEL[category] ?? category}
        </span>
      </div>

      {/* 카드 내용 */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-500 transition-colors mb-1">{name}</h3>
        {address && <p className="text-xs text-gray-400 truncate mb-2">{address}</p>}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({review_count})</span>
          </div>
          {price_info && (
            <span className="text-xs font-semibold text-orange-500">{price_info}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* 더미 카드 (DB 데이터 없을 때) */
const DUMMY_CARDS: PlaceCardProps[] = [
  { name: "멍냥 동물병원", category: "hospital", address: "서울시 마포구 합정동", price_info: "진료비 30,000~", rating: 4.8, review_count: 124 },
  { name: "멍냥하우스 홈텔", category: "hotel", address: "서울시 강남구 청담동", price_info: "1박 30,000~", rating: 4.6, review_count: 87 },
  { name: "한강 반려견 공원", category: "park", address: "서울시 영등포구 여의도동", price_info: "무료", rating: 4.9, review_count: 312 },
  { name: "도그라이즈 카페", category: "cafe", address: "서울시 마포구 연남동", price_info: "입장료 10,000~", rating: 4.7, review_count: 203 },
  { name: "냥냥 미용실", category: "grooming", address: "서울시 용산구 이태원동", price_info: "미용 35,000~", rating: 4.5, review_count: 56 },
  { name: "럭키독 사진관", category: "photo", address: "서울시 성동구 성수동", price_info: "촬영 50,000~", rating: 4.8, review_count: 91 },
];
