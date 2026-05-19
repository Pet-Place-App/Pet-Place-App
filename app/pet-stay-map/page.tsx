import { Metadata } from "next";
import Image from "next/image";
import HotelFinder from "./components/HotelFinder";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "펫스테이맵 | 전국 동물 호텔 가격 비교",
  description: "전국 동물 호텔의 1박 가격, 지역, 객실 타입, 돌봄 옵션, 예약 가능 여부를 비교하는 사이트입니다.",
};

export default function PetStayMapPage() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-amber-100 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/pet-logo.png" alt="펫스테이맵 로고" width={40} height={40} className="rounded-xl" />
            <span className="font-bold text-xl text-amber-600">펫스테이맵</span>
          </div>
          <ul className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
            <li><a href="#finder" className="hover:text-amber-500 transition-colors">가격 비교</a></li>
            <li><a href="#compare" className="hover:text-amber-500 transition-colors">비교 포인트</a></li>
            <li><a href="#contact" className="hover:text-amber-500 transition-colors">제휴 문의</a></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">

        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              🐾 Nationwide Pet Hotel Compare
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
              전국 동물 호텔<br />
              <span className="text-amber-500">가격을 한눈에</span><br />
              비교하세요
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              서울부터 제주까지 지역별 펫호텔의 1박 가격,
              객실 타입, 산책·CCTV 옵션과 예약 가능 여부를 함께 비교합니다.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#finder"
                className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-colors"
              >
                🐶 호텔 가격 비교하기
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-200 rounded-[40px] blur-3xl opacity-60 scale-90" />
              <Image
                src="/pet-logo.png"
                alt="펫스테이맵"
                width={280}
                height={280}
                className="relative drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🏨", value: "7+", label: "등록 호텔" },
            { emoji: "📍", value: "6개", label: "전국 지역" },
            { emoji: "🐕", value: "4종", label: "반려동물 유형" },
            { emoji: "💰", value: "최저", label: "가격 순 정렬" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-amber-100">
              <div className="text-3xl mb-1">{s.emoji}</div>
              <div className="text-2xl font-extrabold text-amber-500">{s.value}</div>
              <div className="text-sm text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Hotel Finder */}
        <section id="finder">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">🔍 Hotel Finder</span>
            <h2 className="text-3xl font-extrabold text-gray-800">전국 동물 호텔 가격 비교</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              지역과 반려동물 크기, 객실 옵션을 고르면 호텔별 1박 예상 가격과 예약 방식을 비교할 수 있습니다.
            </p>
          </div>
          <HotelFinder />
        </section>

        {/* Price Compare */}
        <section id="compare">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">💡 Price Snapshot</span>
            <h2 className="text-3xl font-extrabold text-gray-800">숙박 가격 비교 포인트</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: "⚖️", tag: "크기", title: "소형견·중형견·대형견", desc: "몸무게 기준으로 가격이 달라지는 곳이 많아 반려동물 체중을 먼저 확인하세요." },
              { emoji: "🛏️", tag: "객실", title: "기본룸·프리미엄룸", desc: "독립 공간, 냉난방, CCTV, 야간 케어 포함 여부에 따라 가격 차이가 큽니다." },
              { emoji: "🦮", tag: "옵션", title: "산책·놀이·픽업", desc: "산책 횟수, 놀이 시간, 픽업 거리에 따라 추가 요금이 붙는지 확인해야 합니다." },
            ].map((c) => (
              <article key={c.tag} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{c.emoji}</div>
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wide">{c.tag}</span>
                <h3 className="font-bold text-gray-800 mt-1 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Care Categories */}
        <section>
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">🏠 Care Categories</span>
            <h2 className="text-3xl font-extrabold text-gray-800">가격만큼 중요한 호텔 선택 기준</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "👤", title: "돌봄 인원", desc: "야간 상주 여부와 한 명이 돌보는 반려동물 수를 확인하면 안전성을 비교할 수 있습니다." },
              { emoji: "🏡", title: "객실 환경", desc: "분리 공간, 냉난방, 환기, 소음 관리, 고양이 전용 공간이 있는지 확인하세요." },
              { emoji: "📋", title: "예약 조건", desc: "성수기 예약금, 취소 수수료, 입실·퇴실 시간을 비교하면 추가 비용을 줄일 수 있습니다." },
              { emoji: "💉", title: "건강 확인", desc: "예방접종 증명, 전염성 질환 확인, 중성화 여부 같은 입실 조건을 미리 봐야 합니다." },
            ].map((c) => (
              <article key={c.title} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-1">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="bg-amber-400 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full">✅ Checklist</span>
            <h2 className="text-3xl font-extrabold text-white">호텔 예약 전 꼭 물어볼 질문</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "1. 총 숙박 예상액", desc: "1박 가격 외에 산책, 놀이, 픽업, 목욕, 시간 초과 비용이 붙는지 물어보세요." },
              { title: "2. 크기별 가격", desc: "소형견, 중형견, 대형견 기준이 호텔마다 다르므로 kg 기준을 확인하세요." },
              { title: "3. 취소와 변경", desc: "성수기에는 예약금 환불 기준과 날짜 변경 가능 여부가 특히 중요합니다." },
              { title: "4. 입실 조건", desc: "예방접종 증명서, 사료 준비, 복용약 전달 방식, 공격성 여부 상담 기준을 확인하세요." },
            ].map((c) => (
              <article key={c.title} className="bg-white/20 backdrop-blur rounded-2xl p-5">
                <h3 className="font-bold text-white mb-1">{c.title}</h3>
                <p className="text-amber-50 text-sm leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">❓ FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-800">자주 묻는 질문</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              {
                q: "가격 정보가 실제 금액인가요?",
                a: "현재는 서비스 화면을 만들기 위한 예시 데이터입니다. 실제 운영 시에는 호텔 제휴 데이터나 관리자가 검수한 가격표가 필요합니다.",
              },
              {
                q: "왜 같은 1박인데 가격 차이가 큰가요?",
                a: "지역, 객실 크기, CCTV, 산책 횟수, 야간 상주, 성수기 여부, 반려동물 크기에 따라 차이가 납니다.",
              },
              {
                q: "예약까지 바로 할 수 있나요?",
                a: "지금은 전화와 외부 예약 링크로 연결하는 형태입니다. 실제 서비스에서는 호텔별 예약 API나 자체 예약 폼을 붙일 수 있습니다.",
              },
            ].map((item) => (
              <details key={item.q} className="bg-white rounded-2xl border border-amber-100 shadow-sm group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-700 list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-amber-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">📬 Contact</span>
            <h2 className="text-3xl font-extrabold text-gray-800">호텔 가격표 등록 및 예약 제휴 문의</h2>
            <p className="text-gray-400 text-sm">호텔 가격표, 예약 링크, 위치 정보 등록을 원하면 아래 폼으로 보내주세요.</p>
          </div>
          <ContactForm />
        </section>

      </main>

      <footer className="bg-white border-t border-amber-100 mt-24 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/pet-logo.png" alt="logo" width={28} height={28} className="rounded-lg" />
          <span className="font-bold text-amber-500">펫스테이맵</span>
        </div>
        <p className="text-sm text-gray-400">© 2026 Pet Stay Map. 전국 동물 호텔 가격 비교 가이드.</p>
        <p className="text-xs text-gray-300 mt-1">이 사이트의 가격과 호텔 정보는 예시 데이터이며, 실제 비용과 예약 가능 여부는 호텔 확인을 우선하세요.</p>
      </footer>
    </div>
  );
}
