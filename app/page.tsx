"use client";
import { Login } from "./component/SignIn";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { config } from "dotenv";
config();

export default function Home() {
  const { ready, authenticated, user, logout } = usePrivy();

  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Login />
      </main>
    </PrivyProvider>
  );
}
