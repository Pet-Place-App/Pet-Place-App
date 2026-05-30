export default function Loading() {
  return (
    <div className="fixed inset-0 bg-orange-50 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="text-8xl mb-4 animate-bounce">🐶</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1">멍냥멍냥</h2>
        <p className="text-sm text-gray-500 mb-6">반려생활의 모든 순간을 함께</p>

        {/* 로딩 바 */}
        <div className="w-48 h-2 bg-orange-100 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-orange-400 rounded-full animate-pulse" style={{ width: "70%" }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">로딩 중... 🐾</p>
      </div>
    </div>
  );
}
