import { Title, Text, Card, TextInput, Select, SelectItem, Button } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AdminIntegrationsPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  // Check if user is admin
  const dbUser = await prisma.user.findFirst({
    where: { 
      id: userId,
      role: 'ADMIN'
    }
  });

  if (!dbUser) {
    redirect('/dashboard');
  }

  // Get current system settings
  const settings = await prisma.systemSettings.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <Title>Integration Settings</Title>
        <Text>Configure system-wide integrations for telephony, email, and calendar services.</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Telephony Integration</h2>
            <Text>Configure your telephony provider for SMS and call functionality.</Text>
          </div>

          <form action="/api/settings/telephony" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <Select 
                className="mt-1" 
                defaultValue={settings?.telephonyProvider || ''}
                name="provider"
              >
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="messagebird">MessageBird</SelectItem>
                <SelectItem value="vonage">Vonage</SelectItem>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <TextInput 
                type="password" 
                placeholder="Enter API key" 
                className="mt-1"
                name="apiKey"
                defaultValue={settings?.telephonyApiKey || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">API Secret</label>
              <TextInput 
                type="password" 
                placeholder="Enter API secret" 
                className="mt-1"
                name="apiSecret"
                defaultValue={settings?.telephonyApiSecret || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <TextInput 
                placeholder="Enter your business phone number" 
                className="mt-1"
                name="phone"
                defaultValue={settings?.telephonyPhone || ''}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Telephony Settings</Button>
            </div>
          </form>
        </div>
      </Card>

      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Email Integration</h2>
            <Text>Configure your email service provider for system emails.</Text>
          </div>

          <form action="/api/settings/email" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <Select 
                className="mt-1"
                defaultValue={settings?.emailProvider || ''}
                name="provider"
              >
                <SelectItem value="sendgrid">SendGrid</SelectItem>
                <SelectItem value="aws-ses">AWS SES</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <TextInput 
                type="password" 
                placeholder="Enter API key" 
                className="mt-1"
                name="apiKey"
                defaultValue={settings?.emailApiKey || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">From Email</label>
              <TextInput 
                type="email" 
                placeholder="Enter sender email address" 
                className="mt-1"
                name="fromEmail"
                defaultValue={settings?.emailFromAddress || ''}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Email Settings</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
} 