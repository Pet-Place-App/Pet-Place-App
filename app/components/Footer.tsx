import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#3a3a3a] text-gray-300 mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* 로고 & 슬로건 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/pet-logo.png" alt="멍냥멍냥" width={28} height={28} className="rounded-lg opacity-90" />
              <span className="font-bold text-white text-[15px]">멍냥멍냥</span>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              반려생활의 모든 순간을 함께<br />
              카페, 녹소, 산책로까지<br />
              한 번에 만나보고 예약하세요.
            </p>
            <div className="flex gap-2 mt-3">
              <a href="#" className="text-[11px] text-gray-500 hover:text-white transition-colors">이용약관</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-[11px] text-gray-500 hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>

          {/* 서비스 안내 */}
          <div>
            <h4 className="text-white font-semibold text-[13px] mb-3">서비스 안내</h4>
            <ul className="space-y-2">
              {[
                { label: "서비스 메뉴", href: "/search" },
                { label: "펫 찾기", href: "/search?tab=find" },
                { label: "멍냥냥 백과", href: "/encyclopedia" },
                { label: "커뮤니티", href: "/community" },
                { label: "예약 서비스", href: "/booking" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[12px] text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="text-white font-semibold text-[13px] mb-3">고객센터</h4>
            <p className="text-[13px] font-bold text-white mb-1">02-123-4567</p>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              운영시간: 09:00 ~ 18:00<br />
              (주말 및 공휴일 제외)
            </p>
            <div className="mt-3 flex gap-2">
              <a href="#" className="text-[11px] px-2.5 py-1 border border-gray-600 text-gray-400 rounded hover:border-gray-400 hover:text-white transition-colors">
                1:1 문의
              </a>
              <a href="#" className="text-[11px] px-2.5 py-1 border border-gray-600 text-gray-400 rounded hover:border-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* 앱 다운로드 */}
          <div>
            <h4 className="text-white font-semibold text-[13px] mb-3">앱 다운로드</h4>
            <div className="w-[72px] h-[72px] bg-white rounded-lg flex items-center justify-center mb-2">
              {/* QR 코드 자리 */}
              <div className="w-14 h-14 grid grid-cols-7 gap-0.5">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`rounded-[1px] ${Math.random() > 0.5 ? "bg-gray-800" : "bg-white"}`} />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              멍냥냥 앱을<br />스마트폰에서 만나보세요
            </p>
            <div className="flex gap-1 mt-2">
              <button className="text-[10px] px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                App Store
              </button>
              <button className="text-[10px] px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center">
          <p className="text-[11px] text-gray-500">© 2024 멍냥냥. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
