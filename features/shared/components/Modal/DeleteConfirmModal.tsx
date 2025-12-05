"use client";

import Image from "next/image";
import ButtonLetterDelete from "@/assets/images/components/button_letter_delete.png";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="bg-black rounded-2xl w-full max-w-[500px] p-8"
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
    </BaseModal>
  );
}
