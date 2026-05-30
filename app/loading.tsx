export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FFF3E8] flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-end justify-center gap-1 mb-5">
          <span className="text-[80px] leading-none select-none">🐶</span>
          <span className="text-[60px] leading-none mb-2 select-none">🐱</span>
        </div>
        <h2 className="text-[26px] font-extrabold text-gray-800 mb-1">멍냥멍냥 🐾</h2>
        <p className="text-[13px] text-gray-500 mb-6">반려생활의 모든 순간을 함께</p>

        {/* 로딩 바 */}
        <div className="w-52 h-2.5 bg-orange-100 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-[#F97316] rounded-full"
            style={{
              width: "70%",
              animation: "loading-bar 1.5s ease-in-out infinite alternate",
            }}
          />
        </div>
        <p className="text-[12px] text-gray-400 mt-2">로딩 중...</p>
      </div>

      <style>{`
        @keyframes loading-bar {
          from { width: 30%; }
          to { width: 90%; }
        }
      `}</style>
    </div>
  );
}
