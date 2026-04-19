"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const errors: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  OAuthSignin: "Error constructing an authorization URL.",
  OAuthCallback: "Error handling the response from the OAuth provider.",
  OAuthCreateAccount: "Could not create OAuth provider user in the database.",
  EmailCreateAccount: "Could not create email provider user in the database.",
  Callback: "Error in the OAuth callback handler route.",
  OAuthAccountNotLinked: "This email is already associated with another account.",
  EmailSignin: "Error sending the email with the sign-in link.",
  CredentialsSignin: "The credentials you provided are invalid.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unknown error occurred.",
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const message = errors[error] ?? errors.Default;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-4 font-sans text-black">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">Authentication Error</h1>
          <p className="mt-2 text-neutral-500 text-sm">{message}</p>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-left">
          <p className="text-xs text-neutral-400 font-mono">Error code: <span className="text-red-500 font-semibold">{error}</span></p>
        </div>
        <Link
          href="/login"
          className="block w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-neutral-800 transition-colors"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
