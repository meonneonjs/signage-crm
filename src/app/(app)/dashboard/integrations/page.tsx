'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Power, RefreshCw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { IntegrationCard } from './_components/IntegrationCard';
import { ConfigureIntegrationDialog } from './_components/ConfigureIntegrationDialog';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected';
  icon: string;
  lastSync: string | null;
}

// Demo integrations data - replace with actual API integration
const demoIntegrations: {
  available: Integration[];
  categories: string[];
} = {
  available: [
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3000+ apps and automate your workflows',
      category: 'Automation',
      status: 'connected',
      icon: '/integrations/zapier.svg',
      lastSync: '2024-03-10T15:30:00Z',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates directly in your Slack channels',
      category: 'Communication',
      status: 'disconnected',
      icon: '/integrations/slack.svg',
      lastSync: null,
    },
    {
      id: 'google_calendar',
      name: 'Google Calendar',
      description: 'Sync appointments and schedule events automatically',
      category: 'Calendar',
      status: 'connected',
      icon: '/integrations/google-calendar.svg',
      lastSync: '2024-03-10T14:00:00Z',
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync customer data with your email marketing campaigns',
      category: 'Marketing',
      status: 'disconnected',
      icon: '/integrations/mailchimp.svg',
      lastSync: null,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process payments and manage subscriptions',
      category: 'Payment',
      status: 'connected',
      icon: '/integrations/stripe.svg',
      lastSync: '2024-03-10T16:00:00Z',
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync customer data and manage marketing campaigns',
      category: 'CRM',
      status: 'disconnected',
      icon: '/integrations/hubspot.svg',
      lastSync: null,
    }
  ],
  categories: ['All', 'Automation', 'Communication', 'Calendar', 'Marketing', 'Payment', 'CRM'],
};

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAll = async () => {
    try {
      setIsSyncing(true);
      // TODO: Implement actual sync functionality
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      toast.success('All integrations synced successfully');
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Failed to sync integrations. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredIntegrations = demoIntegrations.available.filter(integration => {
    const matchesSearch = 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = demoIntegrations.available.filter(i => i.status === 'connected').length;
  const totalCount = demoIntegrations.available.length;
  const lastSyncTime = new Date(Math.max(
    ...demoIntegrations.available
      .filter(i => i.lastSync)
      .map(i => new Date(i.lastSync!).getTime())
  )).toLocaleString();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Integrations</h1>
        <Button
          onClick={handleSyncAll}
          variant="outline"
          className="gap-2"
          disabled={isSyncing}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync All'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Connected Integrations</div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">{connectedCount} / {totalCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Last Sync</div>
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold mt-2">{lastSyncTime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">API Status</div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">100% Uptime</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search integrations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {demoIntegrations.categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-[#1eb5b6] hover:bg-[#1eb5b6]/90" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map(integration => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConfigure={() => setSelectedIntegration(integration.id)}
                />
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No integrations found matching your criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ConfigureIntegrationDialog
        integration={demoIntegrations.available.find(i => i.id === selectedIntegration)}
        onClose={() => setSelectedIntegration(null)}
      />
    </div>
  );
} 