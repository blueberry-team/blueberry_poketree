"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { MessageGrid } from "@/features/my-poket-message/components/MessageGrid";
import LetterModal from "@/features/shared/components/Modal/LetterModal";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { getUserTree } from "@/features/my-tree/usecases/getUserTree";
import { Letter } from "@/features/my-tree/models/res/GetUserTreeResponse";
import MonsterBallOpen from "@/assets/images/components/monster_ball_open.png";

function MyPoketMessagePageContent() {
  const { translate } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicId = searchParams.get("id");

  const [messages, setMessages] = useState<Letter[]>([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 모달 관련 state
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);

  // 메시지 목록 가져오기
  const fetchMessages = useCallback(async () => {
    if (!publicId) {
      router.replace("/error?type=load");
      return;
    }

    try {
      setIsLoading(true);
      const response = await getUserTree({ user_id: publicId });

      if (response.message === "success" && response.data) {
        setMessages(response.data.letters);
        setUserName(response.data.nickname);
      }
    } catch (err) {
      router.replace("/error?type=load");
    } finally {
      setIsLoading(false);
    }
  }, [publicId, router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // 메시지 클릭 시 선택 + 모달 열기
  const handleMessageClick = (index: number) => {
    setSelectedLetterIndex(index);
    setIsLetterModalOpen(true);
  };

  // 메시지 버튼 클릭 시 선택된 메시지 모달 열기
  const handleCheckMessage = () => {
    if (messages.length > 0) {
      setIsLetterModalOpen(true);
    }
  };

  // 십자버튼: 왼쪽 (이전 메시지, 첫번째면 이동 안함)
  const handleLeft = () => {
    if (messages.length === 0) return;
    setSelectedLetterIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // 십자버튼: 오른쪽 (다음 메시지, 마지막이면 이동 안함)
  const handleRight = () => {
    if (messages.length === 0) return;
    setSelectedLetterIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
  };

  // 십자버튼: 위 (한 줄 위로, 3칸)
  const handleUp = () => {
    if (messages.length === 0) return;
    setSelectedLetterIndex((prev) => (prev >= 3 ? prev - 3 : prev));
  };

  // 십자버튼: 아래 (한 줄 아래로, 3칸)
  const handleDown = () => {
    if (messages.length === 0) return;
    setSelectedLetterIndex((prev) => (prev + 3 < messages.length ? prev + 3 : prev));
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
            {userName}{translate("message.userMessage")}
          </h1>
          <button className="flex items-center gap-1 px-3 py-2 bg-black/60 text-white text-sm font-bold w-fit rounded-lg">
            <Image src={MonsterBallOpen} alt="몬스터볼" width={16} height={16} />
            <span>{messages.length}{translate("tree.messageCount")}</span>
          </button>
        </div>
      </div>

      {/* 그리드 영역 */}
      <div className="flex-1 overflow-hidden">
        <MessageGrid
          messages={messages}
          selectedIndex={selectedLetterIndex}
          onMessageClick={handleMessageClick}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="px-4 py-4 shrink-0 relative bg-[#BF0120] h-[246px] border-t-2 border-black">
        <BottomButtons
          onUp={handleUp}
          onDown={handleDown}
          onLeft={handleLeft}
          onRight={handleRight}
          onCheckMessage={handleCheckMessage}
        />
      </div>

      {/* 편지 모달 */}
      <LetterModal
        isModalOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        // letterIndex={selectedLetterIndex}
        letterId={messages[selectedLetterIndex]?.letter_id || null}
        onComplete={() => {
          // 편지 삭제 후 목록 새로고침
          fetchMessages();
        }}
      />
    </div>
  );
}

export default function MyPoketMessagePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#E7E9EB]">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <MyPoketMessagePageContent />
    </Suspense>
  );
}
