'use client';

import { usePathname } from 'next/navigation';

export default function Container({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullScrollPage = pathname === '/' || pathname === '/my-tree';

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 데스크탑일 때만 보이는 빨간색 외부 박스 - 컨텐츠보다 살짝 크게 */}
      <div className="hidden md:block absolute w-[calc(390px+8rem)] h-[calc(845px+5rem)] bg-[#BF0120]"></div>

      {/* 실제 컨텐츠 컨테이너 - 모바일 뷰 사이즈 고정 */}
      <div
        className={`w-full md:w-[390px] md:h-[845px] flex flex-col relative z-10 bg-[#DC0A2D] ${
          isFullScrollPage ? '' : 'h-screen overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
