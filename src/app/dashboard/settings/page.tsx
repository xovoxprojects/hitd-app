// src/app/dashboard/settings/page.tsx
"use client";
import React, { useState } from 'react';
import { currentUser } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PricingCard } from '@/components/ui/PricingCard';

export default function SettingsPage() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

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
              <input type="text" readOnly value={currentUser.name} className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-foreground focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
              <input type="email" readOnly value={currentUser.email} className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-foreground focus:outline-none" />
            </div>
          </div>
        </Card>

        <Card className="p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-bl-full -z-10"></div>
          
          <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Membership Plan</h2>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold capitalize">{currentUser.plan} Plan</h3>
                {currentUser.plan !== 'basic' && <Badge variant="primary">Active</Badge>}
                {currentUser.plan === 'basic' && <Badge variant="warning">Limited Access</Badge>}
              </div>
              <p className="text-muted text-sm">
                {currentUser.plan === 'basic' 
                  ? "You have access to courses and the Skool community, but are missing out on Live Calls and the AI tool." 
                  : "You have full access to all platform features, including Live Calls, WhatsApp, and AI Feedback."}
              </p>
            </div>
            
            {currentUser.plan === 'basic' && (
              <Button size="lg" onClick={() => setIsUpgradeModalOpen(true)}>
                Upgrade Plan
              </Button>
            )}
            {currentUser.plan !== 'basic' && (
              <Button variant="outline" size="lg">Manage Billing</Button>
            )}
          </div>
        </Card>
      </div>

      <Modal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} title="Upgrade Your Membership">
        <div className="mt-4">
          <PricingCard 
            title="Premium Plan"
            price="$1000"
            period="3 mo"
            features={[
              'Access to all core courses',
              'Weekly live calls (Hot seats)',
              'AI Content Feedback Tool',
              'WhatsApp community access'
            ]}
            ctaText="Confirm Upgrade"
            isPopular
            onCtaClick={() => setIsUpgradeModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
}
