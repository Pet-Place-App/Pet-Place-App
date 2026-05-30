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
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[20px] font-extrabold text-gray-900">멍냥냥 커뮤니티 🐾</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">반려동물 친구들과 이야기 나눠요</p>
          </div>
          <button className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold rounded-xl text-[13px] transition-colors">+ 글쓰기</button>
        </div>

        <div className="flex gap-5">
          <div className="flex-1 min-w-0">
            {/* 카테고리 탭 */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
              {CATEGORY_TABS.map((tab, i) => (
                <button key={tab} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap shrink-0 transition-colors ${i === 0 ? "bg-[#F97316] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* 검색 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1">
                <svg className="text-gray-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input placeholder="게시글 검색..." className="flex-1 text-[13px] outline-none placeholder:text-gray-300" />
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-[12px] text-gray-600">
                <option>최신순</option><option>인기순</option><option>댓글순</option>
              </select>
            </div>

            {/* 게시글 테이블 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-[1fr_72px_72px_52px_52px] gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500">
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
                  className="grid grid-cols-[1fr_72px_72px_52px_52px] gap-2 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-orange-50/40 transition-colors items-center group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${CATEGORY_STYLE[post.category] ?? "bg-gray-100 text-gray-500"}`}>{post.category}</span>
                    <span className="text-[13px] text-gray-800 truncate group-hover:text-[#F97316] font-medium">
                      {post.isHot && "🔥 "}{post.isUrgent && <span className="text-red-500">[긴급] </span>}{post.title}
                    </span>
                    {post.replies > 0 && <span className="text-[11px] text-[#F97316] shrink-0 font-bold">[{post.replies}]</span>}
                  </div>
                  <span className="text-[11px] text-gray-400 text-center truncate">{post.author}</span>
                  <span className="text-[11px] text-gray-400 text-center">{post.date.slice(5)}</span>
                  <span className="text-[11px] text-gray-400 text-center">{post.views.toLocaleString()}</span>
                  <span className="text-[11px] text-gray-400 text-center">{post.likes}</span>
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-1 mt-5">
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p} className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-colors ${p === 1 ? "bg-[#F97316] text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{p}</button>
              ))}
            </div>
          </div>

          {/* 우측 사이드바 */}
          <aside className="w-[190px] shrink-0 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-[11px] font-bold text-gray-500 mb-3">🔥 인기 게시글</h3>
              <div className="space-y-3">
                {POSTS.filter(p => p.isHot).slice(0, 3).map((post, i) => (
                  <Link key={post.id} href={`/community/${post.id}`} className="flex items-start gap-2 group">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] text-[11px] flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                    <p className="text-[11px] text-gray-700 group-hover:text-[#F97316] leading-relaxed line-clamp-2">{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
              <h3 className="text-[12px] font-bold text-red-500 mb-1.5">🚨 분실/실종 신고</h3>
              <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">반려동물을 잃어버리셨나요?</p>
              <button className="w-full py-1.5 bg-red-500 text-white text-[11px] font-bold rounded-xl hover:bg-red-600">신고하기</button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-[11px] font-bold text-gray-500 mb-3">커뮤니티 현황</h3>
              {[{ label: "오늘 게시글", value: "34" }, { label: "총 회원수", value: "12,847" }, { label: "현재 접속자", value: "203" }].map((s) => (
                <div key={s.label} className="flex justify-between items-center mb-2 last:mb-0">
                  <span className="text-[11px] text-gray-500">{s.label}</span>
                  <span className="text-[11px] font-bold text-[#F97316]">{s.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
