"use client";

import { useState } from "react";
import Image from "next/image";
import { BaseModal } from "./BaseModal";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import DoctorOhSanta from "@/assets/images/components/doctor_oh_santa.webp";
import { getPokemonImage } from "../../data/pokemonData";

interface ChristmasModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

function ChristmasModalContent({ onComplete }: Omit<ChristmasModalProps, 'isOpen'>) {
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
            크리스마스를 맞이해서 선물을 준비했다네
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
              alt="다음"
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-black text-xl font-bold">
              선물 확인하기
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
            오박사의 산타 메타몽 획득!
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
              alt="다음"
              fill
              className="object-fill"
            />
            <span className="relative z-10 text-black text-xl font-bold">
              메세지 확인하기
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
            오박사 님의 포켓 메세지
          </h2>
        </div>

        {/* 메시지 내용 */}
        <div className="bg-white rounded-lg px-4 py-5 min-h-[320px] mb-6 max-h-[400px] overflow-y-auto">
          <p className="text-black text-lg whitespace-pre-wrap leading-relaxed">
            메리 크리스마스!
            {"\n\n"}
            오늘은 특별한 날이니, 너에게도 특별한 포켓몬을 맡기려 하네.
            {"\n\n"}
            산타 메타몽이 자신을 맡아 줄 새로운 트레이너를 찾고 있다더군!
            {"\n\n"}
            그 대상이 바로 너라는 사실이 참으로 놀랍지 않니?
            {"\n\n"}
            이 포켓몬과 함께 멋진 크리스마스를 보내길 바란다네!
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