import Image from "next/image";
import UserSidebar from "../components/UserSidebar";
import Link from "next/link";
import { getCategoryImage } from "@/lib/images";

const TABS = ["전체", "예약확정", "이용완료", "취소됨", "노쇼"];

const DUMMY_BOOKINGS = [
  { id: 1, name: "멍냥 동물병원",   category: "hospital", categoryLabel: "동물병원", date: "2024.12.18", time: "14:00 ~ 15:00",    status: "예약확정", price: "30,000원", services: "기본 진료" },
  { id: 2, name: "멍냥하우스 홈텔", category: "hotel",    categoryLabel: "펫호텔",   date: "2024.12.20", time: "15:00 ~ 익일 12:00", status: "예약확정", price: "30,000원", services: "1박 호텔링" },
  { id: 3, name: "냥냥 미용실",     category: "grooming", categoryLabel: "미용",     date: "2024.12.10", time: "11:00 ~ 12:30",    status: "이용완료", price: "45,000원", services: "전신 미용" },
  { id: 4, name: "도그라이즈 카페", category: "cafe",     categoryLabel: "펫카페",   date: "2024.12.05", time: "13:00 ~ 14:00",    status: "이용완료", price: "10,000원", services: "입장권 1매" },
];

const STATUS_STYLE: Record<string, string> = {
  "예약확정": "bg-green-100 text-green-600",
  "이용완료": "bg-gray-100 text-gray-500",
  "취소됨": "bg-red-100 text-red-500",
  "노쇼": "bg-yellow-100 text-yellow-600",
};

export default function BookingsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-7">
        <div className="flex gap-5">
          <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-[20px] font-extrabold text-gray-900">나의 예약 내역</h1>
                <p className="text-[13px] text-gray-400 mt-0.5">총 {DUMMY_BOOKINGS.length}건의 예약이 있어요</p>
              </div>
              <Link href="/booking" className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold rounded-xl text-[13px] transition-colors">
                + 새 예약
              </Link>
            </div>

            {/* 탭 */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 w-fit">
              {TABS.map((tab, i) => (
                <button key={tab} className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${i === 0 ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* 목록 */}
            <div className="space-y-3">
              {DUMMY_BOOKINGS.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0">
                      <Image src={getCategoryImage(b.category, b.id)} alt={b.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-[11px] font-bold text-[#F97316] mr-1.5">{b.categoryLabel}</span>
                          <span className="font-bold text-[14px] text-gray-900">{b.name}</span>
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLE[b.status] ?? "bg-gray-100 text-gray-500"}`}>{b.status}</span>
                      </div>
                      <p className="text-[12px] text-gray-400 mb-0.5">{b.date} · {b.time}</p>
                      <p className="text-[12px] text-gray-500 mb-2">{b.services}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-extrabold text-[#F97316]">{b.price}</span>
                        <div className="flex gap-2">
                          {b.status === "예약확정" && (
                            <button className="text-[11px] px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">예약 취소</button>
                          )}
                          {b.status === "이용완료" && (
                            <Link href="/reviews" className="text-[11px] px-3 py-1.5 bg-orange-50 text-[#F97316] rounded-lg font-bold hover:bg-orange-100">리뷰 쓰기</Link>
                          )}
                          <button className="text-[11px] px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">상세 보기</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <p className="font-bold text-[13px] text-gray-900 mb-0.5">💰 포인트 현황</p>
                <p className="text-[24px] font-extrabold text-[#F97316]">12,960P</p>
                <p className="text-[11px] text-gray-400 mt-0.5">예약 1,000원당 100포인트 적립</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <p className="font-bold text-[13px] text-gray-900 mb-0.5">📱 앱으로 더 편하게</p>
                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">앱에서 실시간 예약 알림을 받아보세요!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
