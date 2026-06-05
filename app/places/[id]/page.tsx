import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategoryImage } from "@/lib/images";
import PlaceDetailClient from "./PlaceDetailClient";
import MiniMapClient from "./MiniMapClient";

export const revalidate = 0;

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원", hotel: "펫호텔", cafe: "펫카페", park: "공원",
  grooming: "미용실", training: "훈련·유치원", sitter: "펫시터",
  supply: "용품점", taxi: "펫택시", photo: "사진관",
};

const DUMMY_REVIEWS = [
  { id: 1, author: "멍냥맘", rating: 5, date: "2024.11.20", content: "너무 친절하고 시설이 깨끗해요. 다음에도 꼭 방문할게요!" },
  { id: 2, author: "댕댕이집사", rating: 4, date: "2024.11.15", content: "전반적으로 만족스러웠어요. 가격도 합리적이고 직원분들이 친절했습니다." },
  { id: 3, author: "냥이아빠", rating: 5, date: "2024.10.30", content: "반려동물을 정말 아끼는 곳이에요. 강력 추천합니다!" },
];

const DUMMY_PRICE_LIST = [
  { service: "기본 서비스", price: "30,000원" },
  { service: "프리미엄 서비스", price: "50,000원" },
  { service: "스페셜 케어", price: "80,000원" },
];

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlaceDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: place } = await supabase
    .from("places")
    .select("*")
    .eq("id", id)
    .single();

  if (!place) notFound();

  const categoryLabel = CATEGORY_LABEL[place.category] ?? place.category;
  const heroImage = getCategoryImage(place.category, place.id);
  const priceList = place.price_list ?? DUMMY_PRICE_LIST;
  const rating = place.rating ?? 4.5;
  const reviewCount = place.review_count ?? 3;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">

      {/* ── 뒤로가기 헤더 ── */}
      <div className="bg-white border-b border-gray-100 sticky top-[60px] z-40">
        <div className="max-w-[900px] mx-auto px-4 h-11 flex items-center gap-3">
          <Link href="/search" className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            목록으로
          </Link>
          <span className="text-gray-200">|</span>
          <span className="text-[13px] text-gray-400 truncate">{place.name}</span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-4 space-y-4">

        {/* ── 이미지 갤러리 ── */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-[220px] md:h-[320px] w-full">
            <Image
              src={heroImage}
              alt={place.name}
              fill
              className="object-cover"
              priority
            />
            {/* 찜하기 버튼 */}
            <div className="absolute top-4 right-4">
              <PlaceDetailClient placeId={place.id} />
            </div>
            {/* 카테고리 뱃지 */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 rounded-full text-[12px] font-bold text-gray-700 shadow-sm">
              {categoryLabel}
            </span>
          </div>
          {/* 추가 이미지 썸네일 (더미) */}
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-gray-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border-2 border-white shadow-sm">
                <Image src={heroImage} alt="" fill className="object-cover opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* ── 기본 정보 ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[18px] md:text-[22px] font-extrabold text-gray-900 mb-1">{place.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-[14px]">{"★".repeat(Math.round(rating))}</span>
                <span className="text-[14px] font-bold text-gray-700">{rating.toFixed(1)}</span>
                <span className="text-[13px] text-gray-400">리뷰 {reviewCount}개</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-[14px]">
            {/* 주소 */}
            {place.address && (
              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(place.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-600 hover:text-[#F97316] transition-colors group"
              >
                <svg className="shrink-0 mt-0.5 group-hover:text-[#F97316]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{place.address}</span>
              </a>
            )}

            {/* 전화번호 */}
            {place.phone && (
              <a
                href={`tel:${place.phone}`}
                className="flex items-center gap-3 text-gray-600 hover:text-[#F97316] transition-colors group"
              >
                <svg className="shrink-0 group-hover:text-[#F97316]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>{place.phone}</span>
              </a>
            )}

            {/* 영업시간 */}
            {place.hours && (
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{place.hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── 가격 정보 ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
            💰 가격 정보
          </h2>
          {place.price_info && (
            <p className="text-[13px] text-gray-500 mb-3">{place.price_info}</p>
          )}
          <div className="divide-y divide-gray-50">
            {priceList.map((item: { service: string; price: string }, i: number) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <span className="text-[13px] text-gray-700">{item.service}</span>
                <span className="text-[13px] font-bold text-[#F97316]">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-3">* 가격은 상황에 따라 변동될 수 있습니다</p>
        </div>

        {/* ── 미니맵 ── */}
        {place.lat && place.lng && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50">
              <h2 className="text-[15px] font-bold text-gray-900">📍 위치</h2>
            </div>
            <MiniMapClient
              lat={place.lat}
              lng={place.lng}
              name={place.name}
            />
            <div className="p-3">
              <a
                href={`https://map.kakao.com/link/map/${encodeURIComponent(place.name)},${place.lat},${place.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                카카오맵에서 보기
              </a>
            </div>
          </div>
        )}

        {/* ── 리뷰 섹션 ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-gray-900">
              ⭐ 리뷰 <span className="text-[#F97316]">{reviewCount}</span>
            </h2>
            <button
              disabled
              className="px-4 py-2 text-[12px] font-bold rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              리뷰 작성 (로그인 필요)
            </button>
          </div>

          {/* 평점 요약 */}
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl mb-4">
            <div className="text-center">
              <p className="text-[36px] font-extrabold text-[#F97316]">{rating.toFixed(1)}</p>
              <p className="text-yellow-400 text-[16px]">{"★".repeat(Math.round(rating))}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{reviewCount}개 리뷰</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-3">{star}</span>
                  <span className="text-yellow-400 text-[11px]">★</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F97316] rounded-full"
                      style={{ width: star === 5 ? "70%" : star === 4 ? "20%" : "10%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 리뷰 목록 */}
          <div className="space-y-4">
            {DUMMY_REVIEWS.map((review) => (
              <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-[12px]">🐾</div>
                    <span className="font-semibold text-[13px] text-gray-800">{review.author}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{review.date}</span>
                </div>
                <div className="text-yellow-400 text-[12px] mb-1">{"★".repeat(review.rating)}</div>
                <p className="text-[13px] text-gray-600 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex gap-3">
          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-[#F97316] text-[#F97316] font-bold rounded-xl text-[14px] hover:bg-orange-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              전화하기
            </a>
          )}
          <a
            href={`https://map.kakao.com/link/to/${encodeURIComponent(place.name)},${place.lat},${place.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#F97316] text-white font-bold rounded-xl text-[14px] hover:bg-[#EA6C0A] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            길찾기
          </a>
        </div>
      </div>

    </div>
  );
}

