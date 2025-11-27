"use client";

import Image from "next/image";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
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

  if (!isOpen) return null;

  const shareUrl = SHARE_BASE_URL + publicId;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (e) {
      console.error("링크 복사 실패", e);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
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
          <p className="font-semibold text-[16px] text-black ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {shareUrl}
          </p>
        </div>

        {/* 링크 복사 버튼*/}
        <button className="relative w-full h-[60px] mt-6" onClick={handleCopy}>
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
      </div>
    </div>
  );
}
