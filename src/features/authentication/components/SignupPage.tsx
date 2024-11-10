import { getAuthTranslation } from "@/features/authentication/locale/get-auth-translation";
import type { Locale } from "@/locale/locale";
import { SignupForm } from "./SignupForm";

export const SignupPage = async ({ lang }: { lang: Locale }) => {
  const {
    signup: { title, fields, actions, errors },
  } = await getAuthTranslation(lang);
  return (
    <>
      <h1 className="text-4xl font-bold">{title}</h1>
      <SignupForm fields={fields} actions={actions} errors={errors} />
    </>
  );
};
