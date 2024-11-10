import { getDictionaryFactory } from "@/locale/get-shared-translation";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
};

export type BondsTranslation = Awaited<
  ReturnType<(typeof dictionaries)[keyof typeof dictionaries]>
>;

export const getBondsTranslation = getDictionaryFactory(dictionaries);