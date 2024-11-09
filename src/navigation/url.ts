import type { Locale } from "@/locale/locale";

export const endpoints = {
  auth: "/auth",
  bonds: "/bonds",
};

export const getBaseUrl = (endpoint: keyof typeof endpoints) => {
  return (lang: Locale) => `/${lang}${endpoints[endpoint]}`;
};
