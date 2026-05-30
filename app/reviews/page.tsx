import Image from "next/image";
import UserSidebar from "../components/UserSidebar";
import Link from "next/link";

const FILTER_TABS = ["전체", "동물병원", "펫호텔", "펫카페", "산책로", "미용", "사진촬영"];

const DUMMY_REVIEWS = [
  { id: 1, placeName: "멍냥 동물병원", category: "동물병원", date: "2024.12.10", rating: 5, content: "원장님이 친절하게 설명해주시고 반려동물을 정말 아껴주세요. 다음에도 꼭 방문할게요!", emoji: "🏥", likes: 12, replies: 3 },
  { id: 2, placeName: "멍냥하우스 홈텔", category: "펫호텔", date: "2024.11.28", rating: 4, content: "시설이 깨끗하고 CCTV로 언제든지 확인 가능해서 안심이 됐어요. 음식도 잘 챙겨주셨습니다.", emoji: "🏨", likes: 8, replies: 1 },
  { id: 3, placeName: "도그라이즈 카페", category: "펫카페", date: "2024.11.15", rating: 5, content: "강아지들끼리 신나게 뛰어놀고 저도 커피 마시면서 힐링했어요. 정기적으로 올 것 같아요!", emoji: "☕", likes: 24, replies: 7 },
];

const STAT_BARS = [
  { star: 5, count: 8, total: 13 },
  { star: 4, count: 3, total: 13 },
  { star: 3, count: 1, total: 13 },
  { star: 2, count: 1, total: 13 },
  { star: 1, count: 0, total: 13 },
];

export default function ReviewsPage() {
  return (
    <>
      <div className="w-full">
        <Image src="/img-reviews.png" alt="리뷰 화면 디자인" width={1440} height={700} className="w-full h-auto" priority />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-6">
        <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

        <div className="flex-1 min-w-0 flex gap-5">
          {/* 메인 리뷰 목록 */}
          <div className="flex-1 min-w-0">
            <div className="mb-5">
              <h1 className="text-xl font-bold text-gray-900">멍냥냥 리뷰</h1>
              <p className="text-sm text-gray-400 mt-0.5">이용한 서비스에 대한 솔직한 후기를 남겨보세요</p>
            </div>

            {/* 필터 탭 */}
            <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
              {FILTER_TABS.map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    i === 0
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 검색 + 정렬 */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1">
                <svg className="text-gray-400 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input placeholder="리뷰 검색..." className="flex-1 text-sm outline-none placeholder:text-gray-400" />
              </div>
              <select className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
                <option>최신순</option>
                <option>평점 높은순</option>
                <option>좋아요순</option>
              </select>
            </div>

            {/* 리뷰 카드 */}
            <div className="space-y-4">
              {DUMMY_REVIEWS.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0">
                      {review.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-orange-400">{review.category}</span>
                        <h3 className="font-bold text-sm text-gray-900">{review.placeName}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xs">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                        <span>♡</span> {review.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition-colors">
                        <span>💬</span> {review.replies}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">수정</button>
                      <button className="text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-400 hover:bg-red-50">삭제</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 통계 패널 */}
          <aside className="w-52 shrink-0 space-y-4">
            {/* 평점 요약 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-500 mb-3">나의 평점 현황</h3>
              <div className="text-center mb-3">
                <p className="text-4xl font-extrabold text-orange-500">4.8</p>
                <p className="text-yellow-400 text-lg mt-0.5">★★★★★</p>
                <p className="text-xs text-gray-400">총 {DUMMY_REVIEWS.length}개 리뷰</p>
              </div>
              <div className="space-y-1.5">
                {STAT_BARS.map((bar) => (
                  <div key={bar.star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-4 text-right">{bar.star}</span>
                    <span className="text-yellow-400 text-xs">★</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full"
                        style={{ width: `${(bar.count / bar.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-3">{bar.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 리뷰 작성 유도 */}
            <div className="bg-orange-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-900 mb-1">✍️ 아직 리뷰 안 쓴 곳</p>
              <p className="text-xs text-gray-500 mb-3">이용한 장소에 리뷰를 남기면 포인트를 드려요!</p>
              <Link href="/bookings" className="block w-full text-center py-2 bg-orange-500 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors">
                리뷰 쓰기
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
