"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Place = {
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  price_info: string;
  lat: number;
  lng: number;
};

const CATEGORIES = [
  { key: "all", label: "전체", emoji: "🗺️" },
  { key: "hospital", label: "병원", emoji: "🏥" },
  { key: "hotel", label: "호텔", emoji: "🏨" },
  { key: "cafe", label: "카페", emoji: "☕" },
  { key: "park", label: "산책", emoji: "🌳" },
];

const CATEGORY_COLOR: Record<string, string> = {
  hospital: "bg-red-100 text-red-600",
  hotel: "bg-blue-100 text-blue-600",
  cafe: "bg-green-100 text-green-600",
  park: "bg-yellow-100 text-yellow-600",
};

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "병원",
  hotel: "호텔",
  cafe: "카페",
  park: "산책",
};

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaces() {
      const { data } = await supabase.from("places").select("*").order("name");
      setPlaces(data ?? []);
      setLoading(false);
    }
    fetchPlaces();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = places.filter((place) => {
    const matchesCategory = activeCategory === "all" || place.category === activeCategory;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      place.name.toLowerCase().includes(normalizedQuery) ||
      (place.address ?? "").toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 h-14 bg-white border-b border-amber-100 shadow-sm shrink-0">
        <Image src="/pet-logo.png" alt="펫플레이스" width={32} height={32} className="rounded-xl" />
        <span className="font-bold text-amber-600 text-lg">장소 목록</span>
        <div className="flex-1 ml-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="장소 검색..."
            className="w-full bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-amber-400 placeholder:text-gray-300"
          />
        </div>
      </header>

      {/* Category Filter */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-amber-100 shrink-0 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? "bg-amber-400 text-white"
                : "bg-amber-50 text-gray-500 border border-amber-200"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400 text-sm">불러오는 중...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400 text-sm">
              {searchQuery.trim() ? "검색 결과가 없습니다" : "장소가 없습니다"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400">{filtered.length}개 장소</p>
            {filtered.map((place, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          CATEGORY_COLOR[place.category] ?? "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {CATEGORY_LABEL[place.category] ?? place.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm leading-tight">{place.name}</h3>
                    {place.address && (
                      <p className="text-xs text-gray-400 mt-1 truncate">{place.address}</p>
                    )}
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="text-xs text-amber-500 mt-0.5 block"
                      >
                        {place.phone}
                      </a>
                    )}
                    {place.hours && (
                      <p className="text-xs text-gray-400 mt-0.5">{place.hours}</p>
                    )}
                    {place.price_info && (
                      <p className="text-xs text-amber-600 font-medium mt-0.5">{place.price_info}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
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
