// src/app/dashboard/ai-tool/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { currentUser } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AIToolPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const isLocked = !session?.user || (session.user.plan || 'none') === 'none' || (session.user.credits || 0) <= 0;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router]);

  const handleFeedback = () => {
    if (!input.trim() || isLocked) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResponse("Based on the data, your hook is strong but could be more polarizing. Try replacing 'Here is how to grow' with 'Why 99% of creators fail to grow (and what to do instead)'. The pacing in the middle is solid. End with a clearer CTA asking for a specific comment for a DM resource.");
    }, 1500);
  };

  if (!session?.user) return null;

  if (isLocked) {
    return (
      <div className="animate-in fade-in duration-500 h-full flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">AI Feedback Tool Locked</h2>
        <p className="text-slate-500 text-center max-w-md mb-8">
          The AI Feedback Tool is exclusively available to members with active credits. Upgrade your plan to instantly evaluate your hooks and pacing.
        </p>
        <Button size="lg" onClick={() => router.push('/pricing')}>Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Content Feedback</h1>
        <p className="text-muted text-sm">Paste your script, thread, or copy below for instant analysis.</p>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto space-y-6 pb-6">
          {response && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <Card className="p-4 bg-surface rounded-2xl rounded-tl-none border border-primary-100 flex-1">
                <p className="text-foreground whitespace-pre-wrap">{response}</p>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Card className="p-2 flex gap-2 items-end border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all bg-white">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your content here..."
              className="px-4 py-3 w-full bg-transparent border-none focus:ring-0 resize-none max-h-48 min-h-[60px] text-foreground text-sm"
              rows={3}
            />
            <Button 
              className="mb-1 mr-1 shrink-0 bg-primary" 
              onClick={handleFeedback}
              disabled={loading || !input.trim()}
            >
              {loading ? 'Analyzing...' : 'Get Feedback'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
