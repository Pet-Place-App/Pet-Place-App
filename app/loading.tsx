import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FFF3E8] flex items-center justify-center z-50">
      <div className="text-center">
        <Image
          src="/loading-hero.png"
          alt="로딩 중"
          width={490}
          height={290}
          className="w-full max-w-[490px] h-auto mx-auto"
          priority
        />
        <div className="w-52 h-2.5 bg-orange-100 rounded-full overflow-hidden mx-auto mt-2">
          <div className="h-full bg-[#F97316] rounded-full w-[70%] animate-pulse" />
        </div>
        <p className="text-[12px] text-gray-400 mt-2">로딩 중... 🐾</p>
      </div>
    </div>
  );
}
