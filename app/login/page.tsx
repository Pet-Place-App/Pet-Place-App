"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#FFF3E8] flex">
      {/* 좌측 히어로 */}
      <div className="hidden lg:flex flex-col justify-between flex-1 bg-gradient-to-br from-[#FFF3E8] to-[#FFE0C0] px-14 py-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pet-logo.png" alt="멍냥멍냥" width={36} height={36} className="rounded-xl" />
          <span className="font-extrabold text-[#F97316] text-[18px]">멍냥멍냥</span>
        </Link>

        <div>
          <Image
            src="/login-hero.png"
            alt="반려생활의 모든 순간을 함께"
            width={560}
            height={440}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <p className="text-[11px] text-gray-400">© 2024 멍냥냥. All rights reserved.</p>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="flex flex-col justify-center w-full lg:w-[460px] shrink-0 bg-white px-10 py-12 shadow-xl">
        <div className="max-w-[340px] mx-auto w-full">
          {/* 모바일 로고 */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <Image src="/pet-logo.png" alt="멍냥멍냥" width={32} height={32} className="rounded-xl" />
            <span className="font-extrabold text-[#F97316] text-[17px]">멍냥멍냥</span>
          </div>

          <h2 className="text-[24px] font-bold text-gray-900 mb-1">로그인</h2>
          <p className="text-[13px] text-gray-400 mb-7">멍냥냥에 오신 걸 환영합니다 🐾</p>

          {/* 이메일/비밀번호 폼 */}
          <form className="space-y-4 mb-5">
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-gray-600">비밀번호</label>
                <a href="#" className="text-[11px] text-gray-400 hover:text-[#F97316] transition-colors">비밀번호 찾기</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold rounded-xl text-[14px] transition-colors shadow-sm"
            >
              로그인
            </button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-400 shrink-0">소셜 로그인</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-2.5">
            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-[#FEE500] hover:bg-[#F0D900] rounded-xl text-[13px] font-bold text-[#191919] transition-colors">
              <span className="text-[16px]">💬</span> 카카오로 로그인
            </button>
            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-[#03C75A] hover:bg-[#02B350] rounded-xl text-[13px] font-bold text-white transition-colors">
              <span className="text-[16px] font-extrabold">N</span> 네이버로 로그인
            </button>
            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <span className="text-[16px]">G</span> 구글로 로그인
            </button>
          </div>

          <p className="text-center text-[13px] text-gray-400 mt-6">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="text-[#F97316] font-bold hover:text-[#EA6C0A]">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
