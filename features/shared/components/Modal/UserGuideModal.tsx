"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
    setSpotlightRect(null);

    // 하이라이트할 요소가 없으면 리턴
    if (!config.highlightElement) {
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

      // 위치 파악
      const rect = element.getBoundingClientRect();
      setSpotlightRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

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
  }, [currentPage, isOpen]);

  // 리사이즈 및 스크롤 시 스포트라이트 위치 업데이트
  useEffect(() => {
    if (!isOpen || !targetElement) return;

    const updateSpotlight = () => {
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
      window.removeEventListener("resize", updateSpotlight);
      window.removeEventListener("scroll", updateSpotlight, true);
    };
  }, [isOpen, targetElement]);

  if (!isOpen) return null;

  const currentConfig = GUIDE_PAGE_CONFIGS[currentPage];
  const isLastPage = currentPage === GUIDE_PAGE_CONFIGS.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onClose();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 현재 페이지의 텍스트 가져오기
  const guidePages = [
    translate("guide.page1"),
    translate("guide.page2"),
    translate("guide.page3"),
    translate("guide.page4"),
    translate("guide.page5"),
    translate("guide.page6"),
    translate("guide.page7"),
  ];
  const currentText = guidePages[currentPage];

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
              backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.8)`,
            }}
          />
        </>
      ) : (
        // 전체 화면 디머 - 하이라이트 요소가 없을 때 (1단계, 7단계)
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
        {currentPage === 3 && spotlightRect && (
          <div
            className="absolute pointer-events-auto"
            style={{
              top: `${spotlightRect.top + spotlightRect.height / 2 - 24}px`, // 하이라이트 영역 중앙
              left: `${spotlightRect.left + spotlightRect.width / 2 - 24}px`, // 하이라이트 영역 중앙
            }}
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
          className={`absolute pointer-events-auto ${
            !spotlightRect
              ? "left-[calc(15vw+90px)] md:left-[calc((100vw-410px)/2+138.5px)]"
              : ""
          }`}
          style={{
            // 하이라이트가 있으면 하이라이트 위치 기준, 없으면 오박사 머리 위쪽
            // page 4일 때는 몬스터볼 아래쪽에 배치
            top: spotlightRect
              ? currentPage === 3
                ? `${spotlightRect.top + spotlightRect.height / 2 - 24 + 60}px` // 몬스터볼 아래쪽
                : currentConfig.useTopBox
                ? `${spotlightRect.top - 150}px`
                : `${spotlightRect.top + spotlightRect.height + 20}px`
              : currentConfig.useTopBox
              ? "calc(45vh - 170px)"
              : "calc(45vh + 220px)",
            ...(spotlightRect
              ? {
                  // page 4일 때는 몬스터볼 중앙 기준으로 배치, 왼쪽으로 더 이동
                  left: currentPage === 3
                    ? `${spotlightRect.left + spotlightRect.width / 2 - 96 - 70}px` // 말풍선 너비의 절반만큼 왼쪽으로 + 추가로 40px 더
                    : `${spotlightRect.left + spotlightRect.width / 2 - 86 + (currentConfig.useTopBox ? 80 : -80)}px`,
                }
              : {}),
          }}
        >
          <div className="relative w-[192px] min-h-[151px] max-h-[300px]">
            <Image
              src={currentConfig.useTopBox ? TalkingBoxTop : TalkingBoxBottom}
              alt="말풍선"
              className="object-contain w-full h-full"
              priority
            />
            {/* 말풍선 텍스트 - 말풍선과 동일한 크기, 내부는 패딩으로 */}
            {/* useTopBox가 true면 위쪽 말풍선(꼬랑지 아래), false면 아래쪽 말풍선(꼬랑지 위) */}
            <div
              className="absolute inset-0 flex items-center justify-center px-2"
              style={{
                paddingTop: currentConfig.useTopBox ? "12px" : "28px",
                paddingBottom: currentConfig.useTopBox ? "36px" : "12px",
              }}
            >
              <span className="text-black text-[12px] font-extrabold text-center whitespace-pre-line leading-relaxed w-full flex items-center justify-center">
                {currentText}
              </span>
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
