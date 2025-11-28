"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GiftBoxIcon from "@/assets/icon/giftBoxIcon.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

export function ChristmasCountdown() {
  const { translate } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

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

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* 크리스마스 카운트다운 */}
      <div className="flex items-center gap-2 text-[18px] flex-wrap justify-center">
        <span className="font-bold">{translate("landing.countdown")}</span>

        {/* Days 그룹 */}
        <div className="flex items-center gap-0.5 shrink-0">
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
        </div>

        {/* Hours 그룹 */}
        <div className="flex items-center gap-0.5 shrink-0">
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
        </div>

        {/* Minutes 그룹 */}
        <div className="flex items-center gap-0.5 shrink-0">
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
      </div>

      {/* 선물 메시지 */}
      <div className="flex items-center justify-start gap-1 mt-2 px-4">
        <Image src={GiftBoxIcon} alt="Gift" width={16} height={16} />
        <p className="font-bold text-[12px] -mb-0.5">
          {translate("landing.description1")}
        </p>
      </div>
    </div>
  );
}
