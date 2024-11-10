import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { navigation } from "@/navigation/url";

export async function logout() {
  "use server";
  (await cookies()).delete("session");

  redirect(navigation.login);
}
