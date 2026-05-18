"use client";

import { useState, useMemo } from "react";
import { hotels, Hotel } from "../data";
import FilterBar from "./FilterBar";
import HotelCard from "./HotelCard";

type Filters = {
  area: string;
  pet: string;
  service: string;
  open: string;
  keyword: string;
};

const defaultFilters: Filters = {
  area: "all",
  pet: "all",
  service: "all",
  open: "all",
  keyword: "",
};

function getLowestPrice(hotel: Hotel) {
  return Math.min(...Object.values(hotel.prices));
}

function getDisplayPrice(hotel: Hotel, pet: string, service: string) {
  if (pet !== "all" && hotel.prices[pet]) return hotel.prices[pet];
  if (service !== "all" && hotel.prices[service]) return hotel.prices[service];
  return getLowestPrice(hotel);
}

function matchesFilters(hotel: Hotel, filters: Filters): boolean {
  const keyword = filters.keyword.trim().toLowerCase();
  if (keyword) {
    const haystack = [
      hotel.name, hotel.area, hotel.district, hotel.address,
      hotel.pets.join(" "), hotel.options.join(" "),
      hotel.hours, hotel.reservation, hotel.features,
    ].join(" ").toLowerCase();
    if (!haystack.includes(keyword)) return false;
  }

  if (filters.area !== "all" && hotel.area !== filters.area) return false;
  if (filters.pet !== "all" && !hotel.pets.includes(filters.pet)) return false;
  if (filters.service !== "all" && !hotel.options.includes(filters.service)) return false;

  if (filters.open === "open" && !hotel.open) return false;
  if (filters.open === "online" && !hotel.online) return false;
  if (filters.open === "sameDay" && !hotel.sameDay) return false;
  if (filters.open === "longStay" && !hotel.longStay) return false;

  return true;
}

export default function HotelFinder() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filtered = useMemo(() => {
    return hotels
      .filter((h) => matchesFilters(h, filters))
      .sort((a, b) =>
        getDisplayPrice(a, filters.pet, filters.service) -
        getDisplayPrice(b, filters.pet, filters.service)
      );
  }, [filters]);

  const sortLabel =
    filters.pet === "all" ? "최저 1박 가격 기준" : `${filters.pet} 1박 가격 낮은 순`;

  return (
    <section id="finder" className="space-y-5">
      <FilterBar filters={filters} onChange={setFilters} />

      <p className="text-sm text-gray-400">
        {filtered.length}개의 호텔을 찾았습니다. {sortLabel}으로 정렬했습니다.
      </p>

      {filtered.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-10 text-center border border-gray-700">
          <h3 className="text-white font-semibold mb-1">조건에 맞는 호텔이 없습니다</h3>
          <p className="text-gray-400 text-sm">지역을 전체로 바꾸거나 객실·돌봄 옵션을 줄여 다시 검색해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((hotel) => (
            <HotelCard
              key={hotel.name}
              hotel={hotel}
              selectedPet={filters.pet}
              selectedOption={filters.service}
            />
          ))}
        </div>
      )}
    </section>
  );
}
