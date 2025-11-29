"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import { getLetter } from "@/features/my-tree/usecases/getLetter";
import { deleteLetter } from "@/features/my-tree/usecases/deleteLetter";
import { LetterData } from "@/features/my-tree/models/res/GetLetterResponse";
import LockIcon from "@/assets/icon/lockIcon.svg";
import CloseIcon from "@/assets/icon/closeIcon.png";

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
  onDelete?: () => void;
}

export default function LetterModal({
  isOpen,
  onClose,
  letterId,
  letterIndex,
  onDelete,
}: LetterModalProps) {
  const { translate } = useTranslation();
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 편지 데이터 가져오기
  useEffect(() => {
    if (!isOpen || !letterId) return;

    const fetchLetter = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getLetter({ letter_id: letterId });

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

  // 편지 삭제
  const handleDelete = async () => {
    if (!letterId || !letterData) return;

    if (!confirm("정말 이 편지를 삭제하시겠습니까?")) return;

    try {
      setIsDeleting(true);
      const response = await deleteLetter({ letter_id: letterData.letter_id });

      if (response.message === "success") {
        alert("편지가 삭제되었습니다.");
        onDelete?.();
        onClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("편지 삭제에 실패했습니다.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // 메시지 공개하기 (TODO)
  const handlePublish = () => {
    alert("메시지 공개 기능은 준비 중입니다.");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-full max-w-[800px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
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

        {/* 자물쇠 아이콘 (우상단) */}
        <div className="absolute top-6 right-6">
          <Image
            src={LockIcon}
            alt="비공개"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>

        {/* 로딩 중 */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[500px]">
            <p className="text-white">로딩 중...</p>
          </div>
        )}

        {/* 에러 */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[500px] gap-4 p-8">
            <p className="text-red-500">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg"
            >
              닫기
            </button>
          </div>
        )}

        {/* 편지 데이터 표시 */}
        {letterData && !isLoading && !error && (
          <div className="p-8">
            {/* 헤더: 포켓몬 이미지와 제목 */}
            <div className="flex items-center gap-6 mb-6">
              <Image
                src={getPokemonImage(letterData.letter_pokemon)}
                alt={`Pokemon ${letterData.letter_pokemon}`}
                width={120}
                height={120}
                className="object-contain"
                unoptimized
              />
              <h2 className="text-white text-3xl font-bold">
                누구게 님의 포켓 메세지
              </h2>
            </div>

            {/* 편지 내용 */}
            <div className="bg-white rounded-2xl p-8 min-h-[400px] mb-6">
              <p className="text-black text-lg whitespace-pre-wrap leading-relaxed">
                {letterData.content}
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 py-4 bg-[#4CAF50] text-white rounded-xl font-bold text-xl hover:bg-[#45a049] transition-colors"
              >
                메세지 공개하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
