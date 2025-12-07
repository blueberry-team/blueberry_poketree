"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BackgroundDay from "@/assets/images/background/background.webp";
import BackgroundNight from "@/assets/images/background/background_night.webp";
import TreeDay from "@/assets/images/background/tree.webp";
import TreeNight from "@/assets/images/background/tree_night.png";
import MonsterBallClose from "@/assets/images/components/monster_ball_close.webp";
import { ALL_POKEMON_IMAGES } from "@/features/shared/data/pokemonData";
import { getTimeOfDay, TimeOfDay } from "@/features/shared/utils/time/getTimeOfDay";
import { ChristmasGift } from "@/features/my-tree/components/ChristmasGift";

/**
 * LandingTree 컴포넌트
 * - 랜딩 페이지용 정적 트리
 * - 배경 이미지와 트리 이미지를 표시
 * - 트리 위에 몬스터볼(편지)을 표시 (인터랙션 없음)
 * - 획득한 포켓몬을 트리 옆에 표시
 */

// 랜딩 페이지에 표시할 포켓몬 인덱스 (0-80 범위, 원하는 포켓몬 번호 선택)
const DISPLAYED_POKEMON_INDICES = [3, 33, 23, 10, 2, 68, 67];

export function LandingTree() {
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

  // 선택된 포켓몬 이미지
  const displayedPokemons = DISPLAYED_POKEMON_INDICES.map(index => ALL_POKEMON_IMAGES[index]);

  // 7개의 편지 표시
  const displayMessageCount = 7;

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

          {/* 트리 위의 몬스터볼(편지) 표시 - 정적, 인터랙션 없음 */}
          {Array.from({ length: displayMessageCount }).map((_, index) => {
            // 7개 몬스터볼 위치
            const positions = [
              { top: "22%", left: "48%", transform: "translateX(-50%)" },  // 꼭대기
              { top: "32%", left: "58%", transform: "translateX(-50%)" },  // 2층 오른쪽
              { top: "37%", left: "39%", transform: "translateX(-50%)" },  // 2층 왼쪽
              { top: "42%", left: "70%", transform: "translateX(-50%)" },  // 3층 오른쪽
              { top: "52%", left: "32%", transform: "translateX(-50%)" },  // 3층 왼쪽
              { top: "47%", left: "52%", transform: "translateX(-50%)" },  // 4층 가운데
              { top: "55%", left: "68%", transform: "translateX(-50%)" },  // 4층 오른쪽
            ];
            const pos = positions[index];

            return (
              // 몬스터볼
              <div
                key={index}
                className="absolute w-10 h-10 cursor-pointer"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: pos.transform,
                }}
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.classList.add('pokeball-shake');
                  // 애니메이션 완료 후 클래스 제거
                  setTimeout(() => {
                    target.classList.remove('pokeball-shake');
                  }, 400);
                }}
              >
                <Image
                  src={MonsterBallClose}
                  alt="몬스터볼"
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 획득한 포켓몬 표시 */}
      {displayedPokemons.map((pokemon, index) => {
        // 7마리 포켓몬 위치
        const pokemonPositions = [
            { bottom: "67%", left: "6%", scaleX: 1 },  // 왼쪽 상단
            { bottom: "46%", left: "0%", scaleX: 1 },  // 왼쪽 중단
            { bottom: "14%", left: "2%", scaleX: 1 },  // 왼쪽 하단
            { bottom: "57%", right: "2%", scaleX: 1 },  // 오른쪽 상단 *
            { bottom: "27%", left: "80%", scaleX: 1 },  // 오른쪽 중상단
            { bottom: "5%", right: "50%", scaleX: 1 },  // 오른쪽 중하단
            { bottom: "9%", right: "10%", scaleX: 1 },  // 오른쪽 하단
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
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
