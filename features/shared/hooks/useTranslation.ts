import { useLanguage } from "./useLanguage";
import { getTranslation, TranslationKey } from "../locales/translations";

export function useTranslation() {
  const { language } = useLanguage();

  const translate = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return { translate, language };
}
