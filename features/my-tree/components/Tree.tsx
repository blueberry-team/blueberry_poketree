"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import BackgroundImage from "@/assets/images/background/background.png";
import TreeImage from "@/assets/images/background/tree.png";
import MonsterBallOpen from "@/assets/images/background/monster_ball_open.png";
import MonsterBallClose from "@/assets/images/background/monster_ball_close.png";

/**
 * Tree 컴포넌트
 * - 배경 이미지와 트리 이미지를 표시
 * - 트리 위에 몬스터볼(편지)을 표시
 * - 획득한 포켓몬을 트리 옆에 표시
 */

interface TreeProps {
  // 획득한 포켓몬 목록
  obtainedPokemons: StaticImageData[];
  // 전체 편지 개수
  totalMessageCount: number;
  // 현재 페이지
  currentPage: number;
  // 편지 클릭 핸들러
  onLetterClick?: (index: number) => void;
  // 현재 열린 편지 인덱스 (-1이면 없음)
  openedLetterIndex?: number;
}

export function Tree({
  obtainedPokemons,
  totalMessageCount,
  currentPage,
  onLetterClick,
  openedLetterIndex = -1,
}: TreeProps) {
  // 호버 상태 관리
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

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
        <div className="relative" style={{ width: "min(350px, 80vw)", height: "min(500px, 70vh)" }}>
          {/* 트리 이미지 */}
          <Image
            src={TreeImage}
            alt="크리스마스 트리"
            fill
            className="object-contain"
            priority
          />

          {/* 트리 위의 몬스터볼(편지) 표시 */}
          {currentPageMessageCount > 0 && (
            <>
              {/* 몬스터볼 위치 - 6개 표시 */}
              {Array.from({ length: currentPageMessageCount }).map((_, index) => {
                // 6개 몬스터볼 위치
                const positions = [
                  { top: "24%", left: "60%", transform: "translateX(-50%)" },  // 꼭대기
                  { top: "30%", left: "42%", transform: "translateX(-50%)" },  // 2층 왼쪽
                  { top: "38%", left: "70%", transform: "translateX(-50%)" },  // 2층 오른쪽
                  { top: "45%", left: "30%", transform: "translateX(-50%)" },  // 3층 왼쪽
                  { top: "50%", left: "55%", transform: "translateX(-50%)" },  // 3층 가운데
                  { top: "55%", left: "75%", transform: "translateX(-50%)" },  // 3층 오른쪽
                ];
                const pos = positions[index];
                // 실제 메시지 인덱스 계산 (페이지 * 6 + 현재 인덱스)
                const actualMessageIndex = currentPage * messagesPerPage + index;

                // 열린 상태 또는 호버 상태인지 확인
                const isOpen = actualMessageIndex === openedLetterIndex || actualMessageIndex === hoveredIndex;

                return (
                  // 몬스터볼 편지 버튼
                  <button
                    key={index}
                    onClick={() => onLetterClick?.(actualMessageIndex)}
                    onMouseEnter={() => setHoveredIndex(actualMessageIndex)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    className="absolute w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: pos.transform,
                    }}
                    aria-label={`편지 ${actualMessageIndex + 1}`}
                  >
                    <Image
                      src={isOpen ? MonsterBallOpen : MonsterBallClose}
                      alt="몬스터볼"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
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
          { bottom: "60%", left: "2%", scaleX: -1 },  // 왼쪽 상단
          { bottom: "40%", left: "2%", scaleX: -1 },  // 왼쪽 중단
          { bottom: "20%", left: "2%", scaleX: -1 },  // 왼쪽 하단
          { bottom: "60%", right: "2%", scaleX: 1 },  // 오른쪽 상단
          { bottom: "40%", right: "2%", scaleX: 1 },  // 오른쪽 중단
          { bottom: "20%", right: "2%", scaleX: 1 },  // 오른쪽 하단 
        ];
        const pos = pokemonPositions[index];
        if (!pos) return null;

        return (
          <div
            key={index}
            className="absolute w-12 h-12"
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
