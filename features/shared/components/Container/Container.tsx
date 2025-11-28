'use client';


export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 데스크탑일 때만 보이는 빨간색 외부 박스 - 컨텐츠보다 살짝 크게 */}
      <div className="hidden md:block absolute w-[calc(390px+8rem)] h-[calc(845px+5rem)] bg-[#BF0120]"></div>

      {/* 실제 컨텐츠 컨테이너 - 모바일 뷰 사이즈 고정 */}
      <div className="w-full md:w-[390px] h-screen md:h-[845px] flex flex-col overflow-y-auto scrollbar-hide relative z-10 bg-[#DC0A2D]">
        {children}
      </div>
    </div>
  );
}
