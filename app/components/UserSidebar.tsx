"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_GROUPS = [
  {
    label: "나의 활동",
    items: [
      { href: "/mypage", label: "마이페이지", icon: "🏠" },
      { href: "/bookings", label: "예약 내역", icon: "📋" },
      { href: "/reviews", label: "내 리뷰", icon: "⭐" },
      { href: "/favorites", label: "찜 목록", icon: "❤️" },
    ],
  },
  {
    label: "계정 관리",
    items: [
      { href: "/mypage/profile", label: "프로필 수정", icon: "✏️" },
      { href: "/mypage/pets", label: "반려동물 등록", icon: "🐾" },
      { href: "/notifications", label: "알림 설정", icon: "🔔" },
    ],
  },
];

type Props = {
  user?: { name: string; email: string; petCount?: number };
};

export default function UserSidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0">
      {/* 유저 프로필 카드 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
            🐶
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{user?.name ?? "멍냥 회원"}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email ?? "로그인이 필요합니다"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-orange-50 rounded-xl py-2">
            <p className="text-sm font-bold text-orange-500">0</p>
            <p className="text-xs text-gray-400">예약</p>
          </div>
          <div className="bg-orange-50 rounded-xl py-2">
            <p className="text-sm font-bold text-orange-500">0</p>
            <p className="text-xs text-gray-400">리뷰</p>
          </div>
          <div className="bg-orange-50 rounded-xl py-2">
            <p className="text-sm font-bold text-orange-500">{user?.petCount ?? 0}</p>
            <p className="text-xs text-gray-400">반려동물</p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      {MENU_GROUPS.map((group) => (
        <div key={group.label} className="bg-white rounded-2xl border border-gray-100 p-3 mb-3">
          <p className="text-xs font-bold text-gray-400 px-2 py-1 mb-1">{group.label}</p>
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}

      {/* 로그아웃 */}
      <button className="w-full py-2.5 text-sm text-gray-400 hover:text-red-400 font-medium transition-colors text-center rounded-xl hover:bg-red-50">
        로그아웃
      </button>
    </aside>
  );
}
