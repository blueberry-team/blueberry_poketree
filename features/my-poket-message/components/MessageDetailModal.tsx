"use client";

import Image from "next/image";
import { useState } from "react";
import { POKEMON_DATA } from "@/features/my-pokedex/models/data/pokemonData";
import { LetterDetail } from "../models/res/GetLetterResponse";

interface MessageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterDetail: LetterDetail | null;
  isLoading: boolean;
  onDelete: () => void;
  onToggleOpen: () => void;
}

export function MessageDetailModal({
  isOpen,
  onClose,
  letterDetail,
  isLoading,
  onDelete,
  onToggleOpen,
}: MessageDetailModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  if (!isOpen) return null;

  const getPokemonImage = (pokemonId: number) => {
    const pokemon = POKEMON_DATA.find((p) => p.id === pokemonId);
    return pokemon?.imageActive;
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleOpen = async () => {
    setIsToggling(true);
    try {
      await onToggleOpen();
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg w-[90%] max-w-md p-6 max-h-[80vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : letterDetail ? (
          <div className="flex flex-col gap-4">
            {/* 포켓몬 이미지 */}
            <div className="w-24 h-24 relative mx-auto">
              {getPokemonImage(letterDetail.letter_pokemon) && (
                <Image
                  src={getPokemonImage(letterDetail.letter_pokemon)!}
                  alt={`Pokemon ${letterDetail.letter_pokemon}`}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* 발신자 */}
            <h2 className="text-lg font-bold text-center">
              {letterDetail.sender_name}님의 포켓메세지
            </h2>

            {/* 본문 */}
            <div className="bg-gray-100 rounded-lg p-4 min-h-[100px]">
              <p className="text-gray-800 whitespace-pre-wrap">
                {letterDetail.content}
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleToggleOpen}
                disabled={isToggling}
                className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
                  letterDetail.is_opened
                    ? "bg-gray-300 text-gray-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isToggling ? "처리 중..." : letterDetail.is_opened ? "공개됨" : "공개하기"}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">메시지를 불러올 수 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
