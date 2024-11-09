import "server-only";
import { Locale } from "./locale";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
