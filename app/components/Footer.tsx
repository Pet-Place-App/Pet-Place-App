import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* 로고 & 소개 */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/pet-logo.png" alt="멍냥멍냥" width={32} height={32} className="rounded-xl opacity-90" />
              <span className="font-bold text-white text-base">멍냥멍냥</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              반려생활의 모든 순간을 함께<br />
              카페, 녹소, 산책로까지<br />
              한 번에 만나보고 예약하세요.
            </p>
          </div>

          {/* 서비스 안내 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">서비스 안내</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/search" className="hover:text-white transition-colors">서비스 메뉴</Link></li>
              <li><Link href="/search?tab=find" className="hover:text-white transition-colors">펫 찾기</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">커뮤니티</Link></li>
              <li><Link href="/encyclopedia" className="hover:text-white transition-colors">멍냥냥 백과</Link></li>
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">고객센터</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              고객센터: 02-123-4567<br />
              운영시간: 09:00 ~ 18:00<br />
              (주말 및 공휴일 제외)
            </p>
            <div className="flex gap-3 mt-3">
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">이용약관</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>

          {/* QR / 앱 다운로드 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">앱 다운로드</h4>
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2">
              <span className="text-xs text-gray-400">QR</span>
            </div>
            <p className="text-xs text-gray-400">
              멍냥냥 앱을<br />스마트폰에서 만나보세요
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-xs text-gray-500">
          © 2024 멍냥냥. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
