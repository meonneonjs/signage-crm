'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApiConfigSettings() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_test_••••••••••••••••');
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourapp.com/webhooks');
  const [rateLimit, setRateLimit] = useState('100');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage your API keys and webhook integrations.
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">API Keys</h4>
          <div className="space-y-4">
            <div>
              <Label>Live API Key</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input type="password" value="sk_live_..." className="font-mono" />
                <Button variant="outline" size="sm">Show</Button>
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
            <div>
              <Label>Test API Key</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input type="password" value="sk_test_..." className="font-mono" />
                <Button variant="outline" size="sm">Show</Button>
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
            <Button variant="outline">Generate New Keys</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Webhook Settings</h4>
          <div className="space-y-4">
            <div>
              <Label>Webhook URL</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input placeholder="https://your-domain.com/webhook" />
                <Button variant="outline" size="sm">Verify</Button>
              </div>
            </div>
            <div>
              <Label>Secret Key</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input type="password" value="whsec_..." className="font-mono" />
                <Button variant="outline" size="sm">Show</Button>
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
            <div>
              <Label>Events to Send</Label>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Order Created</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Order Updated</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Order Completed</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Payment Received</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Rate Limiting</h4>
          <div className="space-y-4">
            <div>
              <Label>Requests per Minute</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 requests</SelectItem>
                  <SelectItem value="100">100 requests</SelectItem>
                  <SelectItem value="200">200 requests</SelectItem>
                  <SelectItem value="500">500 requests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Retry Failed Requests</Label>
                <p className="text-sm text-muted-foreground">Automatically retry failed API calls</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Reset Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
} 