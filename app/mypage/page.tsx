import UserSidebar from "../components/UserSidebar";
import Link from "next/link";

const DUMMY_BOOKINGS = [
  { id: 1, name: "멍냥 동물병원", category: "동물병원", date: "2024.12.18", time: "14:00", status: "예약확정", price: "30,000원", emoji: "🏥" },
  { id: 2, name: "멍냥하우스 홈텔", category: "펫호텔", date: "2024.12.20", time: "15:00", status: "예약확정", price: "30,000원", emoji: "🏨" },
  { id: 3, name: "한강 반려견 공원", category: "공원", date: "2024.12.15", time: "10:00", status: "이용완료", price: "무료", emoji: "🌳" },
];

const QUICK_MENU = [
  { icon: "📋", label: "예약 내역", href: "/bookings", count: "4건" },
  { icon: "❤️", label: "찜 목록",  href: "/favorites", count: "8곳" },
  { icon: "⭐", label: "내 리뷰",  href: "/reviews",   count: "3개" },
  { icon: "🐾", label: "반려동물", href: "/mypage/pets", count: "2마리" },
];

const RECOMMEND = [
  { name: "냥냥 미용실",     category: "미용",   addr: "서울시 용산구", price: "35,000원~", rating: 4.5, emoji: "✂️" },
  { name: "럭키독 사진관",   category: "촬영",   addr: "서울시 성동구", price: "50,000원~", rating: 4.8, emoji: "📷" },
  { name: "펫앤조이 훈련소", category: "훈련",   addr: "서울시 강북구", price: "80,000원~", rating: 4.6, emoji: "🎓" },
  { name: "냥이 카페",       category: "펫카페", addr: "서울시 마포구", price: "10,000원~", rating: 4.7, emoji: "☕" },
];

const STATUS_STYLE: Record<string, string> = {
  "예약확정": "bg-green-100 text-green-600",
  "이용완료": "bg-gray-100 text-gray-500",
};

export default function MyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-7">
        <div className="flex gap-5">
          <UserSidebar user={{ name: "멍냥냥님, 반가워요! 🐾", email: "user@petplace.kr", petCount: 2 }} />

          <div className="flex-1 min-w-0 space-y-5">
            {/* 인사 배너 */}
            <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-2xl p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-[13px] mb-1">안녕하세요 👋</p>
                <h2 className="text-[20px] font-extrabold mb-1">멍냥냥님, 반가워요!</h2>
                <div className="flex items-center gap-4 text-[12px] text-orange-100">
                  <span>🏆 총 예약 <strong className="text-white">12,960P</strong></span>
                  <span>❤️ 찜 <strong className="text-white">8곳</strong></span>
                </div>
              </div>
              <div className="text-[60px] select-none opacity-80">🐾</div>
            </div>

            {/* 빠른 메뉴 */}
            <div className="grid grid-cols-4 gap-3">
              {QUICK_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:shadow-md hover:border-orange-200 transition-all group"
                >
                  <div className="text-[26px] mb-1.5 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <p className="text-[11px] text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-[14px] font-extrabold text-[#F97316]">{item.count}</p>
                </Link>
              ))}
            </div>

            {/* 최근 예약 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[15px] text-gray-900">최근 예약 내역</h3>
                <Link href="/bookings" className="text-[12px] text-[#F97316] hover:text-[#EA6C0A] font-medium">전체 보기 →</Link>
              </div>
              <div className="space-y-2.5">
                {DUMMY_BOOKINGS.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[18px] shrink-0">{b.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13px] text-gray-900">{b.name}</p>
                      <p className="text-[11px] text-gray-400">{b.date} {b.time}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[b.status] ?? "bg-gray-100 text-gray-500"}`}>{b.status}</span>
                      <p className="text-[12px] text-[#F97316] font-bold mt-0.5">{b.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 새로운 서비스 추천 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[15px] text-gray-900">새로운 서비스 추천</h3>
                <Link href="/search" className="text-[12px] text-[#F97316] hover:text-[#EA6C0A] font-medium">더보기 →</Link>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {RECOMMEND.map((r) => (
                  <div key={r.name} className="bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors cursor-pointer">
                    <div className="text-[24px] mb-1.5">{r.emoji}</div>
                    <p className="font-bold text-[12px] text-gray-900">{r.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">{r.addr}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] font-bold text-[#F97316]">{r.price}</span>
                      <span className="text-[11px] text-gray-400">★ {r.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
