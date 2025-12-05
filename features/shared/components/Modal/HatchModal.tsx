"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import BallHatchImage from "@/assets/images/components/ball-hatch.webp";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

/**
 * HatchModal - 볼 부화 애니메이션과 포켓몬 공개 화면을 표시하는 모달
 * - is_read가 false인 편지를 처음 열 때 표시
 * - 볼 부화 애니메이션 2초 후 포켓몬 공개 화면으로 전환
 */

interface HatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  senderName: string;
  pokemonId: number;
}

function HatchModalContent({
  onClose,
  onComplete,
  senderName,
  pokemonId,
}: Omit<HatchModalProps, 'isOpen'>) {
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
    onComplete();
  };

  if (!showHatchAnimation) {
    // 포켓몬 공개 화면 표시
    return (
      <BaseModal
        isOpen={true}
        onClose={handleClose}
        contentClassName="bg-black rounded-lg w-[352px] max-w-[90vw] relative flex flex-col items-center justify-center gap-6 sm:gap-8 py-8 sm:py-12 px-4 sm:px-8"
        closeOnOverlayClick={false}
      >
        <p className="text-white text-2xl font-bold">
          {senderName}{translate("letterModal.pokemonReceived")}
        </p>
        <Image
          src={getPokemonImage(pokemonId)}
          alt={`Pokemon ${pokemonId}`}
          width={200}
          height={200}
          className="object-contain"
          unoptimized
        />
        <button
          onClick={onClose}
          className="relative flex items-center justify-center"
          style={{ width: "300px", height: "56px" }}
        >
          <Image
            src={ButtonLargeGreen}
            alt={translate("letterModal.viewLetter")}
            fill
            className="object-fill"
          />
          <span className="relative z-10 text-black text-xl font-bold">
            {translate("letterModal.viewLetter")}
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
      contentClassName="bg-black rounded-lg w-[352px] max-w-[90vw] relative flex items-center justify-center py-8 sm:py-12 px-4 sm:px-8"
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

export default function HatchModal({
  isOpen,
  onClose,
  onComplete,
  senderName,
  pokemonId,
}: HatchModalProps) {
  if (!isOpen) return null;

  return (
    <HatchModalContent
      onClose={onClose}
      onComplete={onComplete}
      senderName={senderName}
      pokemonId={pokemonId}
    />
  );
}
