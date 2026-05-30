import UserSidebar from "../components/UserSidebar";
import Link from "next/link";

const TABS = ["전체", "예약확정", "이용완료", "취소됨", "노쇼"];

const DUMMY_BOOKINGS = [
  { id: 1, name: "멍냥 동물병원", category: "동물병원", date: "2024.12.18", time: "14:00 ~ 15:00", status: "예약확정", price: "30,000원", services: "기본 진료", emoji: "🏥" },
  { id: 2, name: "멍냥하우스 홈텔", category: "펫호텔", date: "2024.12.20", time: "15:00 ~ 익일 12:00", status: "예약확정", price: "30,000원", services: "1박 호텔링", emoji: "🏨" },
  { id: 3, name: "냥냥 미용실", category: "미용", date: "2024.12.10", time: "11:00 ~ 12:30", status: "이용완료", price: "45,000원", services: "전신 미용", emoji: "✂️" },
  { id: 4, name: "도그라이즈 카페", category: "펫카페", date: "2024.12.05", time: "13:00 ~ 14:00", status: "이용완료", price: "10,000원", services: "입장권 1매", emoji: "☕" },
];

const STATUS_STYLE: Record<string, string> = {
  "예약확정": "bg-green-100 text-green-600",
  "이용완료": "bg-gray-100 text-gray-500",
  "취소됨": "bg-red-100 text-red-500",
  "노쇼": "bg-yellow-100 text-yellow-600",
};

export default function BookingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-6">
        <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">나의 예약 내역</h1>
              <p className="text-sm text-gray-400 mt-0.5">총 {DUMMY_BOOKINGS.length}건의 예약 내역이 있어요</p>
            </div>
            <Link
              href="/booking"
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              + 새 예약
            </Link>
          </div>

          {/* 탭 필터 */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 w-fit">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  i === 0 ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 예약 목록 */}
          <div className="space-y-3">
            {DUMMY_BOOKINGS.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-all">
                <div className="flex items-start gap-4">
                  {/* 썸네일 */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl shrink-0">
                    {booking.emoji}
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span className="text-xs font-semibold text-orange-400 mr-2">{booking.category}</span>
                        <h3 className="font-bold text-gray-900 text-sm inline">{booking.name}</h3>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLE[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{booking.date} · {booking.time}</p>
                    <p className="text-xs text-gray-600 mb-2">서비스: {booking.services}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-orange-500">{booking.price}</span>
                      <div className="flex gap-2">
                        {booking.status === "예약확정" && (
                          <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                            예약 취소
                          </button>
                        )}
                        {booking.status === "이용완료" && (
                          <Link
                            href="/reviews"
                            className="text-xs px-3 py-1.5 bg-orange-50 text-orange-500 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                          >
                            리뷰 쓰기
                          </Link>
                        )}
                        <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                          상세 보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 도움말 영역 */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-2xl p-4">
              <h4 className="font-bold text-sm text-gray-900 mb-1">💰 포인트 현황</h4>
              <p className="text-2xl font-extrabold text-orange-500">12,960P</p>
              <p className="text-xs text-gray-400 mt-1">예약 1,000원당 100포인트 적립</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="font-bold text-sm text-gray-900 mb-1">📱 앱으로 더 편하게</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                앱에서 실시간 예약 알림을<br />받아보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
