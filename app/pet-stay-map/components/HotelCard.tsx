"use client";

import { Hotel } from "../data";

function formatWon(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

function getMapSearchUrl(name: string) {
  return `https://map.naver.com/p/search/${encodeURIComponent(name)}`;
}

type Props = {
  hotel: Hotel;
  selectedPet: string;
  selectedOption: string;
};

export default function HotelCard({ hotel, selectedPet, selectedOption }: Props) {
  const getDisplayPrice = () => {
    if (selectedPet !== "all" && hotel.prices[selectedPet]) {
      return { label: `${selectedPet} 1박`, value: hotel.prices[selectedPet] };
    }
    if (selectedOption !== "all" && hotel.prices[selectedOption]) {
      return { label: selectedOption, value: hotel.prices[selectedOption] };
    }
    const lowest = Math.min(...Object.values(hotel.prices));
    return { label: "최저 1박", value: lowest };
  };

  const displayPrice = getDisplayPrice();

  const badges = [
    hotel.open ? "예약 가능" : "예약 마감",
    hotel.online ? "온라인예약" : null,
    hotel.sameDay ? "당일예약" : null,
    hotel.longStay ? "장기숙박 할인" : null,
  ].filter(Boolean) as string[];

  return (
    <article className="bg-white rounded-2xl p-5 flex flex-col gap-3 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-amber-400 font-medium">{hotel.area} · {hotel.district}</p>
          <h3 className="text-base font-bold text-gray-800 mt-0.5">{hotel.name}</h3>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2 mt-1">{hotel.distance.toFixed(1)}km</span>
      </div>

      <p className="text-xs text-gray-400">{hotel.address}</p>

      <div className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-2.5">
        <span className="text-sm text-gray-500">{displayPrice.label}</span>
        <strong className="text-amber-500 font-extrabold text-lg">{formatWon(displayPrice.value)}</strong>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <span
            key={badge}
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              badge === "예약 마감"
                ? "bg-gray-100 text-gray-400"
                : badge === "예약 가능"
                ? "bg-green-100 text-green-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-3 space-y-1.5">
        {Object.entries(hotel.prices).map(([name, price]) => (
          <div key={name} className="flex justify-between text-sm">
            <span className="text-gray-400">{name}</span>
            <strong className="text-gray-700">{formatWon(price)}</strong>
          </div>
        ))}
      </div>

      <dl className="space-y-1.5 text-sm">
        {[
          ["입실 가능", hotel.pets.join(", ")],
          ["호텔 옵션", hotel.options.join(", ")],
          ["예약 방식", hotel.reservation],
          ["운영 시간", hotel.hours],
          ["특징", hotel.features],
        ].map(([dt, dd]) => (
          <div key={dt} className="flex gap-2">
            <dt className="text-gray-300 shrink-0 w-16">{dt}</dt>
            <dd className="text-gray-500">{dd}</dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-2 mt-1">
        <a
          href={getMapSearchUrl(hotel.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          예약·지도 보기
        </a>
        <a
          href={`tel:${hotel.phone.replaceAll("-", "")}`}
          className="flex-1 text-center border border-amber-200 hover:border-amber-400 text-amber-500 hover:text-amber-600 text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          전화 문의
        </a>
      </div>
    </article>
  );
}
