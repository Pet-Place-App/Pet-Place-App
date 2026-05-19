import { Metadata } from "next";
import Link from "next/link";
import HotelFinder from "./components/HotelFinder";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "펫스테이맵 | 전국 동물 호텔 가격 비교",
  description: "전국 동물 호텔의 1박 가격, 지역, 객실 타입, 돌봄 옵션, 예약 가능 여부를 비교하는 사이트입니다.",
};

const sectionHeading = (eyebrow: string, title: string, desc?: string) => (
  <div className="text-center space-y-2 mb-8">
    <p className="text-xs tracking-widest text-blue-400 uppercase">{eyebrow}</p>
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    {desc && <p className="text-gray-400 text-sm max-w-xl mx-auto">{desc}</p>}
  </div>
);

export default function PetStayMapPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-10 bg-gray-900/95 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/pet-stay-map" className="font-bold text-white text-lg">
            Pet Stay Map
          </Link>
          <ul className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <li><Link href="#finder" className="hover:text-white transition-colors">가격 비교</Link></li>
            <li><Link href="#compare" className="hover:text-white transition-colors">비교 포인트</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">제휴 문의</Link></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-20">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-xs tracking-widest text-blue-400 uppercase">Nationwide Pet Hotel Compare</p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              전국 동물 호텔 숙박 가격을<br />한눈에 비교하세요
            </h1>
            <p className="text-gray-400">
              서울부터 제주까지 지역별 펫호텔의 1박 가격, 객실 타입,
              산책·놀이·CCTV 같은 돌봄 옵션과 예약 가능 여부를 함께 비교합니다.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#finder"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                호텔 가격 비교하기
              </a>
            </div>
          </div>

          <aside className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="font-bold mb-4">비교 기준</h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                "소형견, 중형견, 대형견, 고양이 1박 가격",
                "서울, 경기, 부산, 대구, 광주, 제주 등 전국 지역",
                "CCTV, 산책, 놀이시간, 픽업 가능 여부",
                "온라인예약, 당일예약, 장기숙박 할인 표시",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* Hotel Finder */}
        <div>
          {sectionHeading(
            "Hotel Finder",
            "전국 동물 호텔 가격 비교",
            "지역과 반려동물 크기, 객실 옵션을 고르면 호텔별 1박 예상 가격과 예약 방식을 비교할 수 있습니다. 금액은 예시 데이터이며 실제 예약 전에는 호텔에 최종 비용을 확인해야 합니다."
          )}
          <HotelFinder />
        </div>

        {/* Price Compare */}
        <section id="compare">
          {sectionHeading("Price Snapshot", "숙박 가격 비교 포인트")}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { tag: "크기", title: "소형견·중형견·대형견", desc: "몸무게 기준으로 가격이 달라지는 곳이 많아 반려동물 체중을 먼저 확인하세요." },
              { tag: "객실", title: "기본룸·프리미엄룸", desc: "독립 공간, 냉난방, CCTV, 야간 케어 포함 여부에 따라 가격 차이가 큽니다." },
              { tag: "옵션", title: "산책·놀이·픽업", desc: "산책 횟수, 놀이 시간, 픽업 거리에 따라 추가 요금이 붙는지 확인해야 합니다." },
            ].map((c) => (
              <article key={c.tag} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <span className="text-xs text-blue-400 uppercase tracking-widest">{c.tag}</span>
                <h3 className="font-bold text-white mt-1 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Care Categories */}
        <section>
          {sectionHeading("Care Categories", "가격만큼 중요한 호텔 선택 기준")}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "돌봄 인원", desc: "야간 상주 여부와 한 명이 돌보는 반려동물 수를 확인하면 안전성을 비교할 수 있습니다." },
              { title: "객실 환경", desc: "분리 공간, 냉난방, 환기, 소음 관리, 고양이 전용 공간이 있는지 확인하세요." },
              { title: "예약 조건", desc: "성수기 예약금, 취소 수수료, 입실·퇴실 시간을 비교하면 추가 비용을 줄일 수 있습니다." },
              { title: "건강 확인", desc: "예방접종 증명, 전염성 질환 확인, 중성화 여부 같은 입실 조건을 미리 봐야 합니다." },
            ].map((c) => (
              <article key={c.title} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <h3 className="font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section>
          {sectionHeading("Checklist", "호텔 예약 전 꼭 물어볼 질문")}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "1. 총 숙박 예상액", desc: "1박 가격 외에 산책, 놀이, 픽업, 목욕, 시간 초과 비용이 붙는지 물어보세요." },
              { title: "2. 크기별 가격", desc: "소형견, 중형견, 대형견 기준이 호텔마다 다르므로 kg 기준을 확인하세요." },
              { title: "3. 취소와 변경", desc: "성수기에는 예약금 환불 기준과 날짜 변경 가능 여부가 특히 중요합니다." },
              { title: "4. 입실 조건", desc: "예방접종 증명서, 사료 준비, 복용약 전달 방식, 공격성 여부 상담 기준을 확인하세요." },
            ].map((c) => (
              <article key={c.title} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <h3 className="font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          {sectionHeading("FAQ", "자주 묻는 질문")}
          <div className="max-w-2xl mx-auto space-y-2">
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
              <details key={item.q} className="bg-gray-800 rounded-xl border border-gray-700 group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-white list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          {sectionHeading(
            "Contact",
            "호텔 가격표 등록 및 예약 제휴 문의",
            "호텔 가격표, 예약 링크, 위치 정보 등록을 원하면 아래 폼으로 보내주세요."
          )}
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-gray-800 mt-20 py-8 text-center text-sm text-gray-500">
        <p>© 2026 Pet Stay Map. 전국 동물 호텔 가격 비교 가이드.</p>
        <p className="mt-1">이 사이트의 가격과 호텔 정보는 예시 데이터이며, 실제 비용과 예약 가능 여부는 호텔 확인을 우선하세요.</p>
      </footer>
    </div>
  );
}
