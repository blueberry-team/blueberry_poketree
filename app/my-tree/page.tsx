"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tree } from "@/features/my-tree/components/Tree";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { SocialMediaButton } from "@/features/shared/components/SocialMediaButton/SocialMediaButton";
import LetterModal from "@/features/shared/components/Modal/LetterModal";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import {
  ALL_POKEMON_IMAGES,
  getRandomPokemonImages
} from "@/features/shared/data/pokemonData";
import ButtonBigGreen from "@/assets/images/components/button_big_green.png";
import { getUserTree } from "@/features/my-tree/usecases/getUserTree";
import { UserTreeData } from "@/features/my-tree/models/res/GetUserTreeResponse";
import { isApiError } from "@/features/shared/utils/api/apiClient";

/**
 * MyTreePage - 내 트리 페이지
 *
 * Query Params로 publicId를 받아서 해당 유저의 트리를 표시합니다.
 * - 로그인 후: /my-tree?publicId={본인public_id}
 * - 공유 링크 접속 시: /my-tree?publicId={다른사람public_id}
 *
 * 주요 기능:
 * - 사용자 이름 표시
 * - 트리 공유하기 버튼
 * - 포켓메시지 획득 개수 표시
 * - 트리에 몬스터볼(편지) 표시 (페이지당 6개)
 * - 포켓메시지 확인하기 버튼 (본인일 때만)
 * - 도감 버튼
 * - 십자 버튼
 */

// 샘플 메시지 데이터 (편지 내용용 - letter_id로 매칭)
// TODO: 서버 구현 후 편지 내용도 API로 가져오기
const SAMPLE_MESSAGE_CONTENTS: Record<string, { content: string; pokemonIndex: number }> = {
  "1": { content: "메리 크리스마스! 올해도 행복한 연말 보내세요.", pokemonIndex: 25 },
  "2": { content: "행복한 연말 보내세요! 새해에도 좋은 일만 가득하길 바랍니다.", pokemonIndex: 1 },
  "3": { content: "새해 복 많이 받으세요! 항상 건강하고 행복하세요.", pokemonIndex: 4 },
  "4": { content: "따뜻한 크리스마스 보내세요! 사랑하는 사람들과 함께요.", pokemonIndex: 7 },
  "5": { content: "즐거운 연말연시 되세요! 2025년에도 파이팅!", pokemonIndex: 150 },
  "6": { content: "포켓트리와 함께하는 특별한 크리스마스! 모든 소원이 이루어지길!", pokemonIndex: 151 },
  "7": { content: "항상 응원하고 있어요! 좋은 하루 되세요.", pokemonIndex: 39 },
  "8": { content: "올 한 해도 수고 많았어요! 푹 쉬세요.", pokemonIndex: 52 },
  "9": { content: "따뜻한 연말 보내세요! 사랑합니다.", pokemonIndex: 6 },
  "10": { content: "새해에도 건강하고 행복하세요!", pokemonIndex: 143 },
  "11": { content: "좋은 일만 가득한 크리스마스 되세요!", pokemonIndex: 94 },
  "12": { content: "힘내세요! 항상 응원합니다.", pokemonIndex: 131 },
  "13": { content: "메리 크리스마스! 새해 복 많이 받으세요.", pokemonIndex: 3 },
  "14": { content: "즐거운 연말 보내세요!", pokemonIndex: 9 },
  "15": { content: "2025년에도 좋은 일만 가득하길!", pokemonIndex: 133 },
};

