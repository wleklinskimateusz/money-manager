import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";
import { getAuthTranslation } from "../locale/get-auth-translation";
import type { Locale } from "@/locale/locale";

export async function LogoutButton({ lang }: { lang: Locale }) {
  const { logout: logoutText } = await getAuthTranslation(lang);
  return (
    <Button type="button" variant="destructive" onClick={logout}>
      {logoutText}
    </Button>
  );
}
