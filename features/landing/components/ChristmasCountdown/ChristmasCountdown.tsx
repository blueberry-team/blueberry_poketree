"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GiftBoxIcon from "@/assets/icon/giftBoxIcon.svg";
import ButtonSmallDark from "@/assets/images/components/button_small_dark.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { trackButtonClick } from "@/features/shared/utils/analytics/analytics";

export function ChristmasCountdown() {
  const router = useRouter();
  const { translate } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  const handleLogin = () => {
    trackButtonClick("button_click_home_login");
    router.push("/signup-or-go?from=login");
  };

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
    <div className="flex flex-col items-center w-full overflow-hidden text-white">
      {/* 크리스마스 카운트다운 */}
      <div className="flex items-center gap-2 text-[18px] flex-wrap justify-center px-4">
        <span className="font-bold">{translate("landing.countdown")}</span>

        {/* Days, Hours, Minutes를 하나의 그룹으로 묶어서 함께 줄넘김되도록 */}
        <div className="flex items-center gap-2 shrink-0">
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
      </div>

      {/* 선물 메시지 + 로그인 버튼 */}
      <div className="flex items-center justify-around w-full mt-4">
        <div className="flex items-center gap-1 min-w-0">
          <Image src={GiftBoxIcon} alt="Gift" width={16} height={16} className="shrink-0" />
          <p className="font-bold text-[12px] -mb-0.5">
            {translate("landing.description1")}
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="relative flex items-center justify-center shrink-0"
          style={{ width: "66px", height: "28px" }}
        >
          <Image
            src={ButtonSmallDark}
            alt={translate("header.login")}
            fill
            className="object-fill"
          />
          <span className="relative z-10 text-white text-[12px] font-extrabold">
            {translate("header.login")}
          </span>
        </button>
      </div>
    </div>
  );
}
