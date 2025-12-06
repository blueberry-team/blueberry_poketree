"use client";

import Image, { StaticImageData } from "next/image";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import MonsterBallFullyOpen from "@/assets/images/components/monster_ball_fully_open.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

/**
 * SendLetterCompleteModal - 편지가 전달되고 편지를 전달한 유저에게 보여지는 모달
 * 포켓몬 정보
 */

interface SendLetterCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  reveicerName: string;
  receivedPokemon: StaticImageData;
}

export default function SendLetterCompleteModal({
  isOpen,
  onClose,
  reveicerName,
  receivedPokemon,
}: SendLetterCompleteModalProps) {
  const { translate } = useTranslation();

  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="bg-black"
    >
          <div className="flex flex-col items-center justify-center flex-1">
            {/* 제목 (~~님께 포켓 메시지를 보냈습니다) */}
            <h2 className="whitespace-pre-line text-lg font-bold text-center text-white pt-4 pb-3 text-[24px]">
              {translate("sendCompleteModal.title").replace(
                "{name}",
                reveicerName
              )}
            </h2>

            <div className="relative w-full flex justify-center items-center">
            {/* 포켓몬 이미지 */}
            <Image
              src={receivedPokemon}
              alt="포켓몬"
              width={130}
              height={150}
              unoptimized
              className="object-contain"
            />

            {/* 몬스터볼 */}
            <Image
              src={MonsterBallFullyOpen}
              alt="몬스터볼"
              width={37}
              height={42.29}
              className="absolute -bottom-1 right-[30%] object-contain mb-1"
            />
          </div>

          {/* 확인 버튼 */}
          <button onClick={onClose} className="relative w-full h-[60px] mt-6 pb-4">
            <Image
              src={ButtonLargeGreen}
              alt={translate("common.confirm")}
              fill
              unoptimized
              className="object-fill"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="font-semibold text-[20px] text-black">
                {translate("common.confirm")}
              </span>
            </span>
          </button>
          </div>
    </BaseModal>
  );
}
