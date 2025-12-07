"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import BackgroundDay from "@/assets/images/background/background.webp";
import BackgroundNight from "@/assets/images/background/background_night.webp";
import TreeDay from "@/assets/images/background/tree.webp";
import TreeNight from "@/assets/images/background/tree_night.png";
import MonsterBallOpen from "@/assets/images/components/monster_ball_open.webp";
import MonsterBallClose from "@/assets/images/components/monster_ball_close.webp";
import LockIcon from "@/assets/icon/lockIcon.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { ChristmasGift } from "./ChristmasGift";
import { Letter } from "../models/res/GetUserTreeResponse";
import { Badge } from "@/features/shared/components/Badge";
import { getTimeOfDay, TimeOfDay } from "@/features/shared/utils/time/getTimeOfDay";

/**
 * Tree 컴포넌트
 * - 배경 이미지와 트리 이미지를 표시
 * - 트리 위에 몬스터볼(편지)을 표시
 * - 획득한 포켓몬을 트리 옆에 표시
 */

interface TreeProps {
  // 획득한 포켓몬 목록
  obtainedPokemons: StaticImageData[];
  // 편지 목록 (is_open 상태 포함)
  letters: Letter[];
  // 현재 페이지
  currentPage: number;
  // 편지 클릭 핸들러
  onLetterClick?: (index: number) => void;
  // 페이지 이동 핸들러
  onPageChange?: (page: number) => void;
  // 마스터 여부
  isMaster?: boolean;
}

