import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Head from 'next/head';

export default function DashboardPage() {
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout
  } = usePrivy();

  useEffect(() => {
    console.log('fid', user?.farcaster?.fid);

    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  // const numAccounts = user?.linkedAccounts?.length || 0;
  // const canRemoveAccount = numAccounts > 1;

  // const email = user?.email;
  // const phone = user?.phone;
  // const wallet = user?.wallet;

  // const googleSubject = user?.google?.subject || null;
  // const twitterSubject = user?.twitter?.subject || null;
  // const discordSubject = user?.discord?.subject || null;

  return (
    <>
      <Head>
        <title>Cointopper</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
        {ready && authenticated ? (
          <>
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
              <button
                onClick={logout}
                className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
              >
                Logout
              </button>
            </div>

          </>
        ) : null}
      </main>
    </>
  );
}
