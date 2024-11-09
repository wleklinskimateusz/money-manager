import { getBaseUrl } from "@/navigation/url";
import { authEndpoints } from "./endpoints";
import type { Locale } from "@/locale/locale";

export const getAuthUrl = (
  lang: Locale,
  endpoint: keyof typeof authEndpoints,
) => {
  return `${getBaseUrl("auth")(lang)}${authEndpoints[endpoint]}`;
};
