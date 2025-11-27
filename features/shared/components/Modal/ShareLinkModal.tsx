"use client";

import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

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
        <h2 className="whitespace-pre-line text-lg font-bold text-center text-black">
          {translate("share.title")}
        </h2>

        {/* 링크 내용 */}

        {/* 링크 복사 버튼*/}
      </div>
    </div>
  );
}
