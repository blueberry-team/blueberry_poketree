"use client";

import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { useTranslation } from "@/features/shared/hooks/useTranslation";

// 내 트리 페이지

export default function MyTreePage() {
  const { t } = useTranslation();
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
    <>
      <h1>{t("tree.title")}</h1>
      <BottomButtons
        onUp={handleUp}
        onDown={handleDown}
        onLeft={handleLeft}
        onRight={handleRight}
      />
    </>
  );
}
