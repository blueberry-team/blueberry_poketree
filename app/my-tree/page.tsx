"use client";

import { PageLayout } from "@/features/shared/components/Layout/PageLayout";
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
    <PageLayout
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
    >
      <h1>{t("tree.title")}</h1>
    </PageLayout>
  );
}
