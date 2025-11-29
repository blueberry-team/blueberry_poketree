"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation, TranslationKey } from "@/features/shared/utils/translate/useLanguage";

// 에러 타입별 번역 키 매핑
const ERROR_TYPE_MAP: Record<string, TranslationKey> = {
  pokedex: "error.pokedexNotFound",
  tree: "error.treeNotFound",
  load: "error.loadFailed",
  default: "error.defaultMessage",
};

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { translate } = useTranslation();

  // Query params에서 에러 정보 추출
  const errorType = searchParams.get("type") || "default";
  const customMessage = searchParams.get("message");

  // 에러 메시지 결정: custom > type별 번역 > 기본값
  const translationKey = ERROR_TYPE_MAP[errorType] || ERROR_TYPE_MAP.default;
  const displayMessage = customMessage || translate(translationKey);
  const displayTitle = translate("error.title");
  const displayButtonText = translate("error.goHome");

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-[#BF0120]">
      <h1 className="text-xl font-bold">{displayTitle}</h1>
      <p>{displayMessage}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {displayButtonText}
      </button>
    </div>
  );
}
