// src/app/cookies/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cookie Policy — hitd.ai",
  description: "Cookie Policy for hitd.ai.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to hitd.ai
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-[800] text-slate-900 tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-sm text-slate-400 font-medium mb-10">Effective date: April 19, 2026</p>

          <div className="space-y-8 text-[14px] leading-relaxed text-slate-600">

            <p>
              hitd.ai uses cookies and similar technologies to operate and improve the service.
            </p>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">What are cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They allow us to
                recognize you and remember certain information.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Types of cookies we use</h2>
              <p className="mb-3">
                <span className="font-bold text-slate-800">Essential cookies</span> are required for the service to
                function, including authentication and security.
              </p>
              <p>
                <span className="font-bold text-slate-800">Analytics cookies</span> help us understand how users
                interact with hitd.ai so we can improve the experience. We use third-party analytics tools for this
                purpose. These cookies do not identify you personally.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Your choices</h2>
              <p>
                You can control cookies through your browser settings. Disabling essential cookies may affect the
                functionality of the service. When you first visit hitd.ai, you will be asked to accept or decline
                non-essential cookies via our cookie banner.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Contact</h2>
              <p>
                For questions about our Cookie Policy, contact{" "}
                <a href="mailto:hello@hitd.ai" className="text-blue-600 font-semibold hover:underline">
                  hello@hitd.ai
                </a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
