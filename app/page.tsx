"use client";

import dynamic from "next/dynamic";
import { LandingTree } from "@/features/landing/components/LandingTree";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { Snow } from "@/features/shared/components/Snow/Snow";

// TODO: 리팩토링 시 hydration 문제 해결 방안 검토 (현재 ssr: false로 우회 중)
const ChristmasCountdown = dynamic(
  () => import("@/features/landing/components/ChristmasCountdown").then(mod => mod.ChristmasCountdown),
  { ssr: false }
);

// 랜딩 페이지
export default function LandingPage() {
  return (
    <div className="relative">
      {/* 눈 내리는 효과 */}
      <Snow />

      <div className="py-3 bg-[#BF0120]">
        {/* 헤더 영역 */}
        <ChristmasCountdown />
      </div>

      {/* 바디 영역 */}
      <LandingTree />

      {/* 푸터 영역 */}
      <LandingFooter />

    </div>
  );
}
