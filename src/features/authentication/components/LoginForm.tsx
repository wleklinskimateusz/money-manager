"use client";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { login } from "../actions/login";
import type { AuthTranslation } from "../locale/get-auth-translation";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const LoginForm = ({
  fields,
  actions,
  signupUrl,
  errors,
}: {
  fields: AuthTranslation["login"]["fields"];
  actions: AuthTranslation["login"]["actions"];
  errors: AuthTranslation["login"]["errors"];
  signupUrl: string;
}) => {
  return (
    <Form
      className="flex w-full flex-col gap-4 p-4"
      action={async (formDate) => {
        const email = formDate.get("email");
        const password = formDate.get("password");
        if (!email || !password) return;
        const error = await login(email as string, password as string);

        if (error.statusCode === 400) {
          toast.error(errors.invalidPassword);
        }
        if (error.statusCode === 404) {
          toast.error(errors.userNotFound, {
            action: (
              <Button variant="link">
                <Link href={signupUrl}>{actions.signup}</Link>
              </Button>
            ),
          });
        }
        if (error.statusCode === 500) {
          toast.error(errors.internalServerError);
        }
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{fields.email}</Label>
        <Input required type="email" name="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">{fields.password}</Label>
        <Input required type="password" name="password" />
      </div>
      <SubmitButton loadingText={actions.login.loadingText}>
        {actions.login.text}
      </SubmitButton>
      <Button type="button" variant="link">
        <Link href={signupUrl}>{actions.signup}</Link>
      </Button>
    </Form>
  );
};
