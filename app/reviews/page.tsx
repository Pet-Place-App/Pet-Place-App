import UserSidebar from "../components/UserSidebar";
import Link from "next/link";

const FILTER_TABS = ["전체", "동물병원", "펫호텔", "펫카페", "공원", "미용", "촬영"];

const DUMMY_REVIEWS = [
  { id: 1, placeName: "멍냥 동물병원", category: "동물병원", date: "2024.12.10", rating: 5, content: "원장님이 친절하게 설명해주시고 반려동물을 정말 아껴주세요. 다음에도 꼭 방문할게요!", emoji: "🏥", likes: 12, replies: 3 },
  { id: 2, placeName: "멍냥하우스 홈텔", category: "펫호텔", date: "2024.11.28", rating: 4, content: "시설이 깨끗하고 CCTV로 언제든지 확인 가능해서 안심이 됐어요. 음식도 잘 챙겨주셨습니다.", emoji: "🏨", likes: 8, replies: 1 },
  { id: 3, placeName: "도그라이즈 카페", category: "펫카페", date: "2024.11.15", rating: 5, content: "강아지들끼리 신나게 뛰어놀고 저도 커피 마시면서 힐링했어요. 정기적으로 올 것 같아요!", emoji: "☕", likes: 24, replies: 7 },
];

const STAT_BARS = [5, 4, 3, 2, 1].map((star, i) => ({ star, count: [8, 3, 1, 1, 0][i], total: 13 }));

export default function ReviewsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-7">
        <div className="flex gap-5">
          <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

          <div className="flex-1 min-w-0 flex gap-5">
            <div className="flex-1 min-w-0">
              <div className="mb-5">
                <h1 className="text-[20px] font-extrabold text-gray-900">멍냥냥 리뷰</h1>
                <p className="text-[13px] text-gray-400 mt-0.5">이용한 서비스에 솔직한 후기를 남겨보세요</p>
              </div>

              <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
                {FILTER_TABS.map((tab, i) => (
                  <button key={tab} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap shrink-0 transition-colors ${i === 0 ? "bg-[#F97316] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1">
                  <svg className="text-gray-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input placeholder="리뷰 검색..." className="flex-1 text-[13px] outline-none placeholder:text-gray-300" />
                </div>
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-[12px] text-gray-600">
                  <option>최신순</option><option>평점 높은순</option><option>좋아요순</option>
                </select>
              </div>

              <div className="space-y-4">
                {DUMMY_REVIEWS.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[18px] shrink-0">{r.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-bold text-[#F97316]">{r.category}</span>
                          <span className="font-bold text-[13px] text-gray-900">{r.placeName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-[12px]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                          <span className="text-[11px] text-gray-400">{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-700 leading-relaxed mb-3">{r.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-red-400">♡ {r.likes}</button>
                        <button className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-orange-400">💬 {r.replies}</button>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[11px] px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">수정</button>
                        <button className="text-[11px] px-3 py-1.5 border border-red-100 rounded-lg text-red-400 hover:bg-red-50">삭제</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 통계 */}
            <aside className="w-[190px] shrink-0 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h3 className="text-[11px] font-bold text-gray-500 mb-3">나의 평점 현황</h3>
                <div className="text-center mb-3">
                  <p className="text-[36px] font-extrabold text-[#F97316]">4.8</p>
                  <p className="text-yellow-400 text-[16px] mt-0.5">★★★★★</p>
                  <p className="text-[11px] text-gray-400">총 {DUMMY_REVIEWS.length}개 리뷰</p>
                </div>
                <div className="space-y-1.5">
                  {STAT_BARS.map((bar) => (
                    <div key={bar.star} className="flex items-center gap-1.5">
                      <span className="text-[11px] text-gray-500 w-3 text-right">{bar.star}</span>
                      <span className="text-yellow-400 text-[11px]">★</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F97316] rounded-full" style={{ width: `${(bar.count / bar.total) * 100}%` }} />
                      </div>
                      <span className="text-[11px] text-gray-400 w-3">{bar.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <p className="text-[12px] font-bold text-gray-900 mb-1">✍️ 리뷰 미작성</p>
                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">리뷰를 남기면 포인트를 드려요!</p>
                <Link href="/bookings" className="block w-full text-center py-2 bg-[#F97316] text-white text-[12px] font-bold rounded-xl hover:bg-[#EA6C0A]">리뷰 쓰기</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
