"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* 좌측 히어로 이미지 */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/img-login.png"
          alt="로그인 화면 디자인"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* 우측 로그인 폼 */}
      <div className="flex flex-col justify-center w-full lg:w-[480px] shrink-0 px-8 lg:px-14 py-12">
        <div className="max-w-sm mx-auto w-full">
          {/* 모바일 로고 */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <Image src="/pet-logo.png" alt="멍냥멍냥" width={36} height={36} className="rounded-xl" />
            <span className="font-extrabold text-orange-500 text-lg">멍냥멍냥</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">로그인</h2>
          <p className="text-sm text-gray-400 mb-7">멍냥냥에 오신 걸 환영합니다 🐾</p>

          {/* 이메일/비밀번호 폼 */}
          <form className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-xs text-gray-400 hover:text-orange-500 transition-colors">
                  비밀번호 찾기
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              로그인
            </button>
          </form>

          {/* 소셜 로그인 구분선 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 shrink-0">소셜 로그인</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* 소셜 버튼 */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-[#FEE500] hover:bg-[#F0D900] rounded-xl text-[#1A1A1A] font-semibold text-sm transition-colors">
              <span className="text-lg">💬</span>
              카카오로 로그인
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-[#03C75A] hover:bg-[#02B350] rounded-xl text-white font-semibold text-sm transition-colors">
              <span className="text-lg">N</span>
              네이버로 로그인
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold text-sm transition-colors shadow-sm">
              <span className="text-lg">G</span>
              구글로 로그인
            </button>
          </div>

          {/* 회원가입 링크 */}
          <p className="text-center text-sm text-gray-400 mt-7">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
