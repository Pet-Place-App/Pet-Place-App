"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";

const NaverMap = dynamic(() => import("./NaverMap"), { ssr: false });

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
};

const CATEGORIES = [
  { key: "all", label: "전체", emoji: "🗺️" },
  { key: "hospital", label: "병원", emoji: "🏥" },
  { key: "hotel", label: "호텔", emoji: "🏨" },
  { key: "cafe", label: "카페", emoji: "☕" },
  { key: "park", label: "산책", emoji: "🌳" },
];

type Props = {
  places: Place[];
  naverClientId: string;
};

export default function MapPage({ places, naverClientId }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [mapReady, setMapReady] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return places.filter((place) => {
      const matchesCategory = activeCategory === "all" || place.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        place.name.toLowerCase().includes(normalizedQuery) ||
        (place.address ?? "").toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, places, searchQuery]);

  const handleCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("현재 위치를 사용할 수 없는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocationError("위치 권한을 허용하면 현재 위치를 표시할 수 있습니다.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`}
        strategy="afterInteractive"
        onLoad={() => setMapReady(true)}
      />

      {/* Header */}
      <header className="flex items-center gap-3 px-4 h-14 bg-white border-b border-amber-100 shadow-sm shrink-0">
        <Image src="/pet-logo.png" alt="펫플레이스" width={32} height={32} className="rounded-xl" />
        <span className="font-bold text-amber-600 text-lg">펫플레이스</span>
        <div className="flex-1 ml-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="병원, 호텔, 카페 검색..."
            className="w-full bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-amber-400 placeholder:text-gray-300"
          />
        </div>
      </header>

      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-amber-100 shrink-0">
        <div className="grid grid-cols-2 p-1 bg-amber-50 border border-amber-200 rounded-full">
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              viewMode === "map" ? "bg-amber-400 text-white" : "text-gray-500"
            }`}
          >
            지도보기
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              viewMode === "list" ? "bg-amber-400 text-white" : "text-gray-500"
            }`}
          >
            목록보기
          </button>
        </div>
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="ml-auto px-3 py-2 rounded-full bg-white border border-blue-200 text-blue-600 text-xs font-semibold shadow-sm"
        >
          내 위치
        </button>
      </div>

      {locationError && (
        <p className="px-4 py-2 bg-blue-50 text-blue-600 text-xs border-b border-blue-100">
          {locationError}
        </p>
      )}

      <div className="px-4 py-2 bg-white border-b border-amber-100 text-xs text-gray-400 shrink-0">
        {filteredPlaces.length > 0
          ? `${filteredPlaces.length}개 장소`
          : searchQuery.trim()
            ? "검색 결과가 없습니다"
            : "장소가 없습니다"}
      </div>

      {/* Map/List */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === "map" && mapReady ? (
          <NaverMap places={filteredPlaces} currentLocation={currentLocation} />
        ) : viewMode === "map" ? (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-gray-400 text-sm">지도를 불러오는 중...</p>
            </div>
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="h-full overflow-y-auto px-4 py-3 bg-amber-50">
            <div className="flex flex-col gap-3">
              {filteredPlaces.map((place) => (
                <article
                  key={place.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      {CATEGORIES.find((cat) => cat.key === place.category)?.label ?? place.category}
                    </span>
                  </div>
                  <h2 className="font-bold text-gray-800 text-sm leading-tight">{place.name}</h2>
                  {place.address && (
                    <p className="text-xs text-gray-500 mt-1">{place.address}</p>
                  )}
                  {place.phone && (
                    <a href={`tel:${place.phone}`} className="text-xs text-amber-600 mt-1 block">
                      {place.phone}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <p className="text-gray-400 text-sm">
              {searchQuery.trim() ? "검색 결과가 없습니다" : "장소가 없습니다"}
            </p>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <nav className="flex bg-white border-t border-amber-100 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
              activeCategory === cat.key
                ? "text-amber-500 border-t-2 border-amber-400"
                : "text-gray-400 border-t-2 border-transparent"
            }`}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span className="text-xs font-medium">{cat.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
