"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import TalkingBoxTop from "@/assets/images/components/talking_box_top.webp";
import TalkingBoxBottom from "@/assets/images/components/talking_box_bottom.webp";
import DoctorOh from "@/assets/images/components/doctor_oh_with_shadow.png";
import MonsterBallClose from "@/assets/images/components/monster_ball_close.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidePageConfig {
  // true면 talking_box_bottom, false/undefined면 talking_box_top
  useTopBox?: boolean;
  // 하이라이트할 data-guide 속성 값 (없으면 하이라이트 안함)
  highlightElement?: string;
}

const GUIDE_PAGE_CONFIGS: GuidePageConfig[] = [
  { useTopBox: true }, // page1 - 하이라이트 없음
  { useTopBox: false, highlightElement: "tree-area" }, // page2
  { useTopBox: false, highlightElement: "share-button" }, // page3
  { useTopBox: false, highlightElement: "tree-image" }, // page4
  { useTopBox: true, highlightElement: "message-list-button" }, // page5
  { useTopBox: true, highlightElement: "pokedex-button" }, // page6
  { useTopBox: true }, // page7 - 하이라이트 없음
];

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  // spotlightRect와 동기화된 페이지 (말풍선 위치 계산에 사용)
  const [displayPage, setDisplayPage] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const { translate } = useTranslation();
  const originalZIndexRef = useRef<string | null>(null);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // 모달이 닫히면 페이지를 0으로 리셋하고 정리
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(0);
      setDisplayPage(0);
      setSpotlightRect(null);
      // z-index 원복
      if (targetElement && originalZIndexRef.current !== null) {
        targetElement.style.zIndex = originalZIndexRef.current;
      }
      setTargetElement(null);
      originalZIndexRef.current = null;
    }
  }, [isOpen, targetElement]);

  // 현재 페이지에 따라 요소 하이라이트
  useEffect(() => {
    if (!isOpen) return;

    const config = GUIDE_PAGE_CONFIGS[currentPage];

    // 이전 타겟 요소의 z-index 원복
    if (targetElement && originalZIndexRef.current !== null) {
      targetElement.style.zIndex = originalZIndexRef.current;
    }
    setTargetElement(null);
    originalZIndexRef.current = null;

    // 하이라이트할 요소가 없으면 spotlightRect를 null로 설정
    if (!config.highlightElement) {
      const isLastGuide = currentPage === GUIDE_PAGE_CONFIGS.length - 1;
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));

      // 마지막 가이드면 최상단으로 스크롤
      if (isLastGuide && scrollY > 0) {
        // 먼저 말풍선을 기본 위치로 이동
        setSpotlightRect(null);
        setDisplayPage(currentPage);

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          document.body.style.position = "fixed";
          document.body.style.top = "0px";
          document.body.style.width = "100%";
          document.body.style.overflow = "hidden";
        }, 400);
      } else {
        setSpotlightRect(null);
        setDisplayPage(currentPage);
      }
      return;
    }

    // 요소 찾기 (최대 10번 재시도)
    let retryCount = 0;
    const maxRetries = 10;

    const findElement = () => {
      const element = document.querySelector(`[data-guide="${config.highlightElement}"]`) as HTMLElement;
      if (!element) {
        retryCount++;
        if (retryCount < maxRetries) {
          // 요소가 아직 렌더링되지 않았을 수 있으므로 약간의 지연 후 재시도
          setTimeout(findElement, 100);
        }
        return;
      }

      // body가 fixed로 되어있으므로 현재 스크롤 위치 기준으로 계산
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      const rect = element.getBoundingClientRect();
      const actualTop = rect.top + scrollY;
      const isLastGuide = currentPage === GUIDE_PAGE_CONFIGS.length - 1;
      const isOutOfView = actualTop < scrollY || actualTop + rect.height > scrollY + window.innerHeight - 20;

      // 마지막 가이드면 무조건 최상단으로
      if (isLastGuide && scrollY > 0) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          document.body.style.position = "fixed";
          document.body.style.top = "0px";
          document.body.style.width = "100%";
          document.body.style.overflow = "hidden";

          const newRect = element.getBoundingClientRect();
          setSpotlightRect({
            top: newRect.top,
            left: newRect.left,
            width: newRect.width,
            height: newRect.height,
          });
          setDisplayPage(currentPage);
        }, 400);
      } else if (isOutOfView) {
        // 요소가 화면 밖에 있으면 해당 요소로 스크롤
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);

        element.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          const newScrollY = window.scrollY;
          document.body.style.position = "fixed";
          document.body.style.top = `-${newScrollY}px`;
          document.body.style.width = "100%";
          document.body.style.overflow = "hidden";

          const newRect = element.getBoundingClientRect();
          setSpotlightRect({
            top: newRect.top,
            left: newRect.left,
            width: newRect.width,
            height: newRect.height,
          });
          setDisplayPage(currentPage);
        }, 400);
      } else {
        // 바로 위치 파악
        setSpotlightRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        setDisplayPage(currentPage);
      }

      // 원래 z-index 저장
      const originalZIndex = element.style.zIndex || window.getComputedStyle(element).zIndex;
      originalZIndexRef.current = originalZIndex;

      // z-index를 1002로 설정하여 디머 위에 표시
      element.style.zIndex = "1002";
      setTargetElement(element);
    };

    // 약간의 지연을 두고 요소 찾기 (렌더링 완료 대기)
    const timeoutId = setTimeout(findElement, 100);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isOpen]);

  // 리사이즈 및 스크롤 시 스포트라이트 위치 업데이트 (throttling 적용)
  useEffect(() => {
    if (!isOpen || !targetElement) return;

    let rafId: number | null = null;
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps

    const updateSpotlight = () => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          lastUpdateTime = Date.now();
          const rect = targetElement!.getBoundingClientRect();
          setSpotlightRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
        });
        return;
      }

      lastUpdateTime = now;
      const rect = targetElement.getBoundingClientRect();
      setSpotlightRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    window.addEventListener("resize", updateSpotlight);
    window.addEventListener("scroll", updateSpotlight, true);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateSpotlight);
      window.removeEventListener("scroll", updateSpotlight, true);
    };
  }, [isOpen, targetElement]);

  // 모든 hooks는 early return 전에 호출되어야 함
  // 말풍선 위치/모양 계산용 (spotlightRect와 동기화된 config)
  const displayConfig = useMemo(() => GUIDE_PAGE_CONFIGS[displayPage], [displayPage]);
  const isLastPage = useMemo(() => currentPage === GUIDE_PAGE_CONFIGS.length - 1, [currentPage]);

  // 현재 페이지의 텍스트 가져오기 (메모이제이션)
  const guidePages = useMemo(
    () => [
      translate("guide.page1"),
      translate("guide.page2"),
      translate("guide.page3"),
      translate("guide.page4"),
      translate("guide.page5"),
      translate("guide.page6"),
      translate("guide.page7"),
    ],
    [translate]
  );
  const currentText = useMemo(() => guidePages[currentPage], [guidePages, currentPage]);

  const handleNext = useCallback(() => {
    if (isLastPage) {
      onClose();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLastPage, onClose]);

  // 몬스터볼 스타일 메모이제이션
  const monsterBallStyle = useMemo(() => {
    if (currentPage !== 3 || !spotlightRect) return null;
    return {
      top: `${spotlightRect.top + spotlightRect.height / 2 - 24}px`,
      left: `${spotlightRect.left + spotlightRect.width / 2 - 24}px`,
    };
  }, [currentPage, spotlightRect]);

  // 말풍선 스타일 메모이제이션 (displayPage/displayConfig 사용 - spotlightRect와 동기화)
  const talkingBoxStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {};
    const BUBBLE_HEIGHT = 151; // 말풍선 높이
    const MIN_TOP = 10; // 최소 상단 여백
    const MAX_TOP = typeof window !== "undefined" ? window.innerHeight - BUBBLE_HEIGHT - 10 : 600; // 최대 top 위치

    if (spotlightRect) {
      let top: number;
      let left: number;

      if (displayPage === 3) {
        top = spotlightRect.top + spotlightRect.height / 2 - 24 + 60;
        left = spotlightRect.left + spotlightRect.width / 2 - 96 - 70;
      } else {
        top = displayConfig.useTopBox
          ? spotlightRect.top - 150
          : spotlightRect.top + spotlightRect.height + 20;
        left = spotlightRect.left + spotlightRect.width / 2 - 86 + (displayConfig.useTopBox ? 80 : -80);
      }

      // 화면 경계 안에 들어오도록 clamp
      baseStyle.top = `${Math.max(MIN_TOP, Math.min(MAX_TOP, top))}px`;
      baseStyle.left = `${Math.max(10, left)}px`;
    } else {
      baseStyle.top = displayConfig.useTopBox
        ? "calc(45vh - 170px)"
        : "calc(45vh + 220px)";
    }

    return baseStyle;
  }, [spotlightRect, displayPage, displayConfig.useTopBox]);

  if (!isOpen) return null;

  return (
    <>
      {/* 스포트라이트 오버레이 (디머) - 터치 안되게 */}
      {spotlightRect ? (
        // 펀칭 방식 (box-shadow 사용) - 하이라이트 요소가 있을 때
        <>
          {/* 전체 화면 디머 */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
          {/* 하이라이트 영역 위에 투명한 레이어로 터치 막기 */}
          <div
            className="fixed pointer-events-none"
            style={{
              top: `${spotlightRect.top}px`,
              left: `${spotlightRect.left}px`,
              width: `${spotlightRect.width}px`,
              height: `${spotlightRect.height}px`,
              zIndex: 1001,
            }}
          />
        </>
      ) : (
        // 전체 화면 디머 - 하이라이트 요소가 없을 때 (1단계, 7단계)
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />
      )}

      {/* 전체 화면 투명 레이어 - 클릭하면 다음 페이지 */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 1002 }}
        onClick={handleNext}
      />

      {/* 가이드 모달 컨텐츠 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1003 }}
      >
        {/* 오박사 캐릭터 - 1페이지와 7페이지만 표시 */}
        {/* 모바일: 15vw, 데스크탑: 컨테이너(390px) 중앙 기준 15% */}
        {(currentPage === 0 || currentPage === 6) && (
          <div
            className="absolute pointer-events-auto left-[15vw] md:left-[calc((100vw-390px)/2+58.5px)]"
            style={{
              top: "45vh",
            }}
          >
            <Image
              src={DoctorOh}
              alt="오박사"
              width={105}
              height={188}
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* page 4일 때 몬스터볼 이미지 표시 */}
        {monsterBallStyle && (
          <div
            className="absolute pointer-events-auto"
            style={monsterBallStyle}
          >
            <Image
              src={MonsterBallClose}
              alt="몬스터볼"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* 말풍선 - 하이라이트 위치 따라가거나 오박사 머리 위쪽 */}
        <div
          className={`absolute pointer-events-auto transition-all duration-200 ease-out ${
            !spotlightRect
              ? "left-[calc(15vw+90px)] md:left-[calc((100vw-410px)/2+138.5px)]"
              : ""
          }`}
          style={talkingBoxStyle}
        >
          <div className="relative w-[192px] min-h-[151px] max-h-[300px]">
            <Image
              src={displayConfig.useTopBox ? TalkingBoxTop : TalkingBoxBottom}
              alt="말풍선"
              className="object-contain w-full h-full"
              priority
            />
            {/* 말풍선 텍스트 - 말풍선과 동일한 크기, 내부는 패딩으로 */}
            {/* useTopBox가 true면 위쪽 말풍선(꼬랑지 아래), false면 아래쪽 말풍선(꼬랑지 위) */}
            <div
              className="absolute inset-0 flex items-center justify-center px-4 overflow-hidden"
              style={{
                paddingTop: displayConfig.useTopBox ? "12px" : "28px",
                paddingBottom: displayConfig.useTopBox ? "36px" : "12px",
              }}
            >
              <p
                className="text-black text-[12px] font-extrabold text-center whitespace-pre-line leading-relaxed w-full"
                style={{ overflowWrap: "anywhere", wordBreak: "keep-all" }}
              >
                {currentText}
              </p>
            </div>
          </div>
        </div>

        {/* 터치 영역 안내 텍스트 */}
        <p
          className="absolute text-white/80 text-sm pointer-events-auto"
          style={{
            bottom: "5vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {isLastPage ? translate("guide.tapToClose") : translate("guide.tapToNext")}
        </p>
      </div>
    </>
  );
}
