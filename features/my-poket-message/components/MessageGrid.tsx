"use client";

import Image from "next/image";
import { Letter } from "@/features/my-tree/models/res/GetUserTreeResponse";
import { POKEMON_DATA } from "@/features/my-pokedex/models/data/pokemonData";

interface MessageGridProps {
  messages: Letter[];
  onMessageClick?: (index: number) => void;
}

export function MessageGrid({ messages, onMessageClick }: MessageGridProps) {
  // pokemonId로 포켓몬 이미지 가져오기
  const getPokemonImage = (pokemonId: number) => {
    const pokemon = POKEMON_DATA.find((p) => p.id === pokemonId);
    return pokemon?.imageActive;
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] bg-[#F7F7F7] px-4 py-4 border-b-2 border-black h-full"
      >
        <div className="grid grid-cols-3 gap-3">
          {messages.map((message, index) => {
            const pokemonImage = getPokemonImage(message.letter_pokemon);
            const isRead = message.is_read === "true";

            return (
              <div
                key={message.letter_id}
                onClick={() => onMessageClick?.(index)}
                className={`flex flex-col items-center p-3 rounded-lg shadow-sm cursor-pointer transition-colors ${
                  isRead ? "bg-white hover:bg-gray-50" : "bg-yellow-50 hover:bg-yellow-100"
                }`}
              >
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
