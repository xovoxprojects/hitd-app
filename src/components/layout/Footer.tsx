// src/components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="hitd.ai Logo"
                className="w-7 h-7 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="text-lg font-black tracking-tight text-slate-900">hitd.ai</span>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[220px]">
              AI-powered ad analysis for Meta & Instagram. No guesswork. Just better ads.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/#pricing" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="/#features" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Start Analyzing</Link></li>
              <li><Link href="/login" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Log in</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
              <li>
                <a href="mailto:hello@hitd.ai" className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors">
                  hello@hitd.ai
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[12px] text-slate-400 font-medium">
            © 2026 hitd.ai LLC. All rights reserved.
          </p>
          <p className="text-[12px] text-slate-400 font-medium">
            Made for performance marketers.
          </p>
        </div>
      </div>
    </footer>
  );
}
