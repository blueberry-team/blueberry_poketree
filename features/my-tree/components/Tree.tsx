"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import BackgroundImage from "@/assets/images/background/background.png";
import TreeImage from "@/assets/images/background/tree.png";
import MonsterBallOpen from "@/assets/images/components/monster_ball_open.png";
import MonsterBallClose from "@/assets/images/components/monster_ball_close.png";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

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
  // 페이지 이동 핸들러
  onPageChange?: (page: number) => void;
}

export function Tree({
  obtainedPokemons,
  totalMessageCount,
  currentPage,
  onLetterClick,
  openedLetterIndex = -1,
  onPageChange,
}: TreeProps) {
  const { translate } = useTranslation();
  // 호버 상태 관리
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  // 페이지 계산
  const messagesPerPage = 7;
  const totalPages = Math.ceil(totalMessageCount / messagesPerPage);
  // 현재 페이지에 표시할 편지 개수
  const currentPageMessageCount = Math.min(
    messagesPerPage,
    totalMessageCount - currentPage * messagesPerPage
  );
  return (
    <div className="relative w-full h-[70vh] min-h-[500px]">
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

      {/* 메시지 획득 개수 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2">
          <Image
            src={MonsterBallClose}
            alt="몬스터볼"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-white text-sm font-bold">
            {totalMessageCount}{translate("tree.messageCount")}
          </span>
        </div>
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
              {/* 몬스터볼 위치 - 7개 표시 */}
              {Array.from({ length: currentPageMessageCount }).map((_, index) => {
                // 7개 몬스터볼 위치
                const positions = [
                  { top: "20%", left: "50%", transform: "translateX(-50%)" },  // 꼭대기
                  { top: "30%", left: "60%", transform: "translateX(-50%)" },  // 2층 오른쪽
                  { top: "35%", left: "41%", transform: "translateX(-50%)" },  // 2층 왼쪽
                  { top: "40%", left: "72%", transform: "translateX(-50%)" },  // 3층 오른쪽
                  { top: "50%", left: "34%", transform: "translateX(-50%)" },  // 3층 왼쪽
                  { top: "45%", left: "54%", transform: "translateX(-50%)" },  // 4층 가운데
                  { top: "52%", left: "70%", transform: "translateX(-50%)" },  // 4층 오른쪽
                ];
                const pos = positions[index];
                // 실제 메시지 인덱스 계산 (페이지 * 7 + 현재 인덱스)
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
                    className="absolute w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
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
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* 획득한 포켓몬 7마리 표시 */}
      {obtainedPokemons.map((pokemon, index) => {
        // 7마리 포켓몬 위치
        const pokemonPositions = [
          { bottom: "70%", left: "10%", scaleX: -1 },  // 왼쪽 상단
          { bottom: "52%", left: "1%", scaleX: -1 },  // 왼쪽 중단
          { bottom: "20%", left: "2%", scaleX: -1 },  // 왼쪽 하단
          { bottom: "60%", right: "0%", scaleX: 1 },  // 오른쪽 상단
          { bottom: "25%", left: "80%", scaleX: 1 },  // 오른쪽 중상단
          { bottom: "8%", right: "45%", scaleX: 1 },  // 오른쪽 중하단
          { bottom: "8%", right: "10%", scaleX: 1 },  // 오른쪽 하단
        ];
        const pos = pokemonPositions[index];
        if (!pos) return null;

        return (
          <div
            key={index}
            className="absolute w-22 h-22"
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
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        );
      })}

      {/* 페이지 인디케이터 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#8E8E8E]/80 px-4 py-2 rounded-xl">
        <button
          onClick={() => onPageChange?.(currentPage > 0 ? currentPage - 1 : totalPages - 1)}
          className="text-white font-bold text-lg hover:opacity-70 transition-opacity"
          aria-label="이전 페이지"
        >
          {"<<"}
        </button>
        <span className="text-white font-bold text-sm">
          {currentPage + 1}/{totalPages}
        </span>
        <button
          onClick={() => onPageChange?.(currentPage < totalPages - 1 ? currentPage + 1 : 0)}
          className="text-white font-bold text-lg hover:opacity-70 transition-opacity"
          aria-label="다음 페이지"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
