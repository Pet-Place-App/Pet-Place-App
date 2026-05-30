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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/pet-logo.png" alt="멍냥멍냥" width={36} height={36} className="rounded-xl" />
          <span className="font-extrabold text-orange-500 text-lg tracking-tight">멍냥멍냥</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/notifications"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 relative"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
          >
            가입하기
          </Link>
        </div>
      </div>
    </header>
  );
}
