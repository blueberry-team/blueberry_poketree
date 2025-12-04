"use client";

import Image from "next/image";
import CloseIcon from "@/assets/icon/closeIcon.png";
import { ErrorCode, ERROR_MESSAGE_MAP } from "@/features/shared/types/errorTypes";

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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4"
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
          <Image
            src={CloseIcon}
            alt="닫기"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>

        <div
          className="bg-black rounded-2xl w-full max-w-[500px] p-8"
          onClick={(e) => e.stopPropagation()}
        >
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
      </div>
    </div>
  );
}
