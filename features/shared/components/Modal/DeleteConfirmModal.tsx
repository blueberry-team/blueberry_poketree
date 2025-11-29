"use client";

import Image from "next/image";
import CloseIcon from "@/assets/icon/closeIcon.png";
import ButtonLetterDelete from "@/assets/images/components/button_letter_delete.png";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

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
          {/* 제목 */}
          <h2 className="text-white text-2xl font-bold text-center mb-8 whitespace-pre-line">
            {title}
          </h2>

          {/* 확인 버튼 */}
          <div
            className="relative cursor-pointer flex items-center justify-center"
            onClick={onConfirm}
          >
            <Image
              src={ButtonLetterDelete}
              alt="확인"
              width={400}
              height={80}
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-black font-bold text-center text-lg">
                {confirmText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
