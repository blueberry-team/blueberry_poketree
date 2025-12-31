"use client";

import { Snow } from "@/features/shared/components/Snow/Snow";
import { GoodbyeSection } from "@/features/landing/components/GoodbyeSection";


// 랜딩 페이지
export default function LandingPage() {
  return (
    <div className="relative">
      {/* 눈 내리는 효과 */}
      <Snow />

      <div className="py-3 bg-[#BF0120]">
        <GoodbyeSection />
      </div>

    </div>
  );
}
