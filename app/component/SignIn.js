"use client";
import { usePrivy } from "@privy-io/react-auth";
import PollCreator from "./Poll";

export const Login = () => {
  const { login } = usePrivy();
  const { ready, authenticated, user, logout } = usePrivy();
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {ready && authenticated ? (
        <>
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-semibold">Cointopper</h1>
          </div>
          <button
            onClick={logout}
            className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="mt-6 flex justify-center text-center">
          <button
            className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
            onClick={login}
          >
            Log in with privy
          </button>
        </div>
      )}
      <PollCreator />
    </div>
  );
};
