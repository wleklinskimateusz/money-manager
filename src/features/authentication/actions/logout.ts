import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthUrl } from "../navigation/get-auth-url";
import { getLocale } from "@/locale/get-locale";

export async function logout() {
  "use server";
  (await cookies()).delete("session");

  const lang = await getLocale();

  redirect(getAuthUrl(lang, "login"));
}
