'use client';

import Image from "next/image";
import WindowBackground from "@/assets/images/background/window_background.png";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 데스크탑일 때만 보이는 배경 이미지 - 모든 요소의 가장 뒤에 위치 */}
      <div className="hidden md:block fixed inset-0 w-screen h-screen z-0">
        <Image
          src={WindowBackground}
          alt="window background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 실제 컨텐츠 컨테이너 - 모바일 뷰 사이즈 고정 */}
      <div className="w-full md:w-[390px] h-full flex flex-col overflow-y-auto scrollbar-hide relative z-10 bg-[#DC0A2D]">
        {children}
      </div>
    </div>
  );
}
