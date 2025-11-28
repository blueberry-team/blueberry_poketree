"use client";

import Image from "next/image";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * - 몬스터볼(편지) 클릭 시 표시
 * - 보낸 사람, 포켓몬 이미지, 편지 내용 표시
 */

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 편지 정보
  letterIndex: number;
  letterContent: string;
  senderName: string;
  pokemonIndex: number;
  letterId?: string;
}

export default function LetterModal({
  isOpen,
  onClose,
  letterIndex,
  letterContent,
  senderName,
  pokemonIndex,
  letterId,
}: LetterModalProps) {
  const { translate } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[320px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black">
            {translate("message.title")} #{letterIndex + 1}
          </h2>
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 포켓몬 이미지 */}
        <div className="flex justify-center mb-4">
          <Image
            src={getPokemonImage(pokemonIndex)}
            alt={`Pokemon ${pokemonIndex}`}
            width={80}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>

        {/* 보낸 사람 */}
        <p className="text-center text-gray-600 text-sm mb-3">
          From: {senderName}
        </p>

        {/* 편지 내용 */}
        <div className="bg-gray-50 rounded-lg p-4 min-h-[150px]">
          <p className="text-black text-sm whitespace-pre-wrap">
            {letterContent}
          </p>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-[#FF7373] text-white rounded-lg font-bold"
        >
          {translate("common.confirm")}
        </button>
      </div>
    </div>
  );
}
