import type { Locale } from "@/locale/locale";
import { getAuthTranslation } from "../locale/get-auth-translation";
import { getAuthUrl } from "../navigation/get-auth-url";
import { LoginForm } from "./LoginForm";

export const LoginPage = async ({ lang }: { lang: Locale }) => {
  const {
    login: { title, fields, actions, errors },
  } = await getAuthTranslation(lang);
  return (
    <>
      <h1 className="text-4xl font-bold">{title}</h1>
      <LoginForm
        fields={fields}
        actions={actions}
        errors={errors}
        signupUrl={getAuthUrl(lang, "signup")}
      />
    </>
  );
};
