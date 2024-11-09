import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/server/auth/login";
import Form from "next/form";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <h1 className="text-4xl font-bold">Login</h1>
      <Form
        className="flex w-80 flex-col gap-4 p-4"
        action={async (formDate) => {
          "use server";
          const email = formDate.get("email");
          const password = formDate.get("password");
          if (!email || !password) return;
          await login(email as string, password as string);
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
        <SubmitButton loadingText="Logging in...">Login</SubmitButton>
        <Button type="button" variant="link">
          <Link href="/signup">Signup</Link>
        </Button>
      </Form>
    </>
  );
}
