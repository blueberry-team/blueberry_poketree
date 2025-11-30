"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import { getLetter } from "@/features/my-tree/usecases/getLetter";
import { deleteLetter } from "@/features/my-tree/usecases/deleteLetter";
import { LetterData } from "@/features/my-tree/models/res/GetLetterResponse";
import DeleteConfirmModal from "@/features/shared/components/Modal/DeleteConfirmModal";
import LockIcon from "@/assets/icon/lockIcon.svg";
import CloseIcon from "@/assets/icon/closeIcon.png";
import ButtonLetterPublic from "@/assets/images/components/button_letter_public.png";
import ButtonLetterUnpublic from "@/assets/images/components/button_letter_unpublic.png";

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * - 몬스터볼(편지) 클릭 시 표시
 * - 보낸 사람, 포켓몬 이미지, 편지 내용 표시
 */

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterId: string | null;
  onComplete?: () => void;
}

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * @param isOpen - 모달 열림 여부
 * @param onClose - 모달 닫기 함수
 * @param letterId - 편지 ID
 * @param onComplete - 편지 삭제 또는 공개/비공개 상태 변경 후 페이지를 새로고침하기위한 callBack 함수
 */
export default function LetterModal({
  isOpen,
  onClose,
  letterId,
  onComplete,
}: LetterModalProps) {
  const { translate } = useTranslation();
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
          setError(translate("letterModal.loadError"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, letterId]);

  // 편지 삭제 확인 모달 열기
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  // 편지 삭제 실행
  const handleConfirmDelete = async () => {
    if (!letterId || !letterData) return;

    try {
      setIsDeleting(true);
      setShowConfirmModal(false);
      const response = await deleteLetter({ letter_id: letterData.letter_id });

      if (response.message === "success") {
        alert(translate("letterModal.deleteSuccess"));
        onComplete?.();
        onClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(translate("letterModal.deleteError"));
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
        className="bg-black rounded-lg w-[352px] h-[531px] relative overflow-y-auto"
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

        {/* 자물쇠 아이콘 (우상단) - is_open가 true일 때만 표시 */}
        {!letterData?.is_open && (
          <div className="absolute top-6 right-6">
            <Image
              src={LockIcon}
              alt="비공개"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )}

        {/* 로딩 중 */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[500px]">
            <p className="text-white">{translate("letterModal.loading")}</p>
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
              {translate("letterModal.close")}
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
                width={48}
                height={48}
                className="object-contain"
                unoptimized
              />
              <h2 className="text-white text-[20px] font-bold">
                {translate("letterModal.title").replace("{name}", letterData.sender_name)}
              </h2>
            </div>

            {/* 편지 내용 */}
            <div className="bg-white rounded-lg p-8 min-h-[320px] mb-6">
              <p className="text-black text-lg whitespace-pre-wrap leading-relaxed">
                {letterData.content}
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex justify-between items-center">
              {/* 삭제 버튼 */}
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="w-20 h-12 bg-transparent border border-white text-white rounded-sm font-bold hover:bg-white hover:text-black transition-colors"
              >
                {isDeleting ? translate("letterModal.deleting") : translate("letterModal.delete")}
              </button>

              {/* 메세지 공개/비공개 버튼 */}
              <div
                className="relative cursor-pointer h-12 flex items-center justify-center"
                onClick={handlePublish}
                style={{ width: '200px' }}
              >
                <Image
                  src={letterData.is_open ? ButtonLetterUnpublic : ButtonLetterPublic}
                  alt={letterData.is_open ? translate("letterModal.publish") : translate("letterModal.unpublish")}
                  width={200}
                  height={56}
                  className="h-full w-auto object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
                  {letterData.is_open && (
                    <Image
                      src={LockIcon}
                      alt="자물쇠"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  )}
                  <span className="text-black font-bold text-center text-base">
                    {letterData.is_open ? translate("letterModal.unpublish") : translate("letterModal.publish")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={translate("letterModal.deleteConfirm").replace("{name}", letterData?.sender_name || "")}
        confirmText={translate("letterModal.deleteButton")}
      />
    </div>
  );
}
