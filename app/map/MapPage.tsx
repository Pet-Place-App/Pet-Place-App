"use client";

import { useState, useEffect } from "react";
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
            placeholder="병원, 호텔, 카페 검색..."
            className="w-full bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-amber-400 placeholder:text-gray-300"
          />
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        {mapReady ? (
          <NaverMap places={places} activeCategory={activeCategory} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-gray-400 text-sm">지도를 불러오는 중...</p>
            </div>
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
