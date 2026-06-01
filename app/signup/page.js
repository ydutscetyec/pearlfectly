"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Gem, Home, ShieldCheck } from "lucide-react";

function safeCallbackUrl(value, user) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/admin") && !user?.isAdmin) return "/";
  return value;
}

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8EF] px-5 py-10 text-[#1B1411] sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <img src="/background.png" alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,248,239,0.96),rgba(255,253,247,0.86),rgba(207,233,223,0.42))]" />
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#CFE9DF]/45 blur-3xl" />
        <div className="absolute right-[-8rem] top-1/4 h-96 w-96 rounded-full bg-[#F4C6D3]/35 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#B89A5E]/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2.75rem] border border-white/65 bg-[#FFF8EF]/72 shadow-2xl shadow-black/10 backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr]">
          <section className="relative hidden min-h-[640px] overflow-hidden border-r border-[#B89A5E]/18 bg-[#1B1411] p-10 text-[#FFF8EF] lg:block">
            <img src="/pink-pearl-gift-boxes.png" alt="Pearl jewelry gift boxes" className="absolute inset-0 h-full w-full object-cover opacity-38" />
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(27,20,17,0.92),rgba(74,56,50,0.70),rgba(27,20,17,0.86))]" />
            <div className="relative flex h-full flex-col justify-between">
              <a href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFF8EF]/20 bg-[#FFF8EF]/10 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:bg-[#FFF8EF] hover:text-[#1B1411]">
                <Home className="h-4 w-4" /> Back to shop
              </a>
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B89A5E]/40 bg-[#FFF8EF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#D9C7A5] backdrop-blur-md">
                  <Gem className="h-4 w-4" /> PEARLfectly
                </div>
                <h2 className="font-serif text-6xl leading-[0.95] tracking-[-0.04em]">
                  Create your client profile with boutique polish.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#FFF8EF]/72">
                  New customer accounts stay as shop customers by default. Admin access is only granted through configured admin emails.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-[#FFF8EF]/78">
                <div className="rounded-[1.5rem] border border-[#FFF8EF]/14 bg-[#FFF8EF]/10 p-4 backdrop-blur-md">
                  <ShieldCheck className="mb-3 h-5 w-5 text-[#D9C7A5]" /> Safer roles
                </div>
                <div className="rounded-[1.5rem] border border-[#FFF8EF]/14 bg-[#FFF8EF]/10 p-4 backdrop-blur-md">
                  <Gem className="mb-3 h-5 w-5 text-[#D9C7A5]" /> Personal checkout
                </div>
              </div>
            </div>
          </section>

          <section className="p-7 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-center justify-between gap-4">
              <a href="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="PEARLfectly logo" className="h-11 w-11 rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7] object-cover p-1 shadow-md" />
                <div>
                  <p className="font-serif text-2xl leading-none tracking-[0.1em] text-[#4A3832]">
                    PEARL<span className="tracking-normal">fectly</span>
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8A6A3F]">Pearls</p>
                </div>
              </a>
              <a href="/" className="rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/80 px-4 py-2 text-xs font-semibold text-[#4A3832] transition hover:bg-[#1B1411] hover:text-[#FFF8EF] lg:hidden">
                Home
              </a>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A3F]">Create Account</p>
              <h1 className="font-serif text-5xl leading-tight text-[#1B1411] sm:text-6xl">{title}</h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#4A3832]/70">{subtitle}</p>
            </div>

            {children}
            {footer}
          </section>
        </div>
      </div>
    </main>
  );
}

function SignUpContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not create account.");
        setIsLoading(false);
        return;
      }

      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginResult?.error) {
        setMessage("Account created, but automatic login failed. Please sign in.");
        setIsLoading(false);
        return;
      }

      const target = safeCallbackUrl(rawCallbackUrl, result.user);
      router.push(target);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please check your server or Supabase setup.");
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your pearl account"
      subtitle="Use one customer profile for signing in, checkout, and saved pearl shopping details."
      footer={
        <p className="mt-7 text-center text-sm text-[#4A3832]/70">
          Already have an account?{" "}
          <a href={`/signin?callbackUrl=${encodeURIComponent(rawCallbackUrl)}`} className="font-semibold text-[#8A6A3F] underline underline-offset-4 hover:text-[#1B1411]">
            Sign in
          </a>
          .
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-semibold text-[#4A3832]">
          Full Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
            className="mt-2 w-full rounded-[1.35rem] border border-[#B89A5E]/25 bg-[#FFFDF7]/82 px-4 py-3 text-[#1B1411] outline-none transition placeholder:text-[#4A3832]/35 focus:border-[#B89A5E] focus:ring-2 focus:ring-[#B89A5E]/15"
            placeholder="Pearl Client"
          />
        </label>

        <label className="block text-sm font-semibold text-[#4A3832]">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="mt-2 w-full rounded-[1.35rem] border border-[#B89A5E]/25 bg-[#FFFDF7]/82 px-4 py-3 text-[#1B1411] outline-none transition placeholder:text-[#4A3832]/35 focus:border-[#B89A5E] focus:ring-2 focus:ring-[#B89A5E]/15"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-semibold text-[#4A3832]">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            minLength={6}
            className="mt-2 w-full rounded-[1.35rem] border border-[#B89A5E]/25 bg-[#FFFDF7]/82 px-4 py-3 text-[#1B1411] outline-none transition placeholder:text-[#4A3832]/35 focus:border-[#B89A5E] focus:ring-2 focus:ring-[#B89A5E]/15"
            placeholder="At least 6 characters"
          />
        </label>

        {message && (
          <p className="rounded-[1.15rem] border border-[#F4C6D3]/70 bg-[#FAE0E7]/78 px-4 py-3 text-sm text-[#1B1411]">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full overflow-hidden rounded-full bg-[#1B1411] px-5 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-xl shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {isLoading ? "Creating account..." : "Create account"}
            {!isLoading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
          </span>
        </button>
      </form>
    </AuthShell>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-[#FFF8EF] text-[#1B1411]">Loading...</main>}>
      <SignUpContent />
    </Suspense>
  );
}
