"use client";

import Image from "next/image";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import ShareIcon from "@/assets/icon/shareIcon.svg";

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
        <h2 className="whitespace-pre-line text-lg font-bold text-black">
          {translate("share.title")}
        </h2>

        {/* 링크 내용 */}
        <div className="px-4 py-4 rounded transition-all flex bg-[#f5f5f5] items-center">
          <Image src={ShareIcon} alt="ShareIcon" width={24} height={24} />
          <p className="font-semibold text-[16px] text-black ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {"https://poketree.com/" + publicId}
          </p>
        </div>

        {/* 링크 복사 버튼*/}
      </div>
    </div>
  );
}
