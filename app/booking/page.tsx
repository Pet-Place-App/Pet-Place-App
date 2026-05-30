"use client";

import { useState } from "react";
import Image from "next/image";

const SERVICES = [
  { id: "bath", label: "목욕", icon: "🛁", price: "30,000원~" },
  { id: "grooming", label: "미용", icon: "✂️", price: "40,000원~" },
  { id: "nail", label: "발톱", icon: "💅", price: "10,000원~" },
  { id: "dental", label: "스케일링", icon: "🦷", price: "80,000원~" },
  { id: "hotel", label: "호텔링", icon: "🏨", price: "30,000원/박~" },
  { id: "photo", label: "사진촬영", icon: "📷", price: "50,000원~" },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function BookingPage() {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const days = generateCalendar(calYear, calMonth);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedServiceObjs = SERVICES.filter((s) => selectedServices.includes(s.id));

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  };

  return (
    <>
      <div className="w-full">
        <Image src="/img-booking.png" alt="예약 화면 디자인" width={1440} height={700} className="w-full h-auto" priority />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">서비스 예약</h1>
        <p className="text-sm text-gray-400">원하시는 서비스와 날짜·시간을 선택하세요</p>
      </div>

      {/* 3단 레이아웃 */}
      <div className="grid grid-cols-3 gap-5">
        {/* 1. 서비스 선택 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            서비스 선택
          </h2>
          <p className="text-xs text-gray-400 mb-4">복수 선택 가능합니다</p>
          <div className="space-y-2">
            {SERVICES.map((s) => {
              const selected = selectedServices.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    selected
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-100 hover:border-orange-200 hover:bg-orange-50/50"
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">{s.label}</p>
                    <p className="text-xs text-orange-500">{s.price}</p>
                  </div>
                  {selected && <span className="text-orange-500 text-lg">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 날짜 & 시간 선택 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
            날짜 & 시간 선택
          </h2>

          {/* 달력 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">‹</button>
            <span className="text-sm font-bold text-gray-900">
              {calYear}년 {calMonth + 1}월
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">›</button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 mb-1">
            {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
              <div key={d} className={`text-center text-xs font-semibold py-1 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-500"}`}>
                {d}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-0.5 mb-4">
            {days.map((day, i) => {
              if (!day) return <div key={i} />;
              const isPast = day < now.getDate() && calYear === now.getFullYear() && calMonth === now.getMonth();
              const isSelected = selectedDay === day;
              const dayOfWeek = (i) % 7;
              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square flex items-center justify-center text-xs rounded-full transition-colors ${
                    isSelected
                      ? "bg-orange-500 text-white font-bold"
                      : isPast
                      ? "text-gray-300 cursor-not-allowed"
                      : dayOfWeek === 0
                      ? "text-red-400 hover:bg-red-50"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* 시간 선택 */}
          <h3 className="text-xs font-bold text-gray-500 mb-2">시간 선택</h3>
          <div className="grid grid-cols-5 gap-1.5">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedTime === t
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 선택 요약 & 결제 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
            선택 확인 및 결제
          </h2>

          {selectedServiceObjs.length === 0 ? (
            <div className="text-center py-6 text-gray-300">
              <p className="text-4xl mb-2">🐾</p>
              <p className="text-sm">서비스를 선택해주세요</p>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <h3 className="text-xs font-bold text-gray-500">선택한 서비스</h3>
              {selectedServiceObjs.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-900">{s.icon} {s.label}</span>
                  <span className="text-sm font-semibold text-orange-500">{s.price}</span>
                </div>
              ))}
            </div>
          )}

          {/* 날짜/시간 확인 */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">날짜</span>
              <span className="font-semibold text-gray-900">
                {selectedDay
                  ? `${calYear}.${String(calMonth + 1).padStart(2, "0")}.${String(selectedDay).padStart(2, "0")}`
                  : "날짜를 선택하세요"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">시간</span>
              <span className="font-semibold text-gray-900">{selectedTime ?? "시간을 선택하세요"}</span>
            </div>
          </div>

          {/* 안내 사항 */}
          <div className="text-xs text-gray-400 leading-relaxed mb-5 space-y-1">
            <p>• 예약 취소는 24시간 전까지 가능합니다</p>
            <p>• 반려동물 정보를 미리 등록하면 더 빠른 예약이 가능합니다</p>
            <p>• 가격은 상황에 따라 변동될 수 있습니다</p>
          </div>

          <button
            disabled={selectedServices.length === 0 || !selectedDay || !selectedTime}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
          >
            {selectedServices.length === 0 || !selectedDay || !selectedTime
              ? "서비스·날짜·시간을 선택해주세요"
              : "예약 신청하기"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
