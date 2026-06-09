import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const CATEGORY_ICONS = [
  { key: "hotel",    label: "펫호텔",      icon: "home",             href: "/search?category=hotel" },
  { key: "grooming", label: "미용실",      icon: "content_cut",      href: "/search?category=grooming" },
  { key: "hospital", label: "동물병원",    icon: "medical_services", href: "/search?category=hospital" },
  { key: "training", label: "훈련·유치원", icon: "school",           href: "/search?category=training" },
  { key: "taxi",     label: "펫택시",      icon: "local_taxi",       href: "/search?category=taxi" },
  { key: "sitter",   label: "펫시터",      icon: "support_agent",    href: "/search?category=sitter" },
  { key: "supply",   label: "용품·간식",   icon: "shopping_bag",     href: "/search?category=supply" },
  { key: "all",      label: "전체보기",    icon: "apps",             href: "/search" },
];

const FEATURES = [
  { icon: "verified_user",  title: "안심할 수 있는 서비스", desc: "검증된 업체와 리뷰 시스템" },
  { icon: "calendar_month", title: "간편한 예약",            desc: "원하는 시간에 쉽게 예약" },
  { icon: "redeem",         title: "다양한 혜택",            desc: "멍냥멍냥만의 특별 할인" },
  { icon: "support_agent",  title: "24시간 고객센터",        desc: "언제든지 문의하세요" },
];

const DUMMY_PLACES = [
  { id: 0, name: "멍멍 호텔",      category: "hotel",    address: "서울 강남구", rating: 4.9, review_count: 125, price_info: "1박 35,000원~",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2eFeOe_Gqa6_DrxJINJ9WPIPypYjtAV__HL0GpJ8i2G9FPrPB5YC8NIVaSkV4zxb3m8TJKOEPRFnYvQr22eCZxSO5fWQdthQd0DN8LTz5OAqPnVfitfTx6gaJogAWNX5hDepRL9TjtpsPyytPnZQuDVZmGIrD0NYUpccshNfCe-hOlldI-fS8F8zdHr4V8qhfQpwxK33aYMUaGNVT_hXG4gyj5wdkmvt5ZlTcbrmG5WGV8cNXrYlTShfC_lVDpKC9rcxN2Z8u0afM" },
  { id: 0, name: "댕댕이 미용실",  category: "grooming", address: "서울 서초구", rating: 4.8, review_count: 98,  price_info: "30,000원~",          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtq_phYzylakDNOW2-WM5Svyxx33nTKHqNf_9a7nvKcRgZ6bQLwbgi-zz9ljLXBs1_ciYM_W-9-pno1apNL9vMbg9sXSAzBAl9GuGrsvVLDBGRove0TJf_JHdR_HrMJGvIwQPy0IWfAyVaRHg2smC7Y4TLEms5w4ay57hYQgpqdfkXtgEU5Qs8M0KTikQElOYAu2y-MNEBwOQXoo7B-gU4lpnDYw0x87J6an0rNo4zX7w8UgpY3baskUGJwimdlZyUoE_6omQFzwl8" },
  { id: 0, name: "멍냥 동물병원",  category: "hospital", address: "서울 송파구", rating: 4.9, review_count: 312, price_info: "진료비 10,000원~", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLrWNNfoV0Mk6oecCUW1Hnl0cjnqc4bh686wkwXiW0mFV_0YCi0X8DVl51D_BPFPEkJqD1dMhVdkV8OqyZxt0GGqxFgg_Xe4r9BPmAFjuDAj4XCKjICnAejyOqT0mfUdI0Dy5H1o3bx-ZamGmyVe5evXc3j80HyaWXs-TMPgDpEIenMM--WZ_XOO0LdLD1lKi2Op87idCUf0aQUtDgjdDk8FWAkgh6GhlXlBrMy6bCOUsDrxpGXSnCvqFUIqF8yKUsVAIXWHpvGgNV" },
  { id: 0, name: "멍냥 훈련소",    category: "training", address: "경기 성남시", rating: 4.7, review_count: 76,  price_info: "월 200,000원~",     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzhI0aT8oR0utx6LEVGoZUEYuG9tlSEUroKrnmmOEyB9B-Qji2rbRg00DzmyDJiqzLOIQT8Tt5SV-K-5isr2l7kiPtHhTRaBeQgaNLXCoGPi2VHW3kYBNOj5574AjLLbALOdMhbQJlajLmOQGj7eEyUN18IGvo4_WK5WtJ9XWA7mBEQp0-wk8FUwwV4qtWkSFlMiMZ5ZjNTdhPsFcyy1sPgrycf2I0WC0oCQxPBzTUgbywzMV0JA7HxQOX4cIeO5i4oq_3INRqxrrA" },
  { id: 0, name: "멍냥 펫시터",    category: "sitter",   address: "서울 마포구", rating: 4.9, review_count: 156, price_info: "1시간 15,000원~",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAOHb7PZvJFI8CaoOIMeDO7v4aCOryL9hWNXsd5zUVCcCUOvkjFetaWkR1811-0zCmP51qnA7PjaLUm-_jUPN90Zto7PdfZO5L0ZmERFGjXoTUyet-zPCALdGESIsgFn7HUkg80QOlYX-0QqYZjqqJWrMHrhZyih4_5_Bl5_0XyELKMB0pwfUXyxDP5XAvmXPYm3aURNEgG_I8fbH1q8tFsj5vrJ-tSP-_9nfSLAx34V09CzQ6boFxVyHbNWnfx6oAyrXl6XGbX2s_" },
];

const STITCH_HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAAkhVwiwiqBqQKPlv9Pqf7rDVinYXdTesxjqw1jdpmn0KqZWjqr2rh1mmIXzmfe-oOUamT9TMCsLW2qfX8DQ4Y1SVbSeO2kjajLZvrfzlHbht4gtIMuFq_6lZzTkGJlu4LQPxpcrA-WyP7avLqJePZm7wUrGvpiNyTokpPG9h0nPSBNVHHiozWa_mP1mlbnE1xYOdpu1pGkTsbopl0wS_FZvYEYdptScTkOACl4o7WgWua0gJp2EsUH1AQGqaIEzhox0oreHCr-B-o";

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "동물병원", hotel: "펫호텔", cafe: "펫카페", park: "공원",
  grooming: "미용실", training: "훈련·유치원", sitter: "펫시터",
  supply: "용품·간식", taxi: "펫택시", photo: "사진관",
};

export default async function HomePage() {
  const { data: places } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const featured = places && places.length > 0 ? places : null;

  return (
    <div className="bg-[#fbf9f8] min-h-screen">

      {/* ── 히어로 ── */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* 좌측 텍스트 */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbce] text-[#7f2b00] text-[12px] font-semibold mb-6">
              <span className="material-symbols-outlined text-[16px]">pets</span>
              우리 아이 행복의 시작, 멍냥멍냥
            </div>
            <h1 className="text-[40px] font-bold text-[#1b1c1c] mb-4 leading-tight tracking-tight">
              반려생활의<br />
              <span className="text-[#ff7e47]">모든 순간을 함께</span>
            </h1>
            <p className="text-[18px] text-[#635d58] mb-10 leading-relaxed">
              카페, 숙소, 산책로까지<br />
              한 번에 찾아보고 예약하세요.
            </p>

            {/* 검색바 */}
            <form action="/search" method="GET">
              <div className="bg-white p-2 rounded-full shadow-sm border border-[#dfc0b5]/50 flex flex-col md:flex-row items-center gap-2 max-w-xl mx-auto md:mx-0">
                <div className="hidden md:flex items-center px-4 border-r border-[#dfc0b5]/30">
                  <span className="material-symbols-outlined text-[#8b7268] mr-2 text-[20px]">location_on</span>
                  <select name="region" className="border-none focus:ring-0 text-[14px] bg-transparent cursor-pointer text-[#1b1c1c] outline-none">
                    <option value="">지역을 선택해주세요</option>
                    <option value="강남구">서울 강남구</option>
                    <option value="서초구">서울 서초구</option>
                    <option value="마포구">서울 마포구</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center px-4 w-full">
                  <input
                    name="q"
                    type="text"
                    placeholder="어떤 서비스를 찾고 있나요?"
                    className="w-full border-none focus:ring-0 text-[14px] bg-transparent text-[#1b1c1c] placeholder:text-[#8b7268] outline-none"
                  />
                </div>
                <button type="submit" className="w-12 h-12 bg-[#ff7e47] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-md shrink-0">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              </div>
            </form>
          </div>

          {/* 우측 히어로 이미지 */}
          <div className="flex-1 relative hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STITCH_HERO_IMG}
              alt="멍냥멍냥 히어로"
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── 카테고리 그리드 ── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-8">
            {CATEGORY_ICONS.map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                className="flex flex-col items-center gap-3 group transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f5f3f3] flex items-center justify-center group-hover:bg-[#ffdbce] transition-colors">
                  <span
                    className="material-symbols-outlined text-[#57423a] group-hover:text-[#a53c05] transition-colors"
                    style={{ fontSize: "32px" }}
                  >
                    {cat.icon}
                  </span>
                </div>
                <span className="text-[14px] font-semibold text-[#1b1c1c] group-hover:text-[#a53c05] transition-colors text-center leading-tight">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 추천 서비스 ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#1b1c1c] flex items-center gap-2">
              멍냥이 맞춤 추천 서비스
              <span className="material-symbols-outlined text-[#ff7e47]">stars</span>
            </h2>
            <Link href="/search" className="text-[14px] font-semibold text-[#57423a] flex items-center hover:text-[#a53c05] transition-colors">
              더보기
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(featured ?? DUMMY_PLACES).map((place, i) => (
              <PlaceCard key={place.id || i} place={place} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 피처 바 ── */}
      <section className="py-12 bg-[#f5f3f3] border-y border-[#dfc0b5]/20">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#a53c05]/10 flex items-center justify-center text-[#a53c05] shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {f.icon}
                </span>
              </div>
              <div>
                <p className="font-bold text-[#1b1c1c] text-[14px]">{f.title}</p>
                <p className="text-[12px] text-[#57423a] mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

type PlaceType = {
  id: number;
  name: string;
  category: string;
  address?: string;
  price_info?: string;
  rating?: number;
  review_count?: number;
  img?: string;
};

const STITCH_CARD_IMGS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC2eFeOe_Gqa6_DrxJINJ9WPIPypYjtAV__HL0GpJ8i2G9FPrPB5YC8NIVaSkV4zxb3m8TJKOEPRFnYvQr22eCZxSO5fWQdthQd0DN8LTz5OAqPnVfitfTx6gaJogAWNX5hDepRL9TjtpsPyytPnZQuDVZmGIrD0NYUpccshNfCe-hOlldI-fS8F8zdHr4V8qhfQpwxK33aYMUaGNVT_hXG4gyj5wdkmvt5ZlTcbrmG5WGV8cNXrYlTShfC_lVDpKC9rcxN2Z8u0afM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtq_phYzylakDNOW2-WM5Svyxx33nTKHqNf_9a7nvKcRgZ6bQLwbgi-zz9ljLXBs1_ciYM_W-9-pno1apNL9vMbg9sXSAzBAl9GuGrsvVLDBGRove0TJf_JHdR_HrMJGvIwQPy0IWfAyVaRHg2smC7Y4TLEms5w4ay57hYQgpqdfkXtgEU5Qs8M0KTikQElOYAu2y-MNEBwOQXoo7B-gU4lpnDYw0x87J6an0rNo4zX7w8UgpY3baskUGJwimdlZyUoE_6omQFzwl8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLrWNNfoV0Mk6oecCUW1Hnl0cjnqc4bh686wkwXiW0mFV_0YCi0X8DVl51D_BPFPEkJqD1dMhVdkV8OqyZxt0GGqxFgg_Xe4r9BPmAFjuDAj4XCKjICnAejyOqT0mfUdI0Dy5H1o3bx-ZamGmyVe5evXc3j80HyaWXs-TMPgDpEIenMM--WZ_XOO0LdLD1lKi2Op87idCUf0aQUtDgjdDk8FWAkgh6GhlXlBrMy6bCOUsDrxpGXSnCvqFUIqF8yKUsVAIXWHpvGgNV",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzhI0aT8oR0utx6LEVGoZUEYuG9tlSEUroKrnmmOEyB9B-Qji2rbRg00DzmyDJiqzLOIQT8Tt5SV-K-5isr2l7kiPtHhTRaBeQgaNLXCoGPi2VHW3kYBNOj5574AjLLbALOdMhbQJlajLmOQGj7eEyUN18IGvo4_WK5WtJ9XWA7mBEQp0-wk8FUwwV4qtWkSFlMiMZ5ZjNTdhPsFcyy1sPgrycf2I0WC0oCQxPBzTUgbywzMV0JA7HxQOX4cIeO5i4oq_3INRqxrrA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCAOHb7PZvJFI8CaoOIMeDO7v4aCOryL9hWNXsd5zUVCcCUOvkjFetaWkR1811-0zCmP51qnA7PjaLUm-_jUPN90Zto7PdfZO5L0ZmERFGjXoTUyet-zPCALdGESIsgFn7HUkg80QOlYX-0QqYZjqqJWrMHrhZyih4_5_Bl5_0XyELKMB0pwfUXyxDP5XAvmXPYm3aURNEgG_I8fbH1q8tFsj5vrJ-tSP-_9nfSLAx34V09CzQ6boFxVyHbNWnfx6oAyrXl6XGbX2s_",
];

function PlaceCard({ place, index }: { place: PlaceType; index: number }) {
  const href = place.id ? `/places/${place.id}` : "/search";
  const imgSrc = place.img ?? STITCH_CARD_IMGS[index % STITCH_CARD_IMGS.length];

  return (
    <Link href={href} className="bg-white rounded-xl overflow-hidden border border-[#dfc0b5]/30 hover:-translate-y-1 transition-all duration-200 group shadow-sm">
      <div className="aspect-[4/3] bg-[#f5f3f3] relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full text-[12px] font-medium text-[#57423a]">
          {CATEGORY_LABEL[place.category] ?? place.category}
        </span>
        <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-all">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#1b1c1c] mb-1 truncate">{place.name}</h3>
        <div className="flex items-center gap-1 text-[12px] text-[#57423a] mb-2">
          <span className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
          {(place.rating ?? 0).toFixed(1)} ({place.review_count ?? 0}) · {place.address}
        </div>
        <p className="text-[#a53c05] font-bold text-[14px]">{place.price_info}</p>
      </div>
    </Link>
  );
}
