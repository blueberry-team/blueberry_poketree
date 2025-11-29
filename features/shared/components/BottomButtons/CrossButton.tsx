"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ControlButton from "@/assets/images/components/control_button.png";

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

  const crossWidth = 130; // px
  const crossHeight = 128; // px
  const armWidth = 45; // 각 팔의 클릭 영역

  return (
    <div
      className="relative z-40"
      style={{ width: `${crossWidth}px`, height: `${crossHeight}px` }}
    >
      {/* 십자버튼 이미지 */}
      <Image
        src={ControlButton}
        alt="컨트롤 버튼"
        fill
        className="object-contain"
      />

      {/* 투명한 버튼 영역들 */}
      <div className="absolute inset-0">
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
