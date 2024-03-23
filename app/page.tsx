"use client";
import { Login } from "./component/SignIn";
import Link from "next/link";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { config } from "dotenv";
import HomeChat from "../app/component/chat/Home";
import { XMTPProvider } from "@xmtp/react-sdk";

config();

export function FloatingInbox({ wallet, onLogout, env }: any) {
  return (
    <XMTPProvider>
      <HomeChat
        isPWA={false}
        wallet={wallet}
        onLogout={onLogout}
        isConsent={false}
        isContained={false}
        env={env}
      />
    </XMTPProvider>
  );
}

export default function Home() {
  const { ready, authenticated, user, logout } = usePrivy();

  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mt-6 flex justify-center text-center">
          <a href="/connect">
            <button className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg">
              Expert Connect powered By Livepeer
            </button>
          </a>
        </div>
        <Login />
        <FloatingInbox env={process.env.NEXT_PUBLIC_XMTP_ENV} />
      </main>
    </PrivyProvider>
  );
}
