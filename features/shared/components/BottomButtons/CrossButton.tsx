"use client";

import { usePathname } from "next/navigation";

interface CrossButtonProps {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
}

export function CrossButton({
  onUp,
  onDown,
  onLeft,
  onRight,
}: CrossButtonProps) {
  const pathname = usePathname();

  // 특정 페이지에서만 표시
  const isMyTree = pathname === "/my-tree";
  const isMyPoketMessage = pathname === "/my-poket-message";
  const isMyPokedex = pathname?.startsWith("/my-pokedex");

  const shouldShow = isMyTree || isMyPoketMessage || isMyPokedex;

  if (!shouldShow) return null;

  // 크기 계산: 포켓몬도감 버튼 대비 101:70 비율
  // 포켓몬도감 버튼이 70이면, 십자 버튼은 101
  const crossSize = 101; // px

  const armWidth = 38.11; // 각 팔의 너비/높이

  return (
    <div
      className="absolute bottom-8 right-8 z-40"
      style={{ width: `${crossSize}px`, height: `${crossSize}px` }}
    >
      {/* SVG로 십자 모양과 화살표 그리기 */}
      <svg
        width={crossSize}
        height={crossSize}
        viewBox={`0 0 ${crossSize} ${crossSize}`}
        className="absolute inset-0"
      >
        {/* 세로 막대 */}
        <rect
          x={(crossSize - armWidth) / 2}
          y={0}
          width={armWidth}
          height={crossSize}
          fill="black"
          rx={4}
          ry={4}
        />
        {/* 가로 막대 */}
        <rect
          x={0}
          y={(crossSize - armWidth) / 2}
          width={crossSize}
          height={armWidth}
          fill="black"
          rx={4}
          ry={4}
        />

        {/* 상단 화살표 (위쪽 방향) ^^ */}
        <g transform={`translate(${crossSize / 2}, 12)`}>
          <polyline
            points="-7,7 0,0 7,7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="-7,14 0,7 7,14"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 하단 화살표 (아래쪽 방향) vv */}
        <g transform={`translate(${crossSize / 2}, ${crossSize - 12})`}>
          <polyline
            points="-7,-7 0,0 7,-7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="-7,-14 0,-7 7,-14"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 좌측 화살표 (왼쪽 방향) << */}
        <g transform={`translate(12, ${crossSize / 2})`}>
          <polyline
            points="7,-7 0,0 7,7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14,-7 7,0 14,7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 우측 화살표 (오른쪽 방향) >> */}
        <g transform={`translate(${crossSize - 12}, ${crossSize / 2})`}>
          <polyline
            points="-7,-7 0,0 -7,7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="-14,-7 -7,0 -14,7"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* 투명한 버튼 영역들 */}
      <div className="relative w-full h-full">
        {/* 상단 */}
        <button
          onClick={onUp}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{ width: `${armWidth}px`, height: `${armWidth}px` }}
          aria-label="위"
        />

        {/* 하단 */}
        <button
          onClick={onDown}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          style={{ width: `${armWidth}px`, height: `${armWidth}px` }}
          aria-label="아래"
        />

        {/* 좌측 */}
        <button
          onClick={onLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          style={{ width: `${armWidth}px`, height: `${armWidth}px` }}
          aria-label="왼쪽"
        />

        {/* 우측 */}
        <button
          onClick={onRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ width: `${armWidth}px`, height: `${armWidth}px` }}
          aria-label="오른쪽"
        />
      </div>
    </div>
  );
}
