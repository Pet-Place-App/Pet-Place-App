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
  { key: "all", label: "전체" },
  { key: "hospital", label: "동물병원" },
  { key: "hotel", label: "펫호텔" },
  { key: "cafe", label: "펫카페" },
  { key: "park", label: "산책로" },
  { key: "grooming", label: "미용" },
  { key: "training", label: "훈련" },
  { key: "supply", label: "용품점" },
];

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원", hotel: "펫호텔", cafe: "펫카페", park: "산책로",
  grooming: "미용", training: "훈련", supply: "용품점", photo: "사진관",
};

const DISTANCE_OPTIONS = ["500m", "1km", "2km", "3km", "5km"];
const SORT_OPTIONS = [
  { key: "rating", label: "평점순" },
  { key: "review", label: "리뷰순" },
  { key: "distance", label: "거리순" },
];

type Props = {
  places: Place[];
  naverClientId: string;
  initialQuery: string;
  initialCategory: string;
};

export default function SearchClient({ places, naverClientId, initialQuery, initialCategory }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mapReady, setMapReady] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedDistance, setSelectedDistance] = useState("3km");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchQ =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        (p.address ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [places, query, activeCategory]);

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

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* 페이지 타이틀 & 검색바 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">멍냥냥 검색 🐾</h1>
          <p className="text-sm text-gray-400 mb-4">
            우리 동네 반려동물 시설을 찾아보세요 · 검색 결과{" "}
            <strong className="text-orange-500">{filtered.length}건</strong>
          </p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <svg className="text-gray-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="장소명 또는 주소 검색"
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={handleLocation}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-blue-500 font-semibold hover:bg-blue-50 transition-colors shadow-sm"
            >
              📍 내 위치
            </button>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm">
              검색
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* 좌측 필터 패널 */}
          <aside className="w-56 shrink-0 space-y-5">
            {/* 카테고리 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">카테고리</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.key
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 거리 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">거리</h3>
              <div className="flex flex-wrap gap-2">
                {DISTANCE_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDistance(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedDistance === d
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* 평점 필터 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">최소 평점</h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" className="accent-orange-500" />
                    <span className="text-sm text-gray-600">
                      {"★".repeat(Math.floor(r))} {r}점 이상
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 가격대 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">가격대</h3>
              <div className="space-y-2">
                {["무료", "1만원 미만", "1~3만원", "3~5만원", "5만원 이상"].map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-orange-500" />
                    <span className="text-sm text-gray-600">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* 우측 메인 영역 */}
          <div className="flex-1 min-w-0">
            {/* 정렬 & 뷰 토글 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      sortBy === s.key
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex p-1 bg-gray-100 rounded-lg gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                  }`}
                >
                  목록
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    viewMode === "map" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
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
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-gray-500 font-medium">검색 결과가 없습니다</p>
                    <p className="text-gray-400 text-sm mt-1">다른 키워드로 검색해보세요</p>
                  </div>
                ) : (
                  sorted.map((place) => (
                    <SearchResultCard key={place.id} place={place} />
                  ))
                )}
              </div>
            )}

            {/* 지도 뷰 */}
            {viewMode === "map" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 600 }}>
                {mapReady ? (
                  <NaverMap places={filtered} currentLocation={currentLocation} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <p className="text-gray-400 text-sm">지도를 불러오는 중...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 검색 결과 카드 ── */
function SearchResultCard({ place }: { place: Place }) {
  return (
    <Link
      href={`/places/${place.id}`}
      className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all group"
    >
      {/* 썸네일 */}
      <div className="w-28 h-24 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 overflow-hidden">
        <span className="text-4xl opacity-60">
          {place.category === "hospital" ? "🏥" :
           place.category === "hotel" ? "🏨" :
           place.category === "cafe" ? "☕" :
           place.category === "park" ? "🌳" : "🐾"}
        </span>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <span className="text-xs font-semibold text-orange-500 mr-2">
              {CATEGORY_LABEL[place.category] ?? place.category}
            </span>
            <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-500 transition-colors inline">
              {place.name}
            </h3>
          </div>
          <button className="text-gray-300 hover:text-red-400 transition-colors shrink-0 text-lg">♡</button>
        </div>

        {place.address && (
          <p className="text-xs text-gray-400 mb-1.5 truncate">{place.address}</p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {(place.rating ?? 0) > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <span className="text-yellow-400">★</span>
              <strong className="text-gray-700">{(place.rating ?? 0).toFixed(1)}</strong>
              <span className="text-gray-400">({place.review_count ?? 0})</span>
            </span>
          )}
          {place.price_info && (
            <span className="text-xs font-semibold text-orange-500">{place.price_info}</span>
          )}
          {place.hours && (
            <span className="text-xs text-gray-400">{place.hours}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
