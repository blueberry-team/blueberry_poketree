"use client";

import { LandingTree } from "@/features/landing/components/LandingTree/LandingTree";
import { ChristmasCountdown } from "@/features/landing/components/ChristmasCountdown/ChristmasCountdown";
import { LandingFooter } from "@/features/landing/components/LandingFooter/LandingFooter";

// 랜딩 페이지
export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-3 shrink-0">
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
