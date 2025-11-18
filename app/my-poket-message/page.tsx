"use client";

import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";

// 내 포켓 메시지 페이지
export default function MyPoketMessagePage() {
  const handleUp = () => {
    console.log("이전 메시지");
  };

  const handleDown = () => {
    console.log("다음 메시지");
  };

  const handleLeft = () => {
    console.log("메시지 보관");
  };

  const handleRight = () => {
    console.log("메시지 삭제");
  };

  return (
    <BottomButtons
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
    >
      <h1>My Poket Message</h1>
    </BottomButtons>
  );
}
