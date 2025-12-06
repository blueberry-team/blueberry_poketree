"use client";

import { useState } from "react";

// 눈 설정 상수
const SNOW_COUNT = 20; // 화면에 존재하는 눈송이 개수
const LEFT_SWINGS = 2; // 왼쪽으로 흔들리는 횟수
const RIGHT_SWINGS = 2; // 오른쪽으로 흔들리는 횟수
const STEP_INTERVAL = 1; // 각 스텝당 지속 시간

// 애니메이션 계산
const TOTAL_SWINGS = LEFT_SWINGS + RIGHT_SWINGS;
const TOTAL_STEPS = TOTAL_SWINGS * 2; // 좌우 흔들림 단계
const BASE_ANIMATION_DURATION = TOTAL_STEPS * STEP_INTERVAL; // 전체 애니메이션 시간

interface Snowflake {
  id: number;
  left: number; // 시작 위치
  animationDuration: number; // 애니메이션 지속 시간
  animationDelay: number; // 애니메이션 지연 시간
  size: number; // 눈송이 크기
}

// Snow - 눈 내리는 효과
export function Snow() {
  // 눈송이 생성 (useState 초기값으로 함수 전달하여 최초 1회만 실행)
  const [snowflakes] = useState<Snowflake[]>(() =>
    Array.from({ length: SNOW_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: BASE_ANIMATION_DURATION + Math.random() * 20,
      animationDelay: Math.random() * 15, // 0-15초 랜덤 지연
      size: 5 + Math.random() * 5, // 5 ~ 10px 랜덤 크기
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={
            {
              left: `${flake.left}%`,
              top: "-50px",
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
              "--swing-distance": "30px",
            } as React.CSSProperties & { "--swing-distance": string }
          }
        >
          <div
            style={{
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              backgroundColor: "white",
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
          }
          /* 첫 번째 왼쪽 흔들림 */
          12.5% {
            transform: translateY(12.5vh) translateX(calc(-1 * var(--swing-distance)));
          }
          /* 두 번째 왼쪽 흔들림 */
          25% {
            transform: translateY(25vh) translateX(calc(-2 * var(--swing-distance)));
          }
          /* 첫 번째 오른쪽 흔들림 */
          37.5% {
            transform: translateY(37.5vh) translateX(calc(-1 * var(--swing-distance)));
          }
          /* 두 번째 오른쪽 흔들림 */
          50% {
            transform: translateY(50vh) translateX(0);
          }
          /* 세 번째 왼쪽 흔들림 */
          62.5% {
            transform: translateY(62.5vh) translateX(var(--swing-distance));
          }
          /* 네 번째 왼쪽 흔들림 */
          75% {
            transform: translateY(75vh) translateX(calc(2 * var(--swing-distance)));
          }
          /* 세 번째 오른쪽 흔들림 */
          87.5% {
            transform: translateY(87.5vh) translateX(var(--swing-distance));
          }
          /* 네 번째 오른쪽 흔들림 */
          100% {
            transform: translateY(100vh) translateX(0);
          }
        }

        .snowflake {
          animation: snowfall steps(${TOTAL_STEPS}) infinite;
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}
