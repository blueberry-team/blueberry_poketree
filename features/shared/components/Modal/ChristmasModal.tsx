"use client";

import { useState } from "react";
import Image from "next/image";
import { BaseModal } from "./BaseModal";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import DoctorOhSanta from "@/assets/images/components/doctor_oh_santa.webp";
import { getPokemonImage } from "../../data/pokemonData";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

interface ChristmasModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

function ChristmasModalContent({ onComplete }: Omit<ChristmasModalProps, 'isOpen'>) {
  const { translate } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleClose = () => {
    onComplete();
  };

  // 첫 번째 단계
  if (step === 1) {
    return (
      <BaseModal
        isOpen={true}
        onClose={handleClose}
        contentClassName="bg-black"
        closeOnOverlayClick={false}
      >
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <h1 className="text-white text-2xl font-bold text-center">
            {translate("christmasModal.step1Title")}
          </h1>
          <Image
            src={DoctorOhSanta}
            alt="산타 닥터오"
            width={162}
            height={162}
            className="object-contain"
          />
          
          <button
            onClick={handleNext}
            className="relative flex items-center justify-center w-full max-w-[280px] h-14"
          >
            <Image
              src={ButtonLargeGreen}
              alt={translate("christmasModal.step1Button")}
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-black text-xl font-bold">
              {translate("christmasModal.step1Button")}
            </span>
          </button>
        </div>
      </BaseModal>
    );
  }

  // 두 번째 단계
  if (step === 2) {
    return (
      <BaseModal
        isOpen={true}
        onClose={handleClose}
        contentClassName="bg-black"
        closeOnOverlayClick={false}
      >
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <h1 className="text-white text-2xl font-bold text-center">
            {translate("christmasModal.step2Title")}
          </h1>
          <Image
            src={getPokemonImage(81)}
            alt="메타몽"
            width={162}
            height={162}
            className="object-contain"
          />
          
          <button
            onClick={handleNext}
            className="relative flex items-center justify-center w-full max-w-[280px] h-14"
          >
            <Image
              src={ButtonLargeGreen}
              alt={translate("christmasModal.step2Button")}
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-black text-xl font-bold">
              {translate("christmasModal.step2Button")}
            </span>
          </button>
        </div>
      </BaseModal>
    );
  }

  // 세 번째 단계 (마지막) - 편지 모달 스타일
  return (
    <BaseModal
      isOpen={true}
      onClose={handleClose}
      contentClassName="bg-black relative overflow-hidden"
      closeOnOverlayClick={false}
    >
      <div className="flex flex-col">
        {/* 헤더: 포켓몬 이미지와 제목 */}
        <div className="flex items-center gap-6 mb-6 pt-4">
          <Image
            src={getPokemonImage(81)}
            alt="산타 메타몽"
            width={48}
            height={48}
            className="object-contain"
            unoptimized
          />
          <h2 className="text-white text-[20px] font-bold">
            {translate("christmasModal.step3Title")}
          </h2>
        </div>

        {/* 메시지 내용 */}
        <div className="bg-white rounded-lg px-4 py-5 min-h-[320px] mb-6 max-h-[400px] overflow-y-auto">
          <p className="text-black text-lg whitespace-pre-wrap leading-relaxed">
            {translate("christmasModal.step3Content")}
          </p>
        </div>
      </div>
    </BaseModal>
  );
}

export function ChristmasModal({ isOpen, onComplete }: ChristmasModalProps) {
  if (!isOpen) return null;

  return (
    <ChristmasModalContent onComplete={onComplete} />
  );
}