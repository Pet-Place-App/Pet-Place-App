import Image from "next/image";
import Link from "next/link";

const CATEGORY_TABS = ["전체", "자유게시판", "정보공유", "질문답변", "사진자랑", "분실/실종", "입양/분양"];

const POSTS = [
  { id: 1, category: "자유게시판", title: "강아지랑 한강 산책하기 좋은 코스 추천해요 🐕", author: "멍냥맘", date: "2024.12.18", views: 234, likes: 45, replies: 12, isHot: true },
  { id: 2, category: "정보공유", title: "마포구 동물병원 후기 모음 (병원별 비교)", author: "댕댕이집사", date: "2024.12.17", views: 891, likes: 127, replies: 43, isHot: true },
  { id: 3, category: "질문답변", title: "고양이 중성화 수술 후 케어 어떻게 하셨나요?", author: "냥이엄마", date: "2024.12.17", views: 156, likes: 23, replies: 28 },
  { id: 4, category: "사진자랑", title: "오늘 미용 후 너무 귀여운 우리 강아지 🥰", author: "뭉치아빠", date: "2024.12.16", views: 445, likes: 89, replies: 16 },
  { id: 5, category: "분실/실종", title: "[긴급] 마포구 합정동 근처에서 믹스견 발견했어요", author: "착한이웃", date: "2024.12.16", views: 1203, likes: 15, replies: 67, isUrgent: true },
  { id: 6, category: "입양/분양", title: "구조한 길고양이 새로운 가족을 찾아요 🐱", author: "캣맘봉사자", date: "2024.12.15", views: 678, likes: 92, replies: 31 },
  { id: 7, category: "자유게시판", title: "펫보험 가입했는데 실비 청구 경험 있으신 분?", author: "보험왕", date: "2024.12.15", views: 312, likes: 34, replies: 19 },
  { id: 8, category: "정보공유", title: "2024년 동물병원 진료비 인상 정리 (전국 비교)", author: "정보왕", date: "2024.12.14", views: 2341, likes: 203, replies: 87, isHot: true },
];

const POPULAR_POSTS = POSTS.filter((p) => p.isHot).slice(0, 3);

const CATEGORY_STYLE: Record<string, string> = {
  "자유게시판": "bg-blue-50 text-blue-600",
  "정보공유": "bg-green-50 text-green-600",
  "질문답변": "bg-purple-50 text-purple-600",
  "사진자랑": "bg-pink-50 text-pink-600",
  "분실/실종": "bg-red-50 text-red-600",
  "입양/분양": "bg-yellow-50 text-yellow-700",
};

export default function CommunityPage() {
  return (
    <>
      <div className="w-full">
        <Image src="/img-community.png" alt="커뮤니티 화면 디자인" width={1440} height={700} className="w-full h-auto" priority />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">멍냥냥 커뮤니티 🐾</h1>
          <p className="text-sm text-gray-400 mt-0.5">반려동물 친구들과 이야기 나눠요</p>
        </div>
        <button className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors">
          + 글쓰기
        </button>
      </div>

      <div className="flex gap-6">
        {/* 메인 게시판 */}
        <div className="flex-1 min-w-0">
          {/* 카테고리 탭 */}
          <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORY_TABS.map((tab, i) => (
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
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1">
              <svg className="text-gray-400 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input placeholder="게시글 검색..." className="flex-1 text-sm outline-none placeholder:text-gray-400" />
            </div>
            <select className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
              <option>최신순</option>
              <option>인기순</option>
              <option>댓글순</option>
            </select>
          </div>

          {/* 게시글 목록 */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-[1fr_80px_80px_60px_60px] gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500">
              <span>제목</span>
              <span className="text-center">작성자</span>
              <span className="text-center">작성일</span>
              <span className="text-center">조회</span>
              <span className="text-center">좋아요</span>
            </div>

            {POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="grid grid-cols-[1fr_80px_80px_60px_60px] gap-3 px-5 py-3.5 border-b border-gray-50 hover:bg-orange-50/50 transition-colors items-center group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${CATEGORY_STYLE[post.category] ?? "bg-gray-100 text-gray-500"}`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-800 truncate group-hover:text-orange-600 font-medium">
                    {post.isHot && <span className="text-orange-500 mr-1">🔥</span>}
                    {post.isUrgent && <span className="text-red-500 mr-1">[긴급]</span>}
                    {post.title}
                  </span>
                  {post.replies > 0 && (
                    <span className="text-xs text-orange-400 shrink-0 font-semibold">[{post.replies}]</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 text-center truncate">{post.author}</span>
                <span className="text-xs text-gray-400 text-center">{post.date.slice(5)}</span>
                <span className="text-xs text-gray-400 text-center">{post.views.toLocaleString()}</span>
                <span className="text-xs text-gray-400 text-center">{post.likes}</span>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-5">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  p === 1 ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* 우측 사이드바 */}
        <aside className="w-56 shrink-0 space-y-4">
          {/* 인기 게시글 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="text-xs font-bold text-gray-500 mb-3">🔥 인기 게시글</h3>
            <div className="space-y-3">
              {POPULAR_POSTS.map((post, i) => (
                <Link key={post.id} href={`/community/${post.id}`} className="flex items-start gap-2 group">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-700 group-hover:text-orange-500 leading-relaxed line-clamp-2 transition-colors">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* 분실/실종 빠른 접근 */}
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
            <h3 className="text-xs font-bold text-red-600 mb-2">🚨 분실/실종 신고</h3>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              반려동물을 잃어버리셨나요?<br />
              빠르게 신고하세요.
            </p>
            <button className="w-full py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-colors">
              분실 신고하기
            </button>
          </div>

          {/* 커뮤니티 통계 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="text-xs font-bold text-gray-500 mb-3">커뮤니티 현황</h3>
            <div className="space-y-2">
              {[
                { label: "오늘 게시글", value: "34" },
                { label: "총 회원수", value: "12,847" },
                { label: "현재 접속자", value: "203" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className="text-xs font-bold text-orange-500">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
