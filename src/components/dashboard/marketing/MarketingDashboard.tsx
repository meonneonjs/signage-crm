'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreateCampaignDialog } from './CreateCampaignDialog';

interface Campaign {
  id: string;
  name: string;
  type: string;
  platform: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
}

interface Message {
  id: string;
  subject: string;
  status: string;
  sentDate: string;
  openRate: number;
  clickRate: number;
}

export function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marketing</h2>
        <CreateCampaignDialog />
      </div>
      
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No campaigns yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Get started by creating your first campaign</p>
              <CreateCampaignDialog />
            </div>
          ) : (
            <div className="rounded-md border">
              {/* Campaign list will go here */}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No messages yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Start by creating a new message campaign</p>
              <Button>Create Message</Button>
            </div>
          ) : (
            <div className="rounded-md border">
              {/* Message list will go here */}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 