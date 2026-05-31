"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setMessage("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("SIGN IN ERROR:", error);
      setMessage("Something went wrong while signing in.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-6 py-12 text-[#1B1411] dark:bg-[#1B1411] dark:text-[#FFF8EF]">
      <div className="relative z-10 mx-auto max-w-xl rounded-[3rem] border border-[#B89A5E]/20 bg-[#FFFDF7] p-10 shadow-2xl dark:border-white/10 dark:bg-[#161616]">
        <h1 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF]">
          Sign In
        </h1>

        <p className="mt-3 text-sm text-[#1B1411]/70 dark:text-white/60">
          Sign in with your Pearlfectly account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-[1.5rem] border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-[#1B1411] outline-none focus:border-[#B89A5E]"
            />
          </label>

          <label className="block text-sm font-semibold">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              className="mt-2 w-full rounded-[1.5rem] border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-[#1B1411] outline-none focus:border-[#B89A5E]"
            />
          </label>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="relative z-20 w-full rounded-full bg-[#1B1411] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in with email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#1B1411]/70 dark:text-white/60">
          New here?{" "}
          <a
            href="/signup"
            className="font-semibold text-[#B89A5E] underline hover:text-[#FFF8EF]"
          >
            Create an account
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8EF] px-6 py-12 text-[#1B1411] dark:bg-[#1B1411] dark:text-[#FFF8EF]">
          Loading...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}