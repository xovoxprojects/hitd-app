import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { Suspense } from 'react';
import { RefCapture } from '@/components/RefCapture';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'hitd.ai | Meta Ads Compliance Engine',
  description: 'AI-powered analysis tool for you creatives and copy to uncover Meta policy violations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {/* Silently captures ?ref= for broker attribution — renders nothing */}
          <Suspense fallback={null}>
            <RefCapture />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
