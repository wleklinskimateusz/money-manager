import { register } from "@/server/auth/register";
import Form from "next/dist/client/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <h1 className="text-4xl font-bold">Signup</h1>
      <Form
        className="flex w-80 flex-col gap-4 p-4"
        action={async (formDate) => {
          "use server";
          const email = formDate.get("email") as string;
          const password = formDate.get("password") as string;
          const confirmPassword = formDate.get("confirmPassword") as string;
          const firstName = formDate.get("firstName") as string;
          const lastName = formDate.get("lastName") as string;

          if (
            !email ||
            !password ||
            !confirmPassword ||
            !firstName ||
            !lastName
          )
            return;

          if (password !== confirmPassword) return;

          await register({
            email,
            password,
            firstName,
            lastName,
          });
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input type="password" name="confirmPassword" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" name="firstName" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" name="lastName" />
        </div>
        <SubmitButton loadingText="Signing up...">Signup</SubmitButton>
        <Button type="button" variant="link">
          <Link href="/login">Login</Link>
        </Button>
      </Form>
    </>
  );
}
