"use client";

import Image from "next/image";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { useState, useEffect } from "react";
import ShareIcon from "@/assets/icon/shareIcon.svg";
import ButtonBigGreen from "@/assets/images/components/button_big_green.png";

// 공유 베이스 url
const SHARE_BASE_URL = "https://poketree.com/";

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 포케트리 id
  publicId: string;
}

export function ShareLinkModel({
  isOpen,
  onClose,
  publicId,
}: ShareLinkModalProps) {
  const { translate } = useTranslation();
  // 복사 상태 관리
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  // 링크 복사 성공이든 실패든 2초 후에는 안내 메시지가 종료되도록 설정
  useEffect(() => {
    if (copyStatus === "idle") return;

    const timer = setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);

    return () => clearTimeout(timer);
  }, [copyStatus]);
  // 공유 URL
  const shareUrl = SHARE_BASE_URL + publicId;

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("success");
    } catch (e) {
      console.error("링크 복사 실패", e);
      setCopyStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥 우측 상단 */}
        <button
          onClick={onClose}
          className="absolute bottom-[calc(100%+15px)] right-0 w-8 h-8 bg-black rounded flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-10"
          aria-label="닫기"
        >
          <span className="text-white font-bold text-xl">×</span>
        </button>

        <div
          className="bg-white rounded-lg p-6 w-[320px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 헤더 */}
          <h2 className="whitespace-pre-line text-lg font-bold text-center text-black pb-4">
            {translate("share.title")}
          </h2>

          {/* 링크 내용 */}
          <div className="px-4 py-4 rounded transition-all flex bg-[#f5f5f5] items-center">
            <Image src={ShareIcon} alt="ShareIcon" width={24} height={24} />
            <p className="font-[system-ui] font-semibold text-[16px] text-black ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {shareUrl}
            </p>
          </div>

          {/* 링크 복사 버튼*/}
          <button
            className="relative w-full h-[60px] mt-6"
            onClick={handleCopy}
          >
            <Image
              src={ButtonBigGreen}
              alt={translate("share.copy")}
              fill
              unoptimized
              className="object-fill"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="font-semibold text-[20px] text-black">
                {translate("share.copy")}
              </span>
            </span>
          </button>

          {/* 안내 메시지 */}
          {copyStatus !== "idle" && (
            <div className="fixed bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-sm rounded-lg shadow-lg">
              {copyStatus === "success"
                ? translate("share.copySuccess")
                : translate("share.copyError")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
