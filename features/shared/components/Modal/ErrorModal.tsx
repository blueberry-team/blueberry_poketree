"use client";

import { ErrorCode, ERROR_MESSAGE_MAP } from "@/features/shared/types/errorTypes";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorCode: ErrorCode;
  customMessage?: string;
  confirmText?: string;
}

/**
 * ErrorModal - 서버 에러를 모달로 표시
 * @param isOpen - 모달 열림 여부
 * @param onClose - 모달 닫기 함수
 * @param errorCode - 에러 코드
 * @param customMessage - 커스텀 메시지 (선택사항)
 * @param confirmText - 확인 버튼 텍스트 (기본값: "확인")
 */
export default function ErrorModal({
  isOpen,
  onClose,
  errorCode,
  customMessage,
  confirmText = "확인",
}: ErrorModalProps) {
  if (!isOpen) return null;

  const message = customMessage || ERROR_MESSAGE_MAP[errorCode];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="bg-black"
    >
          <div className="flex flex-col items-center justify-center flex-1">
            {/* 에러 메시지 */}
            <div className="text-white text-xl font-medium text-center mb-8 whitespace-pre-line min-h-[100px] flex items-center justify-center">
              {message}
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className="w-full h-14 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              {confirmText}
            </button>
          </div>
    </BaseModal>
  );
}
