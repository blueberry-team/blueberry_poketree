"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import MakePokeTreeIcon from "@/assets/images/components/button_large_green.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { SocialMediaButton } from "@/features/shared/components/SocialMediaButton/SocialMediaButton";
import { trackButtonClick } from "@/features/shared/utils/analytics/analytics";
import { createButtonDebouncer } from "@/features/shared/utils/debounce/ButtonDebouncer";

export function LandingFooter() {
  const router = useRouter();
  const { translate } = useTranslation();

  // 디바운서 생성
  const debouncer = useMemo(() => createButtonDebouncer(), []);

  const handleMakePokeTree = useMemo(
    () => debouncer.debounceLeading(() => {
      trackButtonClick("button_click_home_make_tree");
      router.push("/signup-or-go?from=make_tree");
    }),
    [debouncer, router]
  );

  return (
    <div className="px-4 shrink-0 relative min-h-[200px] flex flex-col items-center">

      <p className="text-center font-semibold text-[18px] text-white mt-2">
        {translate("landing.description2")}
      </p>

      {/* 포켓몬 이미지와 아이콘 */}
      <div className="flex gap-4 mt-4 items-center">
        {/* 중앙 아이콘 + 텍스트 */}
        <div className="relative cursor-pointer" onClick={handleMakePokeTree}>
          <Image
            src={MakePokeTreeIcon}
            alt="Make PokeTree"
            width={218}
            height={60.84}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-extrabold text-center" style={{ fontSize: "20.28px" }}>
              {translate("landing.makeTree")}
            </span>
          </div>
        </div>
      </div>

      <SocialMediaButton />
    </div>
  );
}
