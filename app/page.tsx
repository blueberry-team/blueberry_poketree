"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tree } from "@/features/my-tree/components/Tree";
import { ALL_POKEMON_IMAGES } from "@/features/shared/data/pokemonData";
import MakePokeTreeIcon from "@/assets/icon/makePokeTreeIcon.svg";
import GiftBoxIcon from "@/assets/icon/giftBoxIcon.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

// 랜딩 페이지
export default function LandingPage() {
  const router = useRouter();
  const { translate } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const currentPage = 0;
  const displayedPokemons = ALL_POKEMON_IMAGES.slice(0, 6);
  const totalMessageCount = 15;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date("2025-12-25T00:00:00");
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const daysStr = String(timeLeft.days).padStart(2, "0");
  const hoursStr = String(timeLeft.hours).padStart(2, "0");
  const minutesStr = String(timeLeft.minutes).padStart(2, "0");

  // 정적 화면이므로 인터렉션 없음
  const handleLetterClick = () => { };

  // 포케트리 만들기 버튼 클릭 핸들러
  const handleMakePokeTree = () => {
    router.push("/signup-or-go");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-3 shrink-0">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-center">
          {/* 크리스마스 카운트다운 */}
          <div className="flex items-center gap-1 text-[18px]">
            <span className="font-bold">{translate("landing.countdown")}</span>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {daysStr[0]}
              </span>
            </div>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {daysStr[1]}
              </span>
            </div>
            <span className="font-bold">{translate("landing.days")}</span>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {hoursStr[0]}
              </span>
            </div>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {hoursStr[1]}
              </span>
            </div>
            <span className="font-bold">{translate("landing.hours")}</span>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {minutesStr[0]}
              </span>
            </div>
            <div className="bg-white flex items-center justify-center" style={{ width: "22px", height: "34px" }}>
              <span className="text-black font-bold text-[18px]" style={{ fontFamily: "var(--font-press-start)" }}>
                {minutesStr[1]}
              </span>
            </div>
            <span className="font-bold">{translate("landing.minutes")}</span>
          </div>
          <div className="flex items-center justify-start gap-1 mt-2 px-4">
            <Image src={GiftBoxIcon} alt="Gift" width={16} height={16} />
            <p className="font-bold text-[12px] -mb-0.5">
              {translate("landing.description1")}
            </p>
          </div>
        </div>

      </div>

      {/* 바디 영역 */}
      <Tree
        obtainedPokemons={displayedPokemons}
        totalMessageCount={totalMessageCount}
        currentPage={currentPage}
        onLetterClick={handleLetterClick}
      />

      {/* 푸터 영역 */}
      <div className="px-4 py-4 shrink-0 relative min-h-[200px] flex flex-col items-center">
        <p className="text-center font-semibold text-[18px]">
          {translate("landing.description2")}
        </p>

        {/* 포켓몬 이미지와 아이콘 */}
        <div className="flex gap-4 mt-4 items-center">
          <Image
            src={ALL_POKEMON_IMAGES[0]}
            alt="Pokemon 1"
            width={80}
            height={80}
          />

          {/* 중앙 아이콘 + 텍스트 */}
          <div className="relative cursor-pointer" onClick={handleMakePokeTree}>
            <Image
              src={MakePokeTreeIcon}
              alt="Make PokeTree"
              width={218}
              height={60.84}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-center" style={{ fontSize: "20.28px" }}>
                {translate("landing.makeTree")}
              </span>
            </div>
          </div>

          <Image
            src={ALL_POKEMON_IMAGES[142]}
            alt="Pokemon 143"
            width={80}
            height={80}
          />
        </div>
      </div>

    </div>
  );
}
