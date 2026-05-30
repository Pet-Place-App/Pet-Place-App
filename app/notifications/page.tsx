import UserSidebar from "../components/UserSidebar";

const TABS = ["전체", "예약", "리뷰", "커뮤니티", "시스템"];

const NOTIFICATIONS = [
  { id: 1, type: "예약", icon: "📋", title: "예약이 확정되었습니다", body: "멍냥 동물병원 예약이 확정되었습니다. (2024.12.18 14:00)", time: "방금 전", isNew: true },
  { id: 2, type: "예약", icon: "⏰", title: "예약 일정 알림", body: "내일 오후 2시 멍냥 동물병원 방문 예약이 있어요.", time: "1시간 전", isNew: true },
  { id: 3, type: "리뷰", icon: "⭐", title: "리뷰에 좋아요가 달렸습니다", body: "작성하신 '멍냥하우스 홈텔' 리뷰에 12개의 좋아요가 달렸어요!", time: "3시간 전", isNew: true },
  { id: 4, type: "커뮤니티", icon: "💬", title: "댓글 알림", body: "'마포구 동물병원 후기' 게시글에 새 댓글이 달렸어요.", time: "어제", isNew: false },
  { id: 5, type: "시스템", icon: "🎁", title: "포인트 적립 완료", body: "멍냥하우스 홈텔 이용 완료! 500포인트가 적립되었습니다.", time: "2일 전", isNew: false },
  { id: 6, type: "예약", icon: "✅", title: "이용 완료 확인", body: "도그라이즈 카페 이용이 완료되었습니다. 리뷰를 남겨주세요!", time: "3일 전", isNew: false },
  { id: 7, type: "커뮤니티", icon: "🔥", title: "내 게시글이 인기글 선정",  body: "작성하신 '한강 산책 코스 추천' 글이 오늘의 인기글에 선정되었어요!", time: "4일 전", isNew: false },
  { id: 8, type: "시스템", icon: "📢", title: "서비스 업데이트 안내", body: "멍냥냥 앱이 새로운 기능과 함께 업데이트 되었습니다. 확인해보세요!", time: "5일 전", isNew: false },
];

const TYPE_STYLE: Record<string, string> = {
  "예약": "bg-green-100 text-green-600",
  "리뷰": "bg-yellow-100 text-yellow-600",
  "커뮤니티": "bg-blue-100 text-blue-600",
  "시스템": "bg-gray-100 text-gray-600",
};

export default function NotificationsPage() {
  const newCount = NOTIFICATIONS.filter((n) => n.isNew).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-6">
        <UserSidebar user={{ name: "멍냥 회원님", email: "user@petplace.kr", petCount: 2 }} />

        <div className="flex-1 min-w-0">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                알림
                {newCount > 0 && (
                  <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                    {newCount}
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                읽지 않은 알림 <strong className="text-orange-500">{newCount}개</strong>
              </p>
            </div>
            <button className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
              모두 읽음 처리
            </button>
          </div>

          {/* 탭 */}
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

          {/* 알림 목록 */}
          <div className="space-y-2">
            {NOTIFICATIONS.map((noti) => (
              <div
                key={noti.id}
                className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                  noti.isNew
                    ? "bg-orange-50 border-orange-100 hover:bg-orange-100/70"
                    : "bg-white border-gray-100 hover:bg-gray-50"
                }`}
              >
                {/* 아이콘 */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                  noti.isNew ? "bg-orange-200" : "bg-gray-100"
                }`}>
                  {noti.icon}
                </div>

                {/* 내용 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_STYLE[noti.type] ?? "bg-gray-100 text-gray-500"}`}>
                        {noti.type}
                      </span>
                      <h3 className="font-semibold text-sm text-gray-900">{noti.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {noti.isNew && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      )}
                      <span className="text-xs text-gray-400">{noti.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{noti.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
