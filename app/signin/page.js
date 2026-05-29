"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      setMessage("Invalid email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-6 py-12 text-[#1B1411] dark:bg-[#1B1411] dark:text-[#FFF8EF]">
      <div className="mx-auto max-w-xl rounded-[3rem] border border-[#B89A5E]/20 bg-[#FFFDF7] p-10 shadow-2xl dark:border-white/10 dark:bg-[#161616]">
        <h1 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF]">Sign In</h1>
        <p className="mt-3 text-sm text-[#1B1411]/70 dark:text-white/60">
          Continue with email, or use Google / Facebook if configured.
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
            className="w-full rounded-full bg-[#1B1411] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
          >
            Sign in with email
          </button>
        </form>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="rounded-full border border-[#B89A5E]/20 bg-white px-5 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#F4F0EB]"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn("facebook", { callbackUrl })}
            className="rounded-full border border-[#B89A5E]/20 bg-white px-5 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#F4F0EB]"
          >
            Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-[#1B1411]/70 dark:text-white/60">
          New here? <a href="/signup" className="font-semibold text-[#1B1411] underline">Create an account</a>.
        </p>
      </div>
    </div>
  );
}
