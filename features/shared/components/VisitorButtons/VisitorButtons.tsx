"use client";

import Image from "next/image";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import ButtonBigGreen from "@/assets/images/components/button_big_green.png";
import ButtonMediumSky from "@/assets/images/components/button_medium_skyblue.png";

interface VisitorButtonsProps {
  onSendMessage: () => void;
  onMakeTree: () => void;
}

/*
 *  방문자 버튼 그룹
 *  - 메시지 작성하기 버튼
 *  - 내 포케트리 만들러 가기 버튼
 */
export function VisitorButtons({
  onSendMessage,
  onMakeTree,
}: VisitorButtonsProps) {
  const { translate } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 w-fill h-fill">
      {/* 메시지 작성하기 버튼 (클릭시 메시지 작성으로 이동) */}
      <div className="shrink-0 w-fill h-fill">
        <button
          className="relative w-[344px] h-[96px] mt-2"
          onClick={() => onSendMessage()}
        >
          <Image
            src={ButtonBigGreen}
            alt={translate("visitor.makeMessage")}
            fill
            unoptimized
            className="object-fill"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-[32px] text-black">
              {translate("visitor.makeMessage")}
            </span>
          </span>
        </button>
      </div>
      {/* 내 포케트리 만들러 가기 버튼 (클릭시 포케트리 만들기로 이동) */}
      <div className="shrink-0 w-fill h-fill mt-6">
        <button
          className="relative w-[193px] h-[56px]"
          onClick={() => onMakeTree()}
        >
          <Image
            src={ButtonMediumSky}
            alt={translate("visitor.makeTree")}
            fill
            unoptimized
            className="object-fill"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="font-semibold text-[16px] text-black">
              {translate("visitor.makeTree")}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
