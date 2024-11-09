import "server-only";
import type { Locale } from "./locale";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
};

export function getDictionaryFactory<T>(
  dict: Record<Locale, () => Promise<T>>,
) {
  return async (locale: Locale) => {
    return dict[locale]();
  };
}

export const getSharedTranslation = getDictionaryFactory(dictionaries);
