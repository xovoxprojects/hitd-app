// src/app/dashboard/calls/page.tsx
"use client";
import { currentUser, MOCK_CALLS } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CallsPage() {
  const isLocked = currentUser.plan === 'basic';

  if (isLocked) {
    return (
      <div className="animate-in fade-in duration-500 h-full flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-primary-100 text-primary rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Live Calls Locked</h2>
        <p className="text-muted text-center max-w-md mb-8">
          Weekly live hot seats and Q&A calls are exclusively available to Premium and Yearly members. Upgrade your plan to get direct feedback to scale your content.
        </p>
        <Button size="lg">Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upcoming Live Calls</h1>
        <p className="text-muted">Join the weekly sessions to get direct hot-seat feedback.</p>
      </div>

      <div className="space-y-4">
        {MOCK_CALLS.map((call) => (
          <Card key={call.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{call.title}</h3>
                <p className="text-muted flex items-center gap-1.5 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {call.date}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline">Add to Calendar</Button>
              <Button>Join Call</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
