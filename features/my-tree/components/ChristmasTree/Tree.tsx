"use client";

import Image, { StaticImageData } from "next/image";
import BackgroundImage from "@/assets/images/background/background.png";

/**
 * Tree 컴포넌트
 * - 배경 이미지와 트리 이미지를 표시
 * - 트리 위에 몬스터볼(편지)을 표시
 * - 획득한 포켓몬을 트리 옆에 표시
 */

interface TreeProps {
  // 현재 표시할 포켓몬 인덱스 (획득한 포켓몬 중)
  currentPokemonIndex: number;
  // 획득한 포켓몬 목록
  obtainedPokemons: StaticImageData[];
  // 전체 편지 개수
  totalMessageCount: number;
  // 현재 페이지
  currentPage: number;
  // 편지 클릭 핸들러
  onLetterClick?: (index: number) => void;
}

export function Tree({
  currentPokemonIndex,
  obtainedPokemons,
  totalMessageCount,
  currentPage,
  onLetterClick,
}: TreeProps) {
  // 페이지 계산
  const messagesPerPage = 6;
  const totalPages = Math.ceil(totalMessageCount / messagesPerPage);
  // 현재 페이지에 표시할 편지 개수
  const currentPageMessageCount = Math.min(
    messagesPerPage,
    totalMessageCount - currentPage * messagesPerPage
  );
  return (
    <div className="relative w-full flex-1 overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="배경"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 트리 이미지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[280px] h-[400px]">
          {/* 트리 이미지 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[250px] h-[350px] bg-green-600 rounded-lg opacity-80 flex items-center justify-center">
              <span className="text-white text-sm">트리 이미지</span>
            </div>
          </div>

          {/* 트리 위의 몬스터볼(편지) 표시 */}
          {/* 편지 위치는 하드코딩 */}
          {currentPageMessageCount > 0 && (
            <>
              {/* 몬스터볼 위치 - 6개 표시 */}
              {Array.from({ length: currentPageMessageCount }).map((_, index) => {
                // 6개 몬스터볼 위치 (트리 피라미드 형태)
                const positions = [
                  { top: "15%", left: "45%" },  // 꼭대기
                  { top: "35%", left: "30%" },  // 2층 왼쪽
                  { top: "35%", left: "60%" },  // 2층 오른쪽
                  { top: "55%", left: "20%" },  // 3층 왼쪽
                  { top: "55%", left: "50%" },  // 3층 가운데
                  { top: "55%", left: "75%" },  // 3층 오른쪽
                ];
                const pos = positions[index];
                // 실제 메시지 인덱스 계산 (페이지 * 6 + 현재 인덱스)
                const actualMessageIndex = currentPage * messagesPerPage + index;

                return (
                  // 몬스터볼 편지 버튼
                  <button
                    key={index}
                    onClick={() => onLetterClick?.(actualMessageIndex)}
                    className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-black flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: pos.top,
                      left: pos.left,
                    }}
                    aria-label={`편지 ${actualMessageIndex + 1}`}
                  >
                    {/* 몬스터볼 디자인 (임시임) */}
                    <div className="absolute w-full h-0.5 bg-black top-1/2 -translate-y-1/2" />
                    <div className="absolute w-2 h-2 rounded-full bg-white border border-black z-10" />
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* 획득한 포켓몬 6마리 표시 */}
      {obtainedPokemons.map((pokemon, index) => {
        // 6마리 포켓몬 위치
        const pokemonPositions = [
          { bottom: "60%", left: "2%", scaleX: -1 },    // 왼쪽 상단 (오른쪽 바라봄)
          { bottom: "40%", left: "2%", scaleX: -1 },    // 왼쪽 중단 (오른쪽 바라봄)
          { bottom: "20%", left: "2%", scaleX: -1 },    // 왼쪽 하단 (오른쪽 바라봄)
          { bottom: "60%", right: "2%", scaleX: 1 },  // 오른쪽 상단 (왼쪽 바라봄)
          { bottom: "40%", right: "2%", scaleX: 1 },  // 오른쪽 중단 (왼쪽 바라봄)
          { bottom: "20%", right: "2%", scaleX: 1 },  // 오른쪽 하단 (왼쪽 바라봄)
        ];
        const pos = pokemonPositions[index];
        if (!pos) return null;

        // 선택된 포켓몬 하이라이트
        const isSelected = index === currentPokemonIndex;

        return (
          <div
            key={index}
            className={`absolute w-12 h-12 ${isSelected ? "ring-2 ring-yellow-400 rounded-full" : ""}`}
            style={{
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              transform: `scaleX(${pos.scaleX})`,
            }}
          >
            <Image
              src={pokemon}
              alt={`포켓몬 ${index + 1}`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        );
      })}

      {/* 페이지 인디케이터 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-white/80 px-3 py-1 rounded-full">
        <span className="text-black font-bold">
          {currentPage + 1}/{totalPages}
        </span>
      </div>
    </div>
  );
}
