"use client";

import { PageLayout } from "@/features/shared/components/Layout/PageLayout";
import { useTranslation } from "@/features/shared/hooks/useTranslation";

// 내 포켓 메시지 페이지
export default function MyPoketMessagePage() {
  const { t } = useTranslation();
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
    <PageLayout
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
    >
      <h1>{t("message.title")}</h1>
    </PageLayout>
  );
}
