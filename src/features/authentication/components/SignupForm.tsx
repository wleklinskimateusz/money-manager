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
import { FormField } from "@/components/form-field";

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
      <FormField>
        <Label htmlFor="firstName">{fields.firstName}</Label>
        <Input required type="text" name="firstName" />
      </FormField>
      <FormField>
        <Label htmlFor="lastName">{fields.lastName}</Label>
        <Input required type="text" name="lastName" />
      </FormField>
      <FormField>
        <Label htmlFor="email">{fields.email}</Label>
        <Input required type="email" name="email" />
      </FormField>
      <FormField>
        <Label htmlFor="password">{fields.password}</Label>
        <Input required type="password" name="password" />
      </FormField>
      <FormField>
        <Label htmlFor="confirmPassword">{fields.confirmPassword}</Label>
        <Input required type="password" name="confirmPassword" />
      </FormField>
      <SubmitButton loadingText={actions.signup.loadingText}>
        {actions.signup.text}
      </SubmitButton>
      <Button type="button" variant="link">
        <Link href={navigation.login}>{actions.login}</Link>
      </Button>
    </Form>
  );
};