export default function MyTreePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { translate } = useTranslation();
  const publicId = searchParams.get('publicId');

  // API 상태
  const [treeData, setTreeData] = useState<UserTreeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 페이지 (좌우 페이징)
  const [currentPage, setCurrentPage] = useState(0);

  // 현재 표시할 포켓몬 목록 (상하 버튼으로 Refresh)
  // 초기값은 처음 6마리로 설정 (hydration 불일치 방지)
  const [displayedPokemons, setDisplayedPokemons] = useState(ALL_POKEMON_IMAGES.slice(0, 7));

  // 편지 열린 상태
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  // 선택 편지 인덱스
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);

  // API로부터 데이터 가져오기
  useEffect(() => {
    if (!publicId) {
      setError('잘못된 접근입니다. 올바른 링크를 통해 접근해주세요.');
      setIsLoading(false);
      return;
    }

    const fetchTreeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getUserTree({ public_id: publicId });

        if (response.message === 'success' && response.data) {
          setTreeData(response.data);
        }
      } catch (err) {
        if (isApiError(err)) {
          setError(err.message || '트리 정보를 불러올 수 없습니다.');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTreeData();
  }, [publicId]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E7E9EB]">
        <p className="text-lg">로딩 중...</p>
      </div>
    );
  }

  // 에러 또는 publicId 없음
  if (error || !treeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-[#E7E9EB]">
        <h1 className="text-xl font-bold">오류</h1>
        <p className="text-gray-600">{error || '트리 정보를 찾을 수 없습니다.'}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // API에서 받은 데이터 사용
  const userName = treeData.user_name;
  const isOwner = treeData.is_owner;
  const totalMessageCount = treeData.letters.length;

  // 페이지 계산
  const messagesPerPage = 6;
  const totalPages = Math.ceil(totalMessageCount / messagesPerPage);

  /**
   * 이전 페이지로 이동 + 포켓몬 셔플
   */
  const handleLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    setDisplayedPokemons(getRandomPokemonImages(7));
  };

  /**
   * 다음 페이지로 이동 + 포켓몬 셔플
   */
  const handleRight = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    setDisplayedPokemons(getRandomPokemonImages(7));
  };

  /**
   * 포켓몬 Refresh (상 버튼)
   */
  const handleUp = () => {
    setDisplayedPokemons(getRandomPokemonImages(7));
  };

  /**
   * 포켓몬 Refresh (하 버튼)
   */
  const handleDown = () => {
    setDisplayedPokemons(getRandomPokemonImages(7));
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
    <div className="flex-1 bg-[#E7E9EB] flex flex-col overflow-y-auto">
      {/* ~님의 포케트리 텍스트, 공유하기 버튼 */}
      <div className="px-4 py-3 shrink-0 bg-primary-red flex items-center justify-between gap-2">
        <span className="text-white text-xl font-bold whitespace-nowrap">{userName}{translate("tree.userTree")}</span>
        <button className="relative w-36 h-10 flex items-center justify-center shrink-0">
          <Image
            src={ButtonBigGreen}
            alt={translate("tree.share")}
            fill
            className="object-fill"
          />
          <span className="relative z-10 text-black text-12 font-bold">{translate("tree.share")}</span>
        </button>
      </div>

      {/* 바디 영역 */}
      <Tree
        obtainedPokemons={displayedPokemons}
        totalMessageCount={totalMessageCount}
        currentPage={currentPage}
        onLetterClick={handleLetterClick}
        openedLetterIndex={isLetterModalOpen ? selectedLetterIndex : -1}
        onPageChange={(page) => {
          setCurrentPage(page);
          setDisplayedPokemons(getRandomPokemonImages(7));
        }}
      />

      {/* 푸터 영역 */}
      <div className="px-4 py-4 shrink-0 relative min-h-[200px]">
        {/* 포켓메시지 확인하기/보내기 버튼 - is_owner에 따라 다르게 표시 */}
        {isOwner ? (
          <button
            onClick={handleViewAllMessages}
            className="w-full h-12 bg-[#FF7373] rounded-lg flex items-center justify-center mb-3"
          >
            <span className="text-white text-xl font-bold">
              {translate("tree.checkMessage")}
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              // TODO: 편지 보내기 기능 구현
              alert('포켓 메시지 보내기 (구현 예정)');
            }}
            className="w-full h-12 bg-[#4ECDC4] rounded-lg flex items-center justify-center mb-3"
          >
            <span className="text-white text-xl font-bold">
              포켓 메시지 보내기
            </span>
          </button>
        )}

        {/* 도감 버튼과 십자 버튼 */}
        <BottomButtons
          onUp={handleUp}
          onDown={handleDown}
          onLeft={handleLeft}
          onRight={handleRight}
        />
      </div>

      {/* 소셜미디어 버튼 */}
      <SocialMediaButton />

      {/* 편지 모달 */}
      <LetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        letterIndex={selectedLetterIndex}
        letterContent={SAMPLE_MESSAGE_CONTENTS[treeData.letters[selectedLetterIndex].letter_id]?.content}
        senderName={treeData.letters[selectedLetterIndex]?.letter_sender || ""}
        pokemonIndex={SAMPLE_MESSAGE_CONTENTS[treeData.letters[selectedLetterIndex].letter_id]?.pokemonIndex}
      />
    </div>
  );
}
