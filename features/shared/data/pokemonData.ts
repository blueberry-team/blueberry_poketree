import { StaticImageData } from "next/image";

// 포켓몬 base 이미지 import
// 인덱스 딜레이를 위해 0번 포켓몬 추가 0 번 포켓몬은 없으므로 1번 이미지 사용
import Pokemon0 from "@/assets/images/pokemon/base/1-pokemon.png";
import Pokemon1 from "@/assets/images/pokemon/base/1-pokemon.png";
import Pokemon2 from "@/assets/images/pokemon/base/2-pokemon.png";
import Pokemon3 from "@/assets/images/pokemon/base/3-pokemon.png";
import Pokemon4 from "@/assets/images/pokemon/base/4-pokemon.png";
import Pokemon5 from "@/assets/images/pokemon/base/5-pokemon.png";
import Pokemon6 from "@/assets/images/pokemon/base/6-pokemon.png";
import Pokemon7 from "@/assets/images/pokemon/base/7-pokemon.png";
import Pokemon8 from "@/assets/images/pokemon/base/8-pokemon.png";
import Pokemon9 from "@/assets/images/pokemon/base/9-pokemon.png";
import Pokemon10 from "@/assets/images/pokemon/base/10-pokemon.png";
import Pokemon11 from "@/assets/images/pokemon/base/11-pokemon.png";
import Pokemon12 from "@/assets/images/pokemon/base/12-pokemon.png";
import Pokemon13 from "@/assets/images/pokemon/base/13-pokemon.png";
import Pokemon14 from "@/assets/images/pokemon/base/14-pokemon.png";
import Pokemon15 from "@/assets/images/pokemon/base/15-pokemon.png";
import Pokemon16 from "@/assets/images/pokemon/base/16-pokemon.png";
import Pokemon17 from "@/assets/images/pokemon/base/17-pokemon.png";
import Pokemon18 from "@/assets/images/pokemon/base/18-pokemon.png";
import Pokemon19 from "@/assets/images/pokemon/base/19-pokemon.png";
import Pokemon20 from "@/assets/images/pokemon/base/20-pokemon.png";
import Pokemon21 from "@/assets/images/pokemon/base/21-pokemon.png";
import Pokemon22 from "@/assets/images/pokemon/base/22-pokemon.png";
import Pokemon23 from "@/assets/images/pokemon/base/23-pokemon.png";
import Pokemon24 from "@/assets/images/pokemon/base/24-pokemon.png";
import Pokemon25 from "@/assets/images/pokemon/base/25-pokemon.png";
import Pokemon26 from "@/assets/images/pokemon/base/26-pokemon.png";
import Pokemon27 from "@/assets/images/pokemon/base/27-pokemon.png";
import Pokemon28 from "@/assets/images/pokemon/base/28-pokemon.png";
import Pokemon29 from "@/assets/images/pokemon/base/29-pokemon.png";
import Pokemon30 from "@/assets/images/pokemon/base/30-pokemon.png";
import Pokemon31 from "@/assets/images/pokemon/base/31-pokemon.png";
import Pokemon32 from "@/assets/images/pokemon/base/32-pokemon.png";
import Pokemon33 from "@/assets/images/pokemon/base/33-pokemon.png";
import Pokemon34 from "@/assets/images/pokemon/base/34-pokemon.png";
import Pokemon35 from "@/assets/images/pokemon/base/35-pokemon.png";
import Pokemon36 from "@/assets/images/pokemon/base/36-pokemon.png";
import Pokemon37 from "@/assets/images/pokemon/base/37-pokemon.png";
import Pokemon38 from "@/assets/images/pokemon/base/38-pokemon.png";
import Pokemon39 from "@/assets/images/pokemon/base/39-pokemon.png";
import Pokemon40 from "@/assets/images/pokemon/base/40-pokemon.png";
import Pokemon41 from "@/assets/images/pokemon/base/41-pokemon.png";
import Pokemon42 from "@/assets/images/pokemon/base/42-pokemon.png";
import Pokemon43 from "@/assets/images/pokemon/base/43-pokemon.png";
import Pokemon44 from "@/assets/images/pokemon/base/44-pokemon.png";
import Pokemon45 from "@/assets/images/pokemon/base/45-pokemon.png";
import Pokemon46 from "@/assets/images/pokemon/base/46-pokemon.png";
import Pokemon47 from "@/assets/images/pokemon/base/47-pokemon.png";
import Pokemon48 from "@/assets/images/pokemon/base/48-pokemon.png";
import Pokemon49 from "@/assets/images/pokemon/base/49-pokemon.png";
import Pokemon50 from "@/assets/images/pokemon/base/50-pokemon.png";
import Pokemon51 from "@/assets/images/pokemon/base/51-pokemon.png";
import Pokemon52 from "@/assets/images/pokemon/base/52-pokemon.png";
import Pokemon53 from "@/assets/images/pokemon/base/53-pokemon.png";
import Pokemon54 from "@/assets/images/pokemon/base/54-pokemon.png";
import Pokemon55 from "@/assets/images/pokemon/base/55-pokemon.png";
import Pokemon56 from "@/assets/images/pokemon/base/56-pokemon.png";
import Pokemon57 from "@/assets/images/pokemon/base/57-pokemon.png";
import Pokemon58 from "@/assets/images/pokemon/base/58-pokemon.png";
import Pokemon59 from "@/assets/images/pokemon/base/59-pokemon.png";
import Pokemon60 from "@/assets/images/pokemon/base/60-pokemon.png";
import Pokemon61 from "@/assets/images/pokemon/base/61-pokemon.png";
import Pokemon62 from "@/assets/images/pokemon/base/62-pokemon.png";
import Pokemon63 from "@/assets/images/pokemon/base/63-pokemon.png";
import Pokemon64 from "@/assets/images/pokemon/base/64-pokemon.png";
import Pokemon65 from "@/assets/images/pokemon/base/65-pokemon.png";
import Pokemon66 from "@/assets/images/pokemon/base/66-pokemon.png";
import Pokemon67 from "@/assets/images/pokemon/base/67-pokemon.png";
import Pokemon68 from "@/assets/images/pokemon/base/68-pokemon.png";
import Pokemon69 from "@/assets/images/pokemon/base/69-pokemon.png";
import Pokemon70 from "@/assets/images/pokemon/base/70-pokemon.png";
import Pokemon71 from "@/assets/images/pokemon/base/71-pokemon.png";
import Pokemon72 from "@/assets/images/pokemon/base/72-pokemon.png";
import Pokemon73 from "@/assets/images/pokemon/base/73-pokemon.png";
import Pokemon74 from "@/assets/images/pokemon/base/74-pokemon.png";
import Pokemon75 from "@/assets/images/pokemon/base/75-pokemon.png";
import Pokemon76 from "@/assets/images/pokemon/base/76-pokemon.png";
import Pokemon77 from "@/assets/images/pokemon/base/77-pokemon.png";
import Pokemon78 from "@/assets/images/pokemon/base/78-pokemon.png";
import Pokemon79 from "@/assets/images/pokemon/base/79-pokemon.png";
import Pokemon80 from "@/assets/images/pokemon/base/80-pokemon.png";
import Pokemon81 from "@/assets/images/pokemon/base/81-pokemon.png";

