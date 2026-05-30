"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Link from "next/link";

const NaverMap = dynamic(() => import("../map/NaverMap"), { ssr: false });

type Place = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  price_info: string;
  rating?: number;
  review_count?: number;
};

const CATEGORIES = [
  { key: "all",      label: "전체" },
  { key: "hospital", label: "동물병원" },
  { key: "hotel",    label: "펫호텔" },
  { key: "cafe",     label: "펫카페" },
  { key: "park",     label: "공원" },
  { key: "grooming", label: "미용" },
  { key: "training", label: "훈련" },
  { key: "supply",   label: "용품점" },
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

const SORT_OPTIONS = [
  { key: "rating",   label: "평점순" },
  { key: "review",   label: "리뷰순" },
  { key: "distance", label: "거리순" },
];

type Props = {
  places: Place[];
  naverClientId: string;
  initialQuery: string;
  initialCategory: string;
};

export default function SearchClient({ places, naverClientId, initialQuery, initialCategory }: Props) {
  const [query, setQuery]                   = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [viewMode, setViewMode]             = useState<"list" | "map">("list");
  const [mapReady, setMapReady]             = useState(false);
  const [sortBy, setSortBy]                 = useState("rating");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 좌측 필터 상태
  const [minRating, setMinRating]   = useState<number | null>(null);
  const [maxPrice, setMaxPrice]     = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchQ   = q.length === 0 || p.name.toLowerCase().includes(q) || (p.address ?? "").toLowerCase().includes(q);
      const matchRating = minRating === null || (p.rating ?? 0) >= minRating;
      return matchCat && matchQ && matchRating;
    });
  }, [places, query, activeCategory, minRating]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "review") return (b.review_count ?? 0) - (a.review_count ?? 0);
      return 0;
    });
  }, [filtered, sortBy]);

  const handleLocation = () => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`}
        strategy="afterInteractive"
        onLoad={() => setMapReady(true)}
      />

      <div className="bg-white min-h-screen">
        {/* ── 검색 헤더 바 ── */}
        <div className="bg-[#FFF3E8] border-b border-orange-100 py-5">
          <div className="max-w-[1200px] mx-auto px-5">
            <h1 className="text-[20px] font-extrabold text-gray-900 mb-1">
              멍냥냥 검색
              {query && <span className="text-[#F97316] ml-2">"{query}"</span>}
            </h1>
            <p className="text-[13px] text-gray-400 mb-4">
              우리 동네 반려동물 시설을 찾아보세요 · 검색 결과{" "}
              <strong className="text-[#F97316]">{filtered.length}건</strong>
            </p>

            {/* 검색바 */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                <svg className="text-gray-400 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="장소명 또는 주소 검색"
                  className="flex-1 text-[13px] outline-none text-gray-700 placeholder:text-gray-300"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-gray-300 hover:text-gray-500">✕</button>
                )}
              </div>
              <button
                onClick={handleLocation}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-blue-500 font-semibold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                내 위치
              </button>
              <button className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold rounded-xl transition-colors text-[13px] shadow-sm">
                검색
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-5 py-6 flex gap-5">
          {/* ── 좌측 필터 패널 ── */}
          <aside className="w-[200px] shrink-0 space-y-4">
            {/* 카테고리 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">카테고리</h3>
              </div>
              <div className="p-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors flex items-center justify-between ${
                      activeCategory === cat.key
                        ? "bg-orange-50 text-[#F97316] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.label}
                    {activeCategory === cat.key && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 최소 평점 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">최소 평점</h3>
              </div>
              <div className="p-3 space-y-2">
                {[null, 4.5, 4.0, 3.5].map((r) => (
                  <label key={String(r)} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                      className="accent-[#F97316]"
                    />
                    <span className="text-[12px] text-gray-600">
                      {r === null ? "전체" : `★ ${r}점 이상`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 가격대 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">가격대</h3>
              </div>
              <div className="p-3 space-y-2">
                {["전체", "무료", "1만원 미만", "1~3만원", "3만원 이상"].map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={maxPrice === p}
                      onChange={() => setMaxPrice(p)}
                      className="accent-[#F97316]"
                    />
                    <span className="text-[12px] text-gray-600">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ── 우측 메인 ── */}
          <div className="flex-1 min-w-0">
            {/* 정렬 + 뷰 토글 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                      sortBy === s.key
                        ? "bg-[#F97316] text-white"
                        : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex p-1 bg-gray-100 rounded-lg gap-0.5">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"
                  }`}
                >
                  목록
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
                    viewMode === "map" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"
                  }`}
                >
                  지도
                </button>
              </div>
            </div>

            {/* 목록 뷰 */}
            {viewMode === "list" && (
              <div className="space-y-3">
                {sorted.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                    <p className="text-5xl mb-3">🔍</p>
                    <p className="text-gray-500 font-semibold">검색 결과가 없습니다</p>
                    <p className="text-gray-400 text-[13px] mt-1">다른 키워드나 카테고리로 검색해보세요</p>
                  </div>
                ) : (
                  sorted.map((place) => <SearchCard key={place.id} place={place} />)
                )}
              </div>
            )}

            {/* 지도 뷰 */}
            {viewMode === "map" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 560 }}>
                {mapReady
                  ? <NaverMap places={filtered} currentLocation={currentLocation} />
                  : <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-[13px]">지도를 불러오는 중...</div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 검색 결과 카드 ── */
function SearchCard({ place }: { place: Place }) {
  return (
    <Link
      href={`/places/${place.id}`}
      className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all group"
    >
      {/* 썸네일 */}
      <div className={`w-[110px] h-[90px] rounded-xl ${CATEGORY_BG[place.category] ?? "bg-gray-50"} flex items-center justify-center shrink-0 overflow-hidden`}>
        <span className="text-[40px] opacity-60 group-hover:scale-110 transition-transform">
          {CATEGORY_EMOJI[place.category] ?? "🐾"}
        </span>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-full">
              {CATEGORY_LABEL[place.category] ?? place.category}
            </span>
            <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#F97316] transition-colors">
              {place.name}
            </h3>
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0 text-[18px] leading-none"
          >
            ♡
          </button>
        </div>

        {place.address && (
          <p className="text-[12px] text-gray-400 mb-1.5 truncate flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#9CA3AF">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {place.address}
          </p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {(place.rating ?? 0) > 0 && (
            <span className="flex items-center gap-1 text-[12px]">
              <span className="text-yellow-400">★</span>
              <strong className="text-gray-700">{(place.rating ?? 0).toFixed(1)}</strong>
              <span className="text-gray-400">({place.review_count ?? 0})</span>
            </span>
          )}
          {place.price_info && (
            <span className="text-[12px] font-semibold text-[#F97316]">{place.price_info}</span>
          )}
          {place.hours && (
            <span className="text-[12px] text-gray-400">{place.hours}</span>
          )}
          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[12px] text-blue-400 hover:text-blue-600"
            >
              {place.phone}
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
