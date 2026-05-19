"use client";

type Filters = {
  area: string;
  pet: string;
  service: string;
  open: string;
  keyword: string;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function FilterBar({ filters, onChange }: Props) {
  const update = (key: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    onChange({ ...filters, [key]: e.target.value });
  };

  const selectClass =
    "w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500";
  const labelClass = "flex flex-col gap-1 text-sm text-gray-400";

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className={labelClass}>
          지역
          <select value={filters.area} onChange={update("area")} className={selectClass}>
            <option value="all">전체 지역</option>
            {["서울", "경기", "부산", "대구", "광주", "제주"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          반려동물
          <select value={filters.pet} onChange={update("pet")} className={selectClass}>
            <option value="all">전체</option>
            {["소형견", "중형견", "대형견", "고양이"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          객실·돌봄 옵션
          <select value={filters.service} onChange={update("service")} className={selectClass}>
            <option value="all">전체 옵션</option>
            {["기본룸", "프리미엄룸", "고양이전용룸", "CCTV", "산책", "픽업"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          예약 조건
          <select value={filters.open} onChange={update("open")} className={selectClass}>
            <option value="all">전체</option>
            <option value="open">예약 가능</option>
            <option value="online">온라인예약</option>
            <option value="sameDay">당일예약</option>
            <option value="longStay">장기숙박 할인</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="keyword" className="text-sm text-gray-400">호텔명 또는 동네 검색</label>
        <input
          id="keyword"
          type="search"
          value={filters.keyword}
          onChange={update("keyword")}
          placeholder="예: 강남, 부산, CCTV, 픽업"
          className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
        />
      </div>

      <p className="text-xs text-gray-500">
        가격은 성수기, 반려동물 크기, 투숙 기간, 추가 돌봄 옵션에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