/*
// 포켓몬 webp이미지 동적 import (주석처리)
import Pokemon1 from "@/assets/images/pokemonWebp/pokemon/pokemon1.webp";
import Pokemon2 from "@/assets/images/pokemonWebp/pokemon/pokemon2.webp";
import Pokemon3 from "@/assets/images/pokemonWebp/pokemon/pokemon3.webp";
... (생략)
import Pokemon151 from "@/assets/images/pokemonWebp/pokemon/pokemon151.webp";
*/

/**
 * 전체 포켓몬 이미지 배열 (인덱스 0 = 포켓몬 1번)
 */
export const ALL_POKEMON_IMAGES: StaticImageData[] = [
  Pokemon0, Pokemon1, Pokemon2, Pokemon3, Pokemon4, Pokemon5, Pokemon6, Pokemon7, Pokemon8, Pokemon9, Pokemon10,
  Pokemon11, Pokemon12, Pokemon13, Pokemon14, Pokemon15, Pokemon16, Pokemon17, Pokemon18, Pokemon19, Pokemon20,
  Pokemon21, Pokemon22, Pokemon23, Pokemon24, Pokemon25, Pokemon26, Pokemon27, Pokemon28, Pokemon29, Pokemon30,
  Pokemon31, Pokemon32, Pokemon33, Pokemon34, Pokemon35, Pokemon36, Pokemon37, Pokemon38, Pokemon39, Pokemon40,
  Pokemon41, Pokemon42, Pokemon43, Pokemon44, Pokemon45, Pokemon46, Pokemon47, Pokemon48, Pokemon49, Pokemon50,
  Pokemon51, Pokemon52, Pokemon53, Pokemon54, Pokemon55, Pokemon56, Pokemon57, Pokemon58, Pokemon59, Pokemon60,
  Pokemon61, Pokemon62, Pokemon63, Pokemon64, Pokemon65, Pokemon66, Pokemon67, Pokemon68, Pokemon69, Pokemon70,
  Pokemon71, Pokemon72, Pokemon73, Pokemon74, Pokemon75, Pokemon76, Pokemon77, Pokemon78, Pokemon79, Pokemon80,
  Pokemon81,
];

/**
 * 포켓몬 인덱스로 이미지 가져오기
 * @param index 포켓몬 번호 (1~81)
 * @returns 해당 포켓몬 이미지
 */
export function getPokemonImage(index: number): StaticImageData {
  // 인덱스 범위 검증 (1~81)
  const validIndex = Math.max(1, Math.min(81, index));
  return ALL_POKEMON_IMAGES[validIndex - 1];
}

/**
 * 랜덤하게 n마리 포켓몬 이미지 선택
 * @param count 선택할 포켓몬 수
 * @returns 랜덤 포켓몬 이미지 배열
 */
export function getRandomPokemonImages(count: number): StaticImageData[] {
  const shuffled = [...ALL_POKEMON_IMAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 랜덤하게 n개의 포켓몬 인덱스 선택
 * @param count 선택할 포켓몬 수
 * @returns 랜덤 포켓몬 인덱스 배열 (1~81)
 */
export function getRandomPokemonIndices(count: number): number[] {
  const indices = Array.from({ length: 81 }, (_, i) => i + 1);
  const shuffled = indices.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
