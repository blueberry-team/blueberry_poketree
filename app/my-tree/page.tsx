"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tree } from "@/features/my-tree/components/Tree";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import LetterModal from "@/features/shared/components/Modal/LetterModal";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import {
  ALL_POKEMON_IMAGES,
  getRandomPokemonImages
} from "@/features/shared/data/pokemonData";

/**
 * MyTreePage - 내 트리 페이지
 *
 * 주요 기능:
 * - 사용자 이름 표시 (현재 하드코딩: 상화)
 * - 트리 공유하기 버튼
 * - 포켓메시지 획득 개수 표시
 * - 트리에 몬스터볼(편지) 표시 (페이지당 6개)
 * - 포켓메시지 확인하기 버튼
 * - 도감 버튼
 * - 십자 버튼
 */

// 샘플 메시지 데이터 (총 15개 - 3페이지)
// pokemonIndex는 1~151 사이의 값 (pokemon_{pokemonIndex}.webp로 호출)
const SAMPLE_MESSAGES = [
  { id: 1, content: "메리 크리스마스! 올해도 행복한 연말 보내세요.", senderName: "익명의 산타", pokemonIndex: 25 },
  { id: 2, content: "행복한 연말 보내세요! 새해에도 좋은 일만 가득하길 바랍니다.", senderName: "친구A", pokemonIndex: 1 },
  { id: 3, content: "새해 복 많이 받으세요! 항상 건강하고 행복하세요.", senderName: "가족", pokemonIndex: 4 },
  { id: 4, content: "따뜻한 크리스마스 보내세요! 사랑하는 사람들과 함께요.", senderName: "동료", pokemonIndex: 7 },
  { id: 5, content: "즐거운 연말연시 되세요! 2025년에도 파이팅!", senderName: "선배", pokemonIndex: 150 },
  { id: 6, content: "포켓트리와 함께하는 특별한 크리스마스! 모든 소원이 이루어지길!", senderName: "후배", pokemonIndex: 151 },
  { id: 7, content: "항상 응원하고 있어요! 좋은 하루 되세요.", senderName: "친구B", pokemonIndex: 39 },
  { id: 8, content: "올 한 해도 수고 많았어요! 푹 쉬세요.", senderName: "익명", pokemonIndex: 52 },
  { id: 9, content: "따뜻한 연말 보내세요! 사랑합니다.", senderName: "소중한 사람", pokemonIndex: 6 },
  { id: 10, content: "새해에도 건강하고 행복하세요!", senderName: "이웃", pokemonIndex: 143 },
  { id: 11, content: "좋은 일만 가득한 크리스마스 되세요!", senderName: "친구C", pokemonIndex: 94 },
  { id: 12, content: "힘내세요! 항상 응원합니다.", senderName: "멘토", pokemonIndex: 131 },
  { id: 13, content: "메리 크리스마스! 새해 복 많이 받으세요.", senderName: "팀원", pokemonIndex: 3 },
  { id: 14, content: "즐거운 연말 보내세요!", senderName: "지인", pokemonIndex: 9 },
  { id: 15, content: "2025년에도 좋은 일만 가득하길!", senderName: "익명의 친구", pokemonIndex: 133 },
];

export default function MyTreePage() {
  const router = useRouter();
  const { translate } = useTranslation();

  // 현재 페이지 (좌우 페이징)
  const [currentPage, setCurrentPage] = useState(0);

  // 현재 표시할 포켓몬 목록 (상하 버튼으로 Refresh)
  // 초기값은 처음 6마리로 설정 (hydration 불일치 방지)
  const [displayedPokemons, setDisplayedPokemons] = useState(ALL_POKEMON_IMAGES.slice(0, 6));

  // 편지 열린 상태
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  // 선택 편지 인덱스
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);

  // 사용자 이름 (하드코딩)
  const userName = "상화";

  // 전체 메시지 개수
  const totalMessageCount = SAMPLE_MESSAGES.length;

  // 페이지 계산
  const messagesPerPage = 6;
  const totalPages = Math.ceil(totalMessageCount / messagesPerPage);

  /**
   * 이전 페이지로 이동 + 포켓몬 셔플
   */
  const handleLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    setDisplayedPokemons(getRandomPokemonImages(6));
  };

  /**
   * 다음 페이지로 이동 + 포켓몬 셔플
   */
  const handleRight = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    setDisplayedPokemons(getRandomPokemonImages(6));
  };

  /**
   * 포켓몬 Refresh (상 버튼)
   */
  const handleUp = () => {
    setDisplayedPokemons(getRandomPokemonImages(6));
  };

  /**
   * 포켓몬 Refresh (하 버튼)
   */
  const handleDown = () => {
    setDisplayedPokemons(getRandomPokemonImages(6));
  };

  /**
   * 전체 메시지 페이지로 이동
   */
  const handleViewAllMessages = () => {
    router.push("/my-poket-message");
  };

  /**
   * 편지(몬스터볼) 클릭 시 모달 열기
   */
  const handleLetterClick = (index: number) => {
    setSelectedLetterIndex(index);
    setIsLetterModalOpen(true);
  };

  return (
    <div className="flex-1 bg-[#E7E9EB] flex flex-col">
      {/* 헤더 영역 */}
      <div className="px-4 py-3 shrink-0">
        {/* 사용자 트리 제목 + 공유하기 버튼 */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-black text-xl font-bold">
            {userName} {translate("tree.userTree")}
          </h1>
          {/* 공유하기 버튼 */}
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#4ECDC4] rounded-lg text-white text-sm font-bold">
            <span>{"<"}</span>
            <span>{translate("tree.share")}</span>
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="w-full bg-[#3B82F6] text-white text-center py-2 rounded text-sm">
          {translate("tree.notice")}
        </div>

        {/* 포켓메시지 획득 개수 표시 */}
        <div className="mt-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-black flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-black text-sm font-bold">
            {totalMessageCount}{translate("tree.messageCount")}
          </span>
        </div>
      </div>

      {/* 바디 영역 */}
      <Tree
        obtainedPokemons={displayedPokemons}
        totalMessageCount={totalMessageCount}
        currentPage={currentPage}
        onLetterClick={handleLetterClick}
        openedLetterIndex={isLetterModalOpen ? selectedLetterIndex : -1}
      />

      {/* 푸터 영역 */}
      <div className="px-4 py-4 shrink-0 relative min-h-[200px]">
        {/* 포켓메시지 확인하기 버튼 */}
        <button
          onClick={handleViewAllMessages}
          className="w-full h-12 bg-[#FF7373] rounded-lg flex items-center justify-center mb-3"
        >
          <span className="text-white text-xl font-bold">
            {translate("tree.checkMessage")}
          </span>
        </button>

        {/* 도감 버튼과 십자 버튼 */}
        <BottomButtons
          onUp={handleUp}
          onDown={handleDown}
          onLeft={handleLeft}
          onRight={handleRight}
        />
      </div>

      {/* 편지 모달 */}
      <LetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        letterIndex={selectedLetterIndex}
        letterContent={SAMPLE_MESSAGES[selectedLetterIndex]?.content || ""}
        senderName={SAMPLE_MESSAGES[selectedLetterIndex]?.senderName || ""}
        pokemonIndex={SAMPLE_MESSAGES[selectedLetterIndex]?.pokemonIndex || 1}
      />
    </div>
  );
}
