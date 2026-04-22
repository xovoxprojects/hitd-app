"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Silently captures ?ref=BROKERCODE from the URL and stores it
 * in a cookie for 30 days. The cookie is claimed on login via /api/ref/claim.
 */
export function RefCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `hitd_ref=${encodeURIComponent(ref.toUpperCase())}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}