export function Tree({
  obtainedPokemons,
  letters,
  currentPage,
  onLetterClick,
  onPageChange,
  isMaster,
}: TreeProps) {
  const { translate } = useTranslation();

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
  const BackgroundImage = timeOfDay === TimeOfDay.NIGHT ? BackgroundNight : BackgroundDay;
  const TreeImage = timeOfDay === TimeOfDay.NIGHT ? TreeNight : TreeDay;

  // 페이지 계산
  const totalMessageCount = letters.length;
  const messagesPerPage = 7;
  const totalPages = Math.ceil(totalMessageCount / messagesPerPage);

  // 현재 페이지에 표시할 편지 개수
  const currentPageMessageCount = Math.min(
    messagesPerPage,
    totalMessageCount - currentPage * messagesPerPage
  );
  return (
    <div className="relative w-full min-h-[500px] overflow-hidden">
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
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <Badge
          size="fixed"
          icon={<Image src={MonsterBallClose} alt="몬스터볼" width={16} height={16} className="object-contain" />}
        >
          {totalMessageCount}{translate("tree.messageCount")}
        </Badge>
        {isMaster && (
          <Badge size="small" icon="⭐" className="bg-black/60">
            {translate("pokedex.masterBadge")}
          </Badge>
        )}
      </div>

      {/* 크리스마스 선물 (우상단) */}
      <ChristmasGift/>

      {/* 트리 이미지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative max-w-[370px] max-h-[500px] w-[90vw] h-[90vh]">
          {/* 트리 이미지 */}
          <div className="relative w-full h-full">
           <Image
            src={TreeImage}
            alt="크리스마스 트리"
            fill
            className="object-contain"
            priority
           />
          </div>


          {/* 트리 위의 몬스터볼(편지) 표시 */}
          {currentPageMessageCount > 0 && (
            <>
              {/* 몬스터볼 위치 - 7개 표시 */}
              {Array.from({ length: currentPageMessageCount }).map((_, index) => {
                // 7개 몬스터볼 위치
                const positions = [
                    { top: "20%", left: "48%", transform: "translateX(-50%)" },  // 꼭대기
                    { top: "30%", left: "58%", transform: "translateX(-50%)" },  // 2층 오른쪽
                    { top: "35%", left: "39%", transform: "translateX(-50%)" },  // 2층 왼쪽
                    { top: "40%", left: "70%", transform: "translateX(-50%)" },  // 3층 오른쪽
                    { top: "50%", left: "32%", transform: "translateX(-50%)" },  // 3층 왼쪽
                    { top: "45%", left: "52%", transform: "translateX(-50%)" },  // 4층 가운데
                    { top: "52%", left: "68%", transform: "translateX(-50%)" },  // 4층 오른쪽
                ];
                const pos = positions[index];
                // 실제 메시지 인덱스 계산 (페이지 * 7 + 현재 인덱스)
                const actualMessageIndex = currentPage * messagesPerPage + index;
                // 해당 편지 데이터
                const letter = letters[actualMessageIndex];

                // 열린 상태 확인: is_read로 몬스터볼 열림 여부 확인
                const isRead = letter?.is_read === "true";
                // 공개 여부 확인: is_open이 false면 자물쇠 표시
                const isPublic = letter?.is_open === "true";

                return (
                  <div
                    key={actualMessageIndex}
                    className="absolute flex flex-col items-center"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: pos.transform,
                    }}
                  >
                    {/* 보낸 사람 이름 */}
                    <div className="mb-0.3 bg-black/70 rounded px-1 py-0.5 whitespace-nowrap flex items-center gap-1">
                      {!isPublic && (
                        <Image
                          src={LockIcon}
                          alt="비공개"
                          width={7}
                          height={7}
                          className="object-contain"
                        />
                      )}
                      <span className="text-white text-xs font-bold">
                        {letter?.sender_name || ""}
                      </span>
                    </div>
                    {/* 몬스터볼 편지 버튼 */}
                    <button
                      onClick={(e) => {
                        // 애니메이션 트리거 - 부모 div에 적용
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.classList.add('pokeball-shake');
                          setTimeout(() => {
                            target.classList.remove('pokeball-shake');
                          }, 400);
                        }
                        // 기존 클릭 핸들러 호출
                        onLetterClick?.(actualMessageIndex);
                      }}
                      className="w-10 h-10 cursor-pointer transition-transform"
                      aria-label={`편지 ${actualMessageIndex + 1}`}
                    >
                      <Image
                        src={isRead ? MonsterBallOpen : MonsterBallClose}
                        alt="몬스터볼"
                        width={43}
                        height={43}
                        className="object-contain"
                      />
                    </button>
                  </div>
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
          { bottom: "67%", left: "6%", scaleX: -1 },  // 왼쪽 상단
          { bottom: "46%", left: "0%", scaleX: -1 },  // 왼쪽 중단
          { bottom: "14%", left: "2%", scaleX: -1 },  // 왼쪽 하단
          { bottom: "57%", right: "2%", scaleX: -1 },  // 오른쪽 상단 *
          { bottom: "27%", left: "80%", scaleX: 1 },  // 오른쪽 중상단
          { bottom: "5%", right: "50%", scaleX: 1 },  // 오른쪽 중하단
          { bottom: "9%", right: "10%", scaleX: -1 },  // 오른쪽 하단
        ];
        const pos = pokemonPositions[index];
        if (!pos) return null;

        return (
          <div
            key={index}
            className="absolute w-22 h-22 cursor-pointer"
            style={{
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              transform: `scaleX(${pos.scaleX})`,
              '--pokemon-scale-x': pos.scaleX,
            } as React.CSSProperties & { '--pokemon-scale-x'?: number }}
            onClick={(e) => {
              const target = e.currentTarget;
              target.classList.add('pokemon-jump');
              // 애니메이션 완료 후 클래스 제거
              setTimeout(() => {
                target.classList.remove('pokemon-jump');
              }, 400);
            }}
          >
            <Image
              src={pokemon}
              alt={`포켓몬 ${index + 1}`}
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        );
      })}

      {/* 페이지 인디케이터 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#8E8E8E]/80 px-4 py-2 rounded-xl">
        <button
          onClick={() => currentPage > 0 && onPageChange?.(currentPage - 1)}
          className="text-white font-bold text-lg hover:opacity-70 transition-opacity"
          aria-label="이전 페이지"
          disabled={totalPages === 0 || currentPage === 0}
        >
          {"<<"}
        </button>
        <span className="text-white font-bold text-sm">
          {currentPage + 1}/{totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={() => currentPage < totalPages - 1 && onPageChange?.(currentPage + 1)}
          className="text-white font-bold text-lg hover:opacity-70 transition-opacity"
          aria-label="다음 페이지"
          disabled={totalPages === 0 || currentPage === totalPages - 1}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
