import { locales } from "./locale";

import { Locale } from "./locale";

import { headers } from "next/headers";

export async function getLocale() {
  const lang = (await headers()).get("accept-language")?.split(",")[0];
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }

  return locales[0] as Locale;
}
