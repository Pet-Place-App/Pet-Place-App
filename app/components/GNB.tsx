"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/search", label: "서비스 메뉴" },
  { href: "/search?tab=find", label: "펫 찾기" },
  { href: "/encyclopedia", label: "멍냥냥 백과" },
  { href: "/community", label: "커뮤니티" },
];

export default function GNB() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-5 h-[60px] flex items-center gap-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <Image src="/pet-logo.png" alt="멍냥멍냥" width={32} height={32} className="rounded-lg" />
          <span className="font-extrabold text-[#F97316] text-[17px] tracking-tight">멍냥멍냥</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#F97316] bg-orange-50 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 */}
        <div className="flex items-center gap-1 shrink-0">
          {/* 알림 벨 */}
          <Link href="/notifications" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#F97316] rounded-full border border-white" />
          </Link>

          {/* 로그인 */}
          <Link href="/login" className="px-3.5 py-1.5 text-[13px] font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
            로그인
          </Link>

          {/* 가입하기 */}
          <Link href="/signup" className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#F97316] hover:bg-[#EA6C0A] rounded-lg transition-colors">
            가입하기
          </Link>
        </div>
      </div>
    </header>
  );
}
