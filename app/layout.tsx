import type { Metadata } from "next";
import "./globals.css";
import GNB from "./components/GNB";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "멍냥멍냥 — 반려동물 통합 플랫폼",
  description: "반려생활의 모든 순간을 함께. 카페, 녹소, 산책로까지 한 번에 만나보고 예약하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <GNB />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
