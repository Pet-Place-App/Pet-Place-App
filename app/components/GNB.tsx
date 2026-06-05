"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/booking", label: "서비스 예약" },
  { href: "/search", label: "펫 업체 찾기" },
  { href: "/encyclopedia", label: "명냥명냥 혜택" },
  { href: "/community", label: "커뮤니티" },
];

export default function GNB() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center gap-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0" onClick={() => setMenuOpen(false)}>
          <Image src="/pet-logo.png" alt="멍냥멍냥" width={32} height={32} className="rounded-lg" />
          <span className="font-extrabold text-[#F97316] text-[17px] tracking-tight">멍냥멍냥</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-[#F97316] bg-orange-50 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 데스크탑 우측 버튼 */}
        <div className="hidden md:flex items-center gap-1 ml-auto shrink-0">
          <Link href="/notifications" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#F97316] rounded-full border border-white" />
          </Link>
          <Link href="/login" className="px-3.5 py-1.5 text-[13px] font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
            로그인
          </Link>
          <Link href="/signup" className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#F97316] hover:bg-[#EA6C0A] rounded-lg transition-colors">
            가입하기
          </Link>
        </div>

        {/* 모바일 우측 */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <Link href="/search" className="w-9 h-9 flex items-center justify-center text-gray-500">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center text-gray-600"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                  isActive ? "text-[#F97316] bg-orange-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 py-2.5 text-center text-[13px] font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
              로그인
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1 py-2.5 text-center text-[13px] font-bold text-white bg-[#F97316] rounded-xl hover:bg-[#EA6C0A]">
              가입하기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
