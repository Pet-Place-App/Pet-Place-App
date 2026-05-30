import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-50">
      <div className="w-full max-w-sm">
        <Image
          src="/img-loading.png"
          alt="로딩 중"
          width={480}
          height={480}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
