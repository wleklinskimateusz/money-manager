import { logout } from "@/server/auth/logout";

export default async function Home() {
  return (
    <main>
      Hello There
      <button onClick={logout}>Logout</button>
    </main>
  );
}
