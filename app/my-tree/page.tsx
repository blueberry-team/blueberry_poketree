"use client";

import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";

// 내 트리 페이지
export default function MyTreePage() {
  const handleUp = () => {
    console.log("트리 확대");
  };

  const handleDown = () => {
    console.log("트리 축소");
  };

  const handleLeft = () => {
    console.log("이전 트리");
  };

  const handleRight = () => {
    console.log("다음 트리");
  };

  return (
    <BottomButtons
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
    >
      <h1>My Tree</h1>
    </BottomButtons>
  );
}
