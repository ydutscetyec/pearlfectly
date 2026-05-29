"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "Could not create account.");
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-6 py-12 text-[#1B1411] dark:bg-[#1B1411] dark:text-[#FFF8EF]">
      <div className="mx-auto max-w-xl rounded-[3rem] border border-[#B89A5E]/20 bg-[#FFFDF7] p-10 shadow-2xl dark:border-white/10 dark:bg-[#161616]">
        <h1 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF]">Create Your Pearl Account</h1>
        <p className="mt-3 text-sm text-[#1B1411]/70 dark:text-white/60">
          Set up a membership and use Google or Facebook to sign in faster.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">
            Full Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              required
              className="mt-2 w-full rounded-[1.5rem] border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-[#1B1411] outline-none focus:border-[#B89A5E]"
            />
          </label>

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
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#1B1411]/70 dark:text-white/60">
          Already have an account? <a href="/signin" className="font-semibold underline">Sign in</a>.
        </p>
      </div>
    </div>
  );
}
