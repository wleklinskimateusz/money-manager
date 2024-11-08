import { login } from "@/server/auth/login";
import Form from "next/form";
import Link from "next/link";
export default function Login() {
  return (
    <Form
      action={async (formDate) => {
        "use server";
        const email = formDate.get("email");
        const password = formDate.get("password");
        if (!email || !password) return;
        await login(email as string, password as string);
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input className="rounded-md border p-2" type="email" name="email" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-md border p-2"
          type="password"
          name="password"
        />
      </div>
      <button className="rounded-md bg-blue-500 p-2 text-white" type="submit">
        Login
      </button>
      <Link href="/signup">Signup</Link>
    </Form>
  );
}
