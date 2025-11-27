"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ALL_POKEMON_IMAGES } from "@/features/shared/data/pokemonData";
import MakePokeTreeIcon from "@/assets/images/components/button_large_green.png";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

export function LandingFooter() {
  const router = useRouter();
  const { translate } = useTranslation();

  const handleMakePokeTree = () => {
    router.push("/signup-or-go");
  };

  return (
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
  );
}
