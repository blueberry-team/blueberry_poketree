"use client";

import Image from "next/image";
import CloseIcon from "@/assets/icon/closeIcon.png";

/**
 * BaseModal - 모든 모달의 기본 구조를 제공하는 컴포넌트
 * - 전체 오버레이 레이어
 * - 우상단 닫기 버튼 (모달 외부)
 * - 내부 컨텐츠는 children으로 전달
 */

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // 모달 컨텐츠 컨테이너의 커스텀 클래스
  contentClassName?: string;
  // 오버레이 클릭 시 닫기 여부 (기본값: true)
  closeOnOverlayClick?: boolean;
}

export function BaseModal({
  isOpen,
  onClose,
  children,
  contentClassName = "",
  closeOnOverlayClick = true,
}: BaseModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      {/* 모달 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥 우측 상단 */}
        <button
          onClick={onClose}
          className="absolute bottom-[calc(100%+15px)] right-0 w-8 h-8 bg-black rounded flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-10"
          aria-label="닫기"
        >
          <Image
            src={CloseIcon}
            alt="닫기"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>

        {/* 모달 내용 */}
        <div
          className={contentClassName}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
