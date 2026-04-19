// src/app/privacy/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — hitd.ai",
  description: "Privacy Policy for hitd.ai. Learn how we handle your data.",
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-4xl font-[800] text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400 font-medium mb-10">Effective date: April 19, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-[14px] leading-relaxed text-slate-600">

            <p>
              hitd.ai is operated by hitd.ai LLC, 650 NE 2nd Ave, Miami, FL 33132, United States. For any privacy
              related questions, contact us at{" "}
              <a href="mailto:hello@hitd.ai" className="text-blue-600 font-semibold hover:underline">
                hello@hitd.ai
              </a>.
            </p>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Information we collect</h2>
              <p>
                We collect your email address when you create an account, payment information processed securely by
                our payment provider, ad content you upload (images, video, and copy) for analysis purposes, and
                technical data such as IP address, browser type, and usage patterns.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">How we use your information</h2>
              <p>
                We use your data to provide and improve the hitd.ai service, process payments, and send transactional
                emails related to your account. We do not sell your data to third parties. We do not use your uploaded
                ad content to train AI models.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Third-party service providers</h2>
              <p>
                We work with trusted third-party providers to operate our service, including payment processing and
                infrastructure. These providers access your data only to perform services on our behalf and are
                contractually required to protect it. We use Stripe for payment processing. Stripe&apos;s privacy
                policy is available at{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  stripe.com/privacy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Data retention</h2>
              <p>
                We retain account data for as long as your account is active. Uploaded content used for analysis is
                deleted within 30 days. You may request deletion of your data at any time by contacting{" "}
                <a href="mailto:hello@hitd.ai" className="text-blue-600 font-semibold hover:underline">
                  hello@hitd.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Your rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, or delete your personal data,
                or to withdraw consent. To exercise any of these rights, email{" "}
                <a href="mailto:hello@hitd.ai" className="text-blue-600 font-semibold hover:underline">
                  hello@hitd.ai
                </a>. For users in the European Union, we comply with GDPR. For California residents, we comply with
                CCPA.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Cookies</h2>
              <p>
                We use cookies for authentication, security, and analytics. For more details, see our{" "}
                <Link href="/cookies" className="text-blue-600 font-semibold hover:underline">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-[16px] font-[800] text-slate-900 mb-3">Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Continued use of hitd.ai after changes
                constitutes acceptance of the revised policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
