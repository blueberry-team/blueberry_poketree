"use client";

import { Suspense } from "react";
import Image, { type StaticImageData } from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tree } from "@/features/my-tree/components/Tree";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { SocialMediaButton } from "@/features/shared/components/SocialMediaButton/SocialMediaButton";
import LetterModal from "@/features/shared/components/Modal/LetterModal";
import SendLetterModal from "@/features/shared/components/Modal/SendLetterModal";
import { VisitorButtons } from "@/features/shared/components/VisitorButtons/VisitorButtons";
import { ShareLinkModal } from "@/features/shared/components/Modal/ShareLinkModal";
import { UserGuideModal } from "@/features/shared/components/Modal/UserGuideModal";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import {
  ALL_POKEMON_IMAGES
} from "@/features/shared/data/pokemonData";
import ButtonBigGreen from "@/assets/images/components/button_big_green.webp";
import { getUserTree } from "@/features/my-tree/usecases/getUserTree";
import { UserTreeData } from "@/features/my-tree/models/res/GetUserTreeResponse";
import { isApiError } from "@/features/shared/utils/api/apiClient";
import { Snow } from "@/features/shared/components/Snow/Snow";
import { setTreeOwner } from "@/features/signup-or-go/stores/authStore";
import { usePathname } from "next/navigation";

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
 * - 트리에 몬스터볼(편지) 표시 (페이지당 7개)
 * - 포켓메시지 확인하기 버튼 (본인일 때만)
 * - 도감 버튼
 * - 십자 버튼
 */

function MyTreePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const publicId = searchParams.get('id');

  // 다국어화 관련
  const { translate, language } = useTranslation();

  // API 상태
  const [treeData, setTreeData] = useState<UserTreeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 페이지 (좌우 페이징)
  const [currentPage, setCurrentPage] = useState(0);

  // 현재 표시할 포켓몬 목록 (pokemon_list에서 가져옴)
  const [displayedPokemons, setDisplayedPokemons] = useState<StaticImageData[]>([]);

  // 편지 열린 상태
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  // 공유 링크 열린 상태
  const [isShareLinkModalOpen, setIsShareLinkModalOpen] = useState(false);
  // 편지 보내기 모달 상태
  const [isSendLetterModalOpen, setIsSendLetterModalOpen] = useState(false);
  // 선택 편지 인덱스
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);
  // 사용자 가이드 모달 상태
  const [isUserGuideModalOpen, setIsUserGuideModalOpen] = useState(false);

  /**
   * pokemon_list에서 포켓몬 이미지 섞기
   */
  const updatePokemonDisplay = useCallback(() => {
    if (treeData?.pokemon_list && treeData.pokemon_list.length > 0) {
      const shuffled = [...treeData.pokemon_list].sort(() => Math.random() - 0.5);
      const pokemonImages = shuffled.map(index =>
        ALL_POKEMON_IMAGES[index] || ALL_POKEMON_IMAGES[0]
      );
      setDisplayedPokemons(pokemonImages);
    }
  }, [treeData?.pokemon_list]);

  // API로부터 데이터 가져오기
  // translate는 language에만 의존하므로 language만 의존성에 포함
  // translate를 의존성에 포함하면 무한 루프 발생 가능
  const fetchTreeData = useCallback(async () => {
    if (!publicId) {
      setError(translate("error.invalidAccess"));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getUserTree({ user_id: publicId });

      if (response.message === 'success' && response.data) {
        setTreeData(response.data);
        // 트리 주인 여부를 전역 signal에 저장
        setTreeOwner(response.data.is_owner === 'true');
      }
    } catch (err) {
      if (isApiError(err)) {
        setError(err.message || translate("error.treeNotFound"));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(translate("error.unknownError"));
      }
    } finally {
      setIsLoading(false);
    }
  // translate는 language에만 의존하지만, translate를 의존성에 포함하면 무한 루프 발생
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId, language]);

  useEffect(() => {
    if (publicId) {
      fetchTreeData();
    }
  }, [publicId, fetchTreeData]);

  // treeData가 변경되면 포켓몬 이미지 업데이트
  useEffect(() => {
    if (treeData) {
      updatePokemonDisplay();
    }
  }, [treeData, updatePokemonDisplay]);

  // 처음 로그인한 사용자(받은 편지가 0개)일 때 가이드 모달 표시
  useEffect(() => {
    if (treeData && treeData.is_owner === "true" && treeData.letters.length === 0) {
      setIsUserGuideModalOpen(true);
    }
  }, [treeData]);

  // my-tree 페이지가 아닐 때 isTreeOwner 초기화
  useEffect(() => {
    if (pathname !== '/my-tree') {
      setTreeOwner(null);
    }
  }, [pathname]);

  // API에서 받은 데이터 사용 (메모이제이션) - early return 전에 모든 hooks 호출
  const userName = useMemo(() => treeData?.nickname ?? "", [treeData?.nickname]);
  const isOwner = useMemo(() => treeData?.is_owner === "true", [treeData?.is_owner]);
  const letters = useMemo(() => treeData?.letters ?? [], [treeData?.letters]);

  /**
   * 이전 페이지로 이동
   */
  const handleLeft = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  /**
   * 다음 페이지로 이동
   */
  const handleRight = useCallback(() => {
    const totalPages = Math.ceil(letters.length / 7);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  }, [letters]);

  /**
   * 포켓몬 Refresh (상 버튼) - pokemon_list에서 랜덤으로 표시
   */
  const handleUp = useCallback(() => {
    updatePokemonDisplay();
  }, [updatePokemonDisplay]);

  /**
   * 포켓몬 Refresh (하 버튼) - pokemon_list에서 랜덤으로 표시
   */
  const handleDown = useCallback(() => {
    updatePokemonDisplay();
  }, [updatePokemonDisplay]);

  /**
   * 전체 메시지 페이지로 이동
   */
  const handleViewAllMessages = useCallback(() => {
    if (publicId) {
      router.push(`/my-poket-message?id=${publicId}`);
    }
  }, [publicId, router]);

  /**
   * 편지(몬스터볼) 클릭 시 모달 열기
   */
  const handleLetterClick = useCallback((index: number) => {
    // 주인은 모든 편지를 볼 수 있고, 방문자는 오픈된 편지만 볼 수 있음
    if (isOwner || letters[index]?.is_open === "true") {
      setSelectedLetterIndex(index);
      setIsLetterModalOpen(true);
    }
  }, [isOwner, letters]);

  const handleShareLinkClick = useCallback(() => {
    setIsShareLinkModalOpen(true);
  }, []);

  const handleMakePokeTree = useCallback((source: "make_tree" | "login") => {
    router.push(`/signup-or-go?from=${source}`);
  }, [router]);

  const handleSendMessage = useCallback(() => {
    setIsSendLetterModalOpen(true);
  }, []);

  const handleCloseShareLinkModal = useCallback(() => {
    setIsShareLinkModalOpen(false);
  }, []);

  const handleCloseSendLetterModal = useCallback(() => {
    setIsSendLetterModalOpen(false);
  }, []);

  const handleCloseLetterModal = useCallback(() => {
    setIsLetterModalOpen(false);
    fetchTreeData();
  }, [fetchTreeData]);

  const handleLetterModalComplete = useCallback(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  const handleSendLetterSuccess = useCallback(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const selectedLetter = useMemo(() => letters[selectedLetterIndex], [letters, selectedLetterIndex]);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E7E9EB]">
        <p className="text-lg">{translate("common.loading")}</p>
      </div>
    );
  }

  // 에러 또는 publicId 없음
  if (error || !treeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-[#E7E9EB]">
        <h1 className="text-xl font-bold">{translate("error.title")}</h1>
        <p className="text-gray-600">{error || translate("error.treeNotFound")}</p>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {translate("error.goHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      {/* 눈 내리는 효과 */}
      <Snow />

      {/* ~님의 포케트리 텍스트, 공유하기 버튼 또는 로그인 버튼 */}
      <div className="px-4 py-3 shrink-0 bg-[#BF0120] flex items-center justify-between gap-2">
        <span className="text-white text-xl font-bold w-[60%] overflow-hidden">{userName}{translate("tree.userTree")}</span>
        {/* is_owner일 때만 공유하기 버튼 표시 */}
        {isOwner && (
          <button
            data-guide="share-button"
            onClick={() => handleShareLinkClick()}
            className="relative w-36 flex items-center justify-center shrink-0 px-2 py-1"
            style={{ minHeight: "40px" }}
          >
            <Image
              src={ButtonBigGreen}
              alt={translate("tree.share")}
              fill
              className="object-fill"
            />
            <span className={`relative z-10 text-black font-bold ${language === "en" ? "text-[12px]" : "text-12"}`}>{translate("tree.share")}</span>
          </button>
        )}
      </div>

      {/* 바디 영역 */}
      <Tree
        obtainedPokemons={displayedPokemons}
        letters={letters}
        currentPage={currentPage}
        onLetterClick={handleLetterClick}
        onPageChange={handlePageChange}
      />

      {/* 하단 영역 */}
      <div className="px-4 py-4 shrink-0 relative">
        {/* 도감 버튼과 십자 버튼 (메시지 버튼 포함) */}
        {/*is_owner에 따라 바텀컴포넌트 구분*/}
        {isOwner ? (
          <BottomButtons
            onUp={handleUp}
            onDown={handleDown}
            onLeft={handleLeft}
            onRight={handleRight}
            onCheckMessage={handleViewAllMessages}
          />
        ) : (
          <VisitorButtons
            onSendMessage={handleSendMessage}
            onMakeTree={handleMakePokeTree}
          />
        )}
      </div>

      {/* 공유 링크 모달 */}
      {publicId && (
        <ShareLinkModal
          isOpen={isShareLinkModalOpen}
          onClose={handleCloseShareLinkModal}
          publicId={publicId}
        />
      )}

      {/* 소셜미디어 버튼 */}
      <SocialMediaButton />

      {/* 편지 모달 */}
      <LetterModal
        isModalOpen={isLetterModalOpen}
        onClose={handleCloseLetterModal}
        letterId={selectedLetter?.letter_id || null}
        isOwner={isOwner}
        userId={publicId!}
        isRead={selectedLetter?.is_read || "true"}
        onComplete={handleLetterModalComplete}
      />

      {/* 편지 보내기 모달 */}
      <SendLetterModal
        isModalOpen={isSendLetterModalOpen}
        onClose={handleCloseSendLetterModal}
        receiverId={publicId!}
        receiverName={userName}
        onSuccess={handleSendLetterSuccess}
      />

      {/* 사용자 가이드 모달 */}
      <UserGuideModal
        isOpen={isUserGuideModalOpen}
        onClose={() => setIsUserGuideModalOpen(false)}
      />
    </div>
  );
}

export default function MyTreePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#E7E9EB]">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <MyTreePageContent />
    </Suspense>
  );
}
