"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getPokemonImage } from "@/features/shared/data/pokemonData";
import { getLetter } from "@/features/my-tree/usecases/getLetter";
import { getVisitorLetter } from "@/features/my-tree/usecases/getVisitorLetter";
import { deleteLetter } from "@/features/my-tree/usecases/deleteLetter";
import { LetterData } from "@/features/my-tree/models/res/GetLetterResponse";
import DeleteConfirmModal from "@/features/shared/components/Modal/DeleteConfirmModal";
import LockIcon from "@/assets/icon/lockIcon.svg";
import ButtonLetterPublic from "@/assets/images/components/button_letter_public.webp";
import ButtonLetterUnpublic from "@/assets/images/components/button_letter_unpublic.webp";
import { openLetter } from "@/features/my-tree/repositories/letterRepository";
import HatchModal from "@/features/shared/components/Modal/HatchModal";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * - 몬스터볼(편지) 클릭 시 표시
 * - 보낸 사람, 포켓몬 이미지, 편지 내용 표시
 */

interface LetterModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  letterId: string | null;
  isOwner: string;
  userId: string;
  isRead: string;
  onComplete?: () => void;
}

/**
 * LetterModal - 편지 내용을 보여주는 모달
 * @param isOpen - 모달 열림 여부
 * @param onClose - 모달 닫기 함수
 * @param letterId - 편지 ID
 * @param isOwner - 트리 소유자 여부
 * @param userId - 현재 트리의 소유자 ID
 * @param isRead - 편지 읽음 여부
 * @param onComplete - 편지 삭제 또는 공개/비공개 상태 변경 후 페이지를 새로고침하기위한 callBack 함수
 */
export default function LetterModal({
  isModalOpen,
  onClose,
  letterId,
  isOwner,
  userId,
  isRead,
  onComplete,
}: LetterModalProps) {
  const { translate } = useTranslation();
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showHatchModal, setShowHatchModal] = useState(false);

  // 편지 데이터 가져오기
  useEffect(() => {
    if (!isModalOpen || !letterId) return;

    const fetchLetter = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // isOwner에 따라 다른 API 호출
        const response = isOwner === "true"
          ? await getLetter({ letter_id: letterId })
          : await getVisitorLetter({ letter_id: letterId, user_id: userId });

        if (response.message === "success" && response.data) {
          setLetterData(response.data);

          // is_read가 false면 볼 부화 모달 시작
          if (isRead === "false") {
            setShowHatchModal(true);
          }
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
  }, [isModalOpen, letterId, isOwner, userId, isRead]);


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

  // 메시지 공개/비공개 토글
  const handlePublish = async () => {
    if (!letterData || isLoading) return;

    try {
      setIsLoading(true);

      const response = await openLetter({
        letter_id: letterData.letter_id,
        is_open: letterData.is_open === "true" ? "false" : "true",
      });

      if (response.message === "success") {
        // 모달 내 상태 즉시 업데이트
        setLetterData({
          ...letterData,
          is_open: letterData.is_open === "true" ? "false" : "true",
        });

        // 부모 컴포넌트 새로고침 (페이지 상태 업데이트)
        onComplete?.();
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(translate("letterModal.updateVisibilityError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <>
      {/* 볼 부화 및 포켓몬 공개 모달 */}
      {letterData && (
        <HatchModal
          isOpen={showHatchModal}
          onClose={() => {
            setShowHatchModal(false); // "편지 보기" 버튼: HatchModal만 닫고 LetterModal 표시
          }}
          onComplete={() => {
            onClose(); // X 버튼: 전체 닫기
          }}
          senderName={letterData.sender_name}
          pokemonId={letterData.letter_pokemon}
        />
      )}

      {/* 편지 내용 모달 */}
      {!showHatchModal && (
        <BaseModal
          isOpen={true}
          onClose={onClose}
          contentClassName="bg-black relative overflow-hidden"
        >
          <div className="flex flex-col">
            {/* 자물쇠 아이콘 (우상단) - isOwner일 때만 표시, is_open가 false일 때 표시 */}
            {isOwner === "true" && letterData?.is_open !== "true" && (
              <div className="absolute top-2.5 right-3">
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
              <div>
                {/* 헤더: 포켓몬 이미지와 제목 */}
                <div className="flex items-center gap-6 mb-6 pt-4">
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
                <div className="bg-white rounded-lg px-2 py-5 min-h-320px mb-6 max-h-[400px] overflow-y-auto">
                  <p className="text-black text-lg whitespace-pre-wrap leading-relaxed">
                    {letterData.content}
                  </p>
                </div>

                {/* 버튼 그룹 - isOwner일 때만 표시 */}
                {isOwner === "true" && (
                  <div className="flex justify-between items-center w-full">
                    {/* 삭제 버튼 */}
                    <button
                      onClick={handleDeleteClick}
                      disabled={isDeleting}
                      className="w-20 mx-1 h-11 bg-transparent border border-white text-white rounded-sm font-bold hover:bg-white hover:text-black transition-colors"
                    >
                      {isDeleting ? translate("letterModal.deleting") : translate("letterModal.delete")}
                    </button>

                    {/* 메세지 공개/비공개 버튼 */}
                    <button
                      onClick={handlePublish}
                      disabled={isLoading}
                      className="relative h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Image
                        src={letterData.is_open === "true" ? ButtonLetterUnpublic : ButtonLetterPublic}
                        alt={letterData.is_open === "true" ? translate("letterModal.unpublish") : translate("letterModal.publish")}
                        width={200}
                        height={56}
                        className="h-full w-auto object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
                        {letterData.is_open === "true" && (
                          <Image
                            src={LockIcon}
                            alt="자물쇠"
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        )}
                        <span className="text-black font-bold text-center text-base">
                          {letterData.is_open === "true" ? translate("letterModal.unpublish") : translate("letterModal.publish")}
                        </span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          </BaseModal>
      )}

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={translate("letterModal.deleteConfirm").replace("{name}", letterData?.sender_name || "")}
        confirmText={translate("letterModal.deleteButton")}
      />
    </>
  );
}
