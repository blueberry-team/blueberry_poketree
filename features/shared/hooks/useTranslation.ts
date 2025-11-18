import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation, TranslationKey } from "../locales/translations";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return { t, language };
}
