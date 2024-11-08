import { register } from "@/server/auth/register";
import Form from "next/dist/client/form";

export default function Signup() {
  return (
    <Form
      className="w-full"
      action={async (formDate) => {
        "use server";
        const email = formDate.get("email") as string;
        const password = formDate.get("password") as string;
        const confirmPassword = formDate.get("confirmPassword") as string;
        const firstName = formDate.get("firstName") as string;
        const lastName = formDate.get("lastName") as string;

        if (!email || !password || !confirmPassword || !firstName || !lastName)
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
      <div className="flex flex-col gap-4 p-4">
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
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="rounded-md border p-2"
            type="password"
            name="confirmPassword"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            className="rounded-md border p-2"
            type="text"
            name="firstName"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="rounded-md border p-2"
            type="text"
            name="lastName"
          />
        </div>
        <button className="rounded-md bg-blue-500 p-2 text-white" type="submit">
          Signup
        </button>
      </div>
    </Form>
  );
}
