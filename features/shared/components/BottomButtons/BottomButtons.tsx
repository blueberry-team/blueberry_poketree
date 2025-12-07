"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CrossButton } from "./CrossButton";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import ButtonMediumDark from "@/assets/images/components/button_medium_dark.webp";
import ButtonMediumSkyblue from "@/assets/images/components/button_medium_skyblue.webp";
import { trackButtonClick } from "@/features/shared/utils/analytics/analytics";

interface BottomButtonsProps {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  // 메시지 버튼 관련 props (전달된 callback에 따라 버튼 표시)
  onCheckMessage?: () => void;
  onSendMessage?: () => void;
}

/**
 * 하단 버튼 그룹
 * - 포켓몬도감 버튼과 십자 버튼 포함
 * - Container 내부에서 사용
 */
function BottomButtonsContent({
  onUp,
  onDown,
  onLeft,
  onRight,
  onCheckMessage,
  onSendMessage
}: BottomButtonsProps) {
  const { translate } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicId = searchParams.get('id');

  const handleButtonClick = () => {
    trackButtonClick("button_click_pokedex_view", { public_id: publicId });
    if (publicId) {
      router.push(`/my-pokedex?id=${publicId}`);
    }
  };

  const buttonLabel = translate("pokedex.button");

  return (
    <div className="flex justify-between items-start gap-4">
      {/* 왼쪽: 메시지 버튼 + 도감 버튼 (세로 배치) */}
      <div className="flex flex-col gap-4">
        {/* 메시지 확인 버튼 (onCheckMessage가 전달된 경우) */}
        {onCheckMessage && (
          <button
            onClick={() => {
              trackButtonClick("button_click_check_message");
              onCheckMessage();
            }}
            className="relative flex items-center justify-center w-[46vw] max-w-[180px] h-[14vw] max-h-[56px]"
          >
            <Image
              src={ButtonMediumDark}
              alt={translate("tree.checkMessage")}
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-white font-bold" style={{ fontSize: "clamp(12px, 3.5vw, 16px)" }}>
              {translate("tree.checkMessage")}
            </span>
          </button>
        )}

        {/* 메시지 보내기 버튼 (onSendMessage가 전달된 경우) */}
        {onSendMessage && (
          <button
            onClick={() => {
              trackButtonClick("button_click_send_pocket_message");
              onSendMessage();
            }}
            className="relative flex items-center justify-center w-[46vw] max-w-[180px] h-[14vw] max-h-[56px]"
          >
            <Image
              src={ButtonMediumDark}
              alt="포켓 메시지 보내기"
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-white font-bold" style={{ fontSize: "clamp(12px, 3.5vw, 16px)" }}>
              {translate("visitor.sendPocketMessage")}
            </span>
          </button>
        )}

        {/* 포켓몬도감/자세히보기 버튼 */}
        <button
          onClick={handleButtonClick}
          className="relative flex items-center justify-center w-[46vw] max-w-[180px] h-[14vw] max-h-[56px]"
        >
          <Image
            src={ButtonMediumSkyblue}
            alt={buttonLabel}
            fill
            className="object-fill"
          />
          <span className="relative z-10 text-black font-bold" style={{ fontSize: "clamp(12px, 3.5vw, 16px)" }}>{buttonLabel}</span>
        </button>
      </div>

      {/* 오른쪽: 십자 버튼 */}
      <CrossButton
        onUp={onUp}
        onDown={onDown}
        onLeft={onLeft}
        onRight={onRight}
      />
    </div>
  );
}

export function BottomButtons(props: BottomButtonsProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <button
            className="relative flex items-center justify-center w-[46vw] max-w-[180px] h-[14vw] max-h-[56px]"
          >
            <Image
              src={ButtonMediumSkyblue}
              alt="Loading..."
              fill
              className="object-fill"
            />
          </button>
        </div>
      </div>
    }>
      <BottomButtonsContent {...props} />
    </Suspense>
  );
}
