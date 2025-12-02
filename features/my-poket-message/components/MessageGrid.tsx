"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { Letter } from "@/features/my-tree/models/res/GetUserTreeResponse";
import { POKEMON_DATA } from "@/features/shared/data/pokemonData";
import LockIcon from "@/assets/icon/lockIcon.svg";

interface MessageGridProps {
  messages: Letter[];
  selectedIndex?: number;
  onMessageClick?: (index: number) => void;
}

export function MessageGrid({ messages, selectedIndex, onMessageClick }: MessageGridProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 선택된 항목이 바뀌면 자동 스크롤
  useEffect(() => {
    if (selectedIndex !== undefined && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // pokemonId로 포켓몬 base 이미지 가져오기
  const getPokemonImage = (pokemonId: number) => {
    const pokemon = POKEMON_DATA.find((p) => p.id === pokemonId);
    return pokemon?.imageBase;
  };

  return (
    <div className="flex flex-col h-full ">
      <div
        className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] bg-[#BF0120] px-4 py-4 border-b-2 border-black h-full"
      >
        <div className="grid grid-cols-3 gap-3 ">
          {messages.map((message, index) => {
            const pokemonImage = getPokemonImage(message.letter_pokemon);
            const isSelected = selectedIndex === index;

            return (
              <div
                key={message.letter_id}
                ref={(el) => { itemRefs.current[index] = el; }}
                onClick={() => onMessageClick?.(index)}
                className={`relative flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "border-2 border-[#EEF2F6] bg-[#16A9FE]"
                    : "border-4 border-[#EEF2F6] bg-white"
                }`}
              >
                {/* 인덱스 배지 */}
                <div className="absolute top-1 left-1 w-[25px] h-[16px] bg-black rounded-[4px] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{index + 1}</span>
                </div>

                {/* 비공개 자물쇠 아이콘 */}
                {message.is_open !== "true" && (
                  <div className="absolute top-1 right-1 w-[16px] h-[16px] flex items-center justify-center">
                    <Image src={LockIcon} alt="비공개" width={16} height={16} />
                  </div>
                )}

                {/* 포켓몬 이미지 */}
                <div className="w-16 h-16 relative">
                  {pokemonImage && (
                    <Image
                      src={pokemonImage}
                      alt={`Pokemon ${message.letter_pokemon}`}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {/* 발신자 이름 */}
                <p className="text-xs font-bold text-gray-800 truncate w-full text-center mt-2">
                  {message.sender_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
