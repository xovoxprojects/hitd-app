"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("email", { email, callbackUrl: "/dashboard", redirect: false });
    setIsLoading(false);
    if (res?.ok && !res?.error) {
      setEmailSent(true);
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-4 font-sans text-black">
      <Link href="/" className="absolute top-8 left-8 text-neutral-500 hover:text-black transition-colors font-medium">
        &larr; Home
      </Link>
      
      <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-black">Welcome to hitd.ai</h2>
          <p className="mt-2 text-sm text-neutral-500">Log in or create a new account.</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-neutral-200 text-black placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
              placeholder="name@example.com"
            />
          </div>
          
          {emailSent && (
            <div className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-xl border border-emerald-100 text-center font-medium">
              Check your email for a login link!
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || emailSent}
            className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isLoading ? "Sending link..." : emailSent ? "Link sent" : "Continue with Email"}
          </button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-xl bg-white border border-neutral-200 text-black font-medium hover:bg-neutral-50 transition-colors flex justify-center items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}
