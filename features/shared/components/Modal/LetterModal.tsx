"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import { getLetter } from "@/features/my-tree/usecases/getLetter";
import { LetterData } from "@/features/my-tree/models/res/GetLetterResponse";

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * - 몬스터볼(편지) 클릭 시 표시
 * - 보낸 사람, 포켓몬 이미지, 편지 내용 표시
 */

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterId: string | null;
  letterIndex: number;
}

export default function LetterModal({
  isOpen,
  onClose,
  letterId,
  letterIndex,
}: LetterModalProps) {
  const { translate } = useTranslation();
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 편지 데이터 가져오기
  useEffect(() => {
    if (!isOpen || !letterId) return;

    const fetchLetter = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getLetter({ letterId });

        if (response.message === "success" && response.data) {
          setLetterData(response.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("편지를 불러올 수 없습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetter();
  }, [isOpen, letterId]);

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

        {/* 로딩 중 */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        )}

        {/* 에러 */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <p className="text-red-500">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              닫기
            </button>
          </div>
        )}

        {/* 편지 데이터 표시 */}
        {letterData && !isLoading && !error && (
          <>
            {/* 포켓몬 이미지 */}
            <div className="flex justify-center mb-4">
              <Image
                src={getPokemonImage(letterData.letter_pokemon)}
                alt={`Pokemon ${letterData.letter_pokemon}`}
                width={80}
                height={80}
                className="object-contain"
                unoptimized
              />
            </div>

            {/* 보낸 사람 */}
            <p className="text-center text-gray-600 text-sm mb-3">
              From: {letterData.sender_name}
            </p>

            {/* 편지 내용 */}
            <div className="bg-gray-50 rounded-lg p-4 min-h-[150px]">
              <p className="text-black text-sm whitespace-pre-wrap">
                {letterData.content}
              </p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className="w-full mt-4 py-3 bg-[#FF7373] text-white rounded-lg font-bold"
            >
              {translate("common.confirm")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
