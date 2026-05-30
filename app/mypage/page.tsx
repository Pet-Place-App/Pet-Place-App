import Image from "next/image";
import UserSidebar from "../components/UserSidebar";
import Link from "next/link";

const DUMMY_BOOKINGS = [
  { id: 1, name: "멍냥 동물병원", category: "동물병원", date: "2024.12.18", time: "14:00", status: "예약확정", price: "30,000원", emoji: "🏥" },
  { id: 2, name: "멍냥하우스 홈텔", category: "펫호텔", date: "2024.12.20", time: "15:00", status: "예약확정", price: "30,000원", emoji: "🏨" },
  { id: 3, name: "한강 반려견 공원", category: "산책로", date: "2024.12.15", time: "10:00", status: "이용완료", price: "무료", emoji: "🌳" },
  { id: 4, name: "도그라이즈 카페", category: "펫카페", date: "2024.12.10", time: "13:00", status: "이용완료", price: "10,000원", emoji: "☕" },
];

const DUMMY_RECOMMENDATIONS = [
  { name: "냥냥 미용실", category: "미용", address: "서울시 용산구", price: "35,000원~", rating: 4.5, emoji: "✂️" },
  { name: "럭키독 사진관", category: "사진관", address: "서울시 성동구", price: "50,000원~", rating: 4.8, emoji: "📷" },
  { name: "펫앤조이 훈련소", category: "훈련", address: "서울시 강북구", price: "80,000원~", rating: 4.6, emoji: "🎓" },
];

export default function MyPage() {
  return (
    <>
      <div className="w-full">
        <Image src="/img-mypage.png" alt="마이페이지 디자인" width={1440} height={700} className="w-full h-auto" priority />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-6">
        <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* 인사 배너 */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-6 text-white flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">안녕하세요 👋</p>
              <h2 className="text-xl font-bold">멍냥 회원님, 반가워요!</h2>
              <p className="text-orange-100 text-sm mt-1">총 예약 12,960포인트 적립</p>
            </div>
            <div className="text-6xl">🐾</div>
          </div>

          {/* 빠른 메뉴 */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: "📋", label: "예약 내역", href: "/bookings", count: "4건" },
              { icon: "❤️", label: "찜 목록", href: "/favorites", count: "8곳" },
              { icon: "⭐", label: "내 리뷰", href: "/reviews", count: "3개" },
              { icon: "🐾", label: "반려동물", href: "/mypage/pets", count: "2마리" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:shadow-md transition-all group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-bold text-orange-500">{item.count}</p>
              </Link>
            ))}
          </div>

          {/* 최근 예약 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">최근 예약 내역</h3>
              <Link href="/bookings" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                전체 보기 →
              </Link>
            </div>
            <div className="space-y-3">
              {DUMMY_BOOKINGS.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl shrink-0">
                    {booking.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{booking.name}</p>
                    <p className="text-xs text-gray-400">{booking.date} {booking.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      booking.status === "예약확정"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-xs text-orange-500 font-semibold mt-1">{booking.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 새로운 서비스 추천 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">새로운 서비스 추천</h3>
              <Link href="/search" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                더보기 →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {DUMMY_RECOMMENDATIONS.map((rec, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">{rec.emoji}</div>
                  <p className="font-semibold text-sm text-gray-900">{rec.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{rec.address}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-semibold text-orange-500">{rec.price}</span>
                    <span className="text-xs text-gray-400">★ {rec.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
