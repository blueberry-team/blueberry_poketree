'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import WindowBackgroundDay from "@/assets/images/background/window_background_day.webp";
import WindowBackgroundNight from "@/assets/images/background/window_background_night.png";
import { getTimeOfDay, TimeOfDay } from "@/features/shared/utils/time/getTimeOfDay";

export default function Container({ children }: { children: React.ReactNode }) {
  // 낮/밤 상태 관리 - 초기값으로 현재 시간 설정
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => getTimeOfDay());

  useEffect(() => {
    // 1분마다 시간 체크하여 업데이트
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // 60초마다 체크

    return () => clearInterval(interval);
  }, []);

  // 시간에 따른 배경 이미지 선택
  const WindowBackground = timeOfDay === TimeOfDay.NIGHT ? WindowBackgroundNight : WindowBackgroundDay;

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
