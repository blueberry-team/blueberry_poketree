"use client";

import Image from "next/image";
import CloseIcon from "@/assets/icon/closeIcon.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

interface SignupOrGoErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}

/**
 * SignupOrGoErrorModal - 로그인/회원가입 에러 모달
 * @param isOpen - 모달 열림 여부
 * @param onClose - 모달 닫기 함수
 * @param isLogin - 로그인 모드 여부 (true: 비밀번호 틀림, false: 이미 존재하는 계정)
 */
export default function SignupOrGoErrorModal({
  isOpen,
  onClose,
  isLogin,
}: SignupOrGoErrorModalProps) {
  const { translate } = useTranslation();

  if (!isOpen) return null;

  const message = isLogin
    ? translate("auth.wrongPassword")
    : translate("auth.accountExists");

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4"
      onClick={onClose}
    >
      <div className="relative">
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
          <div className="text-white text-xl font-medium text-center mb-8 whitespace-pre-line min-h-[100px] flex items-center justify-center">
            {message}
          </div>

          <button
            onClick={onClose}
            className="w-full h-14 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            {translate("common.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
