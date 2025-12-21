"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import BallHatchImage from "@/assets/images/components/ball-hatch.webp";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

/**
 * SpecialPoketmonHatchModal 
 * - 소셜미디어 버튼을 위한 볼 부화 애니메이션과 루돌프 피카츄 공개 화면을 표시하는 모달
 * - is_read가 false인 편지를 처음 열 때 표시
 * - 볼 부화 애니메이션 2초 후 포켓몬 공개 화면으로 전환
 */

interface SpecialPoketmonHatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

function SpecialPoketmonHatchModalContent({
  onClose,
  onComplete,
}: Omit<SpecialPoketmonHatchModalProps, 'isOpen'>) {
  const { translate } = useTranslation();
  const [showHatchAnimation, setShowHatchAnimation] = useState(true);

  // 볼 부화 애니메이션 후 포켓몬 공개
  useEffect(() => {
    // 2초 후 포켓몬 이미지 표시
    const timer = setTimeout(() => {
      setShowHatchAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!showHatchAnimation) {
    // 포켓몬 공개 화면 표시
    return (
      <BaseModal
        isOpen={true}
        onClose={handleClose}
        contentClassName="bg-black relative flex flex-col items-center justify-center gap-4"
        closeOnOverlayClick={false}
      >
        <p className="text-white text-[20px] font-bold">
          {"운영진"}{translate("letterModal.pokemonReceived")}
        </p>
        <Image
          src={getPokemonImage(80)}
          alt={`Pokemon 80`}
          width={200}
          height={200}
          className="object-contain"
          unoptimized
        />
        <button
          onClick={handleComplete}
          className="relative flex items-center justify-center w-full max-w-[280px] h-14"
        >
          <Image
            src={ButtonLargeGreen}
            alt={translate("letterModal.viewLetter")}
            fill
            className="object-fill"
          />
          <span className="relative z-10 text-black text-xl font-bold">
            {"방문하기"}
          </span>
        </button>
      </BaseModal>
    );
  }

  // 볼 부화 애니메이션 표시
  return (
    <BaseModal
      isOpen={true}
      onClose={handleClose}
      contentClassName="bg-black relative flex items-center justify-center"
      closeOnOverlayClick={false}
    >
      <Image
        src={BallHatchImage}
        alt="볼 부화"
        width={300}
        height={300}
        className="object-contain"
      />
    </BaseModal>
  );
}

export default function SpecialPoketmonHatchModal({
  isOpen,
  onClose,
  onComplete,
}: SpecialPoketmonHatchModalProps) {
  if (!isOpen) return null;

  return (
    <SpecialPoketmonHatchModalContent
      onClose={onClose}
      onComplete={onComplete}
    />
  );
}
