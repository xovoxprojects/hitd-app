// src/app/dashboard/settings/page.tsx
"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  if (!session?.user) return null;
  const user = session.user;
  const plan = user.plan || 'none';

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
        <p className="text-muted">Manage your profile, membership plan, and billing.</p>
      </div>

      <div className="space-y-6">
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Profile Information</h2>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Full Name</label>
              <input type="text" readOnly value={user.name || ''} className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-foreground focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
              <input type="email" readOnly value={user.email || ''} className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-foreground focus:outline-none" />
            </div>
          </div>
        </Card>

        <Card className="p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-bl-full -z-10"></div>
          
          <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Membership Plan</h2>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold capitalize">{plan} Plan</h3>
                {plan !== 'none' && <Badge variant="primary">Active</Badge>}
                {plan === 'none' && <Badge variant="warning">Limited Access</Badge>}
              </div>
              <p className="text-muted text-sm">
                {plan === 'none' 
                  ? "You have a free account. Upgrade to access premium features." 
                  : "You have full access to your plan's features and credits."}
              </p>
            </div>
            
            {plan === 'none' ? (
              <Button size="lg" onClick={() => router.push("/#pricing")}>
                Upgrade Plan
              </Button>
            ) : (
              <Button variant="outline" size="lg" onClick={() => router.push("/#pricing")}>Manage Billing</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
