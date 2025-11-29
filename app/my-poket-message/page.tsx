"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageGrid } from "@/features/my-poket-message/components/MessageGrid";
import { MessageDetailModal } from "@/features/my-poket-message/components/MessageDetailModal";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getUserTree } from "@/features/my-tree/usecases/getUserTree";
import { getLetter } from "@/features/my-poket-message/usecases/getLetter";
import { deleteLetter } from "@/features/my-poket-message/usecases/deleteLetter";
import { openLetter } from "@/features/my-poket-message/usecases/openLetter";
import { Letter } from "@/features/my-tree/models/res/GetUserTreeResponse";
import { LetterDetail } from "@/features/my-poket-message/models/res/GetLetterResponse";

export default function MyPoketMessagePage() {
  const { translate } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicId = searchParams.get("id");

  const [messages, setMessages] = useState<Letter[]>([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 모달 관련 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    // publicId가 없으면 에러 페이지로 리다이렉트
    if (!publicId) {
      router.replace("/error?type=load");
      return;
    }

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await getUserTree({ public_id: publicId });

        if (response.message === "success" && response.data) {
          setMessages(response.data.letters);
          setUserName(response.data.nickname);
        }
      } catch (err) {
        router.replace("/error?type=load");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [publicId, router]);

  const handleMessageClick = async (index: number) => {
    const selectedMessage = messages[index];
    setSelectedLetterId(selectedMessage.letter_id);
    setIsModalOpen(true);
    setIsLoadingDetail(true);

    try {
      const response = await getLetter({ letterId: selectedMessage.letter_id });
      if (response.message === "success" && response.data) {
        setLetterDetail(response.data);
      }
    } catch (err) {
      console.error("Failed to load letter detail:", err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLetterId(null);
    setLetterDetail(null);
  };

  const handleDeleteLetter = async () => {
    if (!selectedLetterId) return;

    try {
      await deleteLetter({ letterId: selectedLetterId });
      // 삭제 성공 시 목록에서 제거
      setMessages((prev) => prev.filter((m) => m.letter_id !== selectedLetterId));
      handleCloseModal();
    } catch (err) {
      console.error("Failed to delete letter:", err);
    }
  };

  const handleToggleOpen = async () => {
    if (!selectedLetterId || !letterDetail) return;

    try {
      const newIsOpen = !letterDetail.is_opened;
      await openLetter({ letterId: selectedLetterId, isOpen: newIsOpen });
      // 성공 시 letterDetail 업데이트
      setLetterDetail((prev) => prev ? { ...prev, is_opened: newIsOpen } : null);
      // messages 목록도 업데이트
      setMessages((prev) =>
        prev.map((m) =>
          m.letter_id === selectedLetterId
            ? { ...m, is_open: newIsOpen ? "true" : "false" }
            : m
        )
      );
    } catch (err) {
      console.error("Failed to toggle open status:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#BF0120]">
        <p className="text-lg text-white">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#BF0120] overflow-hidden">
      {/* 헤더 영역 */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-white text-xl font-bold">
            {userName} {translate("tree.title")}
          </h1>
          <button className="flex items-center gap-1 px-3 py-2 bg-black/60 text-white text-sm font-bold w-fit rounded-lg">
            <span>{messages.length}{translate("tree.messageCount")}</span>
          </button>
        </div>
      </div>

      {/* 그리드 영역 */}
      <div className="flex-1 overflow-hidden">
        <MessageGrid messages={messages} onMessageClick={handleMessageClick} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="px-4 py-4 shrink-0 bg-[#BF0120]">
        <BottomButtons />
      </div>

      {/* 메시지 상세 모달 */}
      <MessageDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        letterDetail={letterDetail}
        isLoading={isLoadingDetail}
        onDelete={handleDeleteLetter}
        onToggleOpen={handleToggleOpen}
      />
    </div>
  );
}
