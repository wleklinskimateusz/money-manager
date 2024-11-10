"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { signup } from "../actions/signup";
import { AuthTranslation } from "../locale/get-auth-translation";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { toast } from "sonner";
import { navigation } from "@/navigation/url";

export const SignupForm = ({
  fields,
  actions,
  errors,
}: {
  fields: AuthTranslation["signup"]["fields"];
  actions: AuthTranslation["signup"]["actions"];
  errors: AuthTranslation["signup"]["errors"];
}) => {
  return (
    <Form
      className="flex w-full flex-col gap-4 p-4"
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;

        if (password !== confirmPassword) {
          toast.error(errors.passwordMismatch);

          return;
        }

        const error = await signup({
          email,
          password,
          firstName,
          lastName,
        });
        if (error.statusCode === 409) {
          toast.error(errors.userAlreadyExists, {
            action: (
              <Button variant="link">
                <Link href={navigation.login}>{actions.login}</Link>
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
        <Label htmlFor="firstName">{fields.firstName}</Label>
        <Input required type="text" name="firstName" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lastName">{fields.lastName}</Label>
        <Input required type="text" name="lastName" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{fields.email}</Label>
        <Input required type="email" name="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">{fields.password}</Label>
        <Input required type="password" name="password" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">{fields.confirmPassword}</Label>
        <Input required type="password" name="confirmPassword" />
      </div>
      <SubmitButton loadingText={actions.signup.loadingText}>
        {actions.signup.text}
      </SubmitButton>
      <Button type="button" variant="link">
        <Link href={navigation.login}>{actions.login}</Link>
      </Button>
    </Form>
  );
};
