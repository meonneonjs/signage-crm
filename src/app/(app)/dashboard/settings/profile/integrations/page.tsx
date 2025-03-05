import { Title, Text, Card, Button } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function PersonalIntegrationsPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      integration: true
    }
  });

  if (!dbUser) redirect('/sign-in');

  const isGoogleConnected = dbUser.integration?.googleConnected ?? false;

  return (
    <div className="space-y-6">
      <div>
        <Title>Personal Integrations</Title>
        <Text>Connect your personal accounts to enhance your workflow.</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Google Workspace Integration</h2>
            <Text>Connect your Google account to sync calendar events and use Gmail for communications.</Text>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Google Calendar</h3>
                <Text className="text-sm text-gray-500">
                  {isGoogleConnected 
                    ? 'Your calendar is synced. Events will appear in your schedule.'
                    : 'Connect to see your Google Calendar events in your schedule.'}
                </Text>
              </div>
              <form 
                action={isGoogleConnected ? "/api/integrations/google/disconnect" : "/api/integrations/google/connect"} 
                method="POST"
              >
                <input type="hidden" name="service" value="calendar" />
                <Button
                  type="submit"
                  variant={isGoogleConnected ? "secondary" : "primary"}
                >
                  {isGoogleConnected ? 'Disconnect' : 'Connect Calendar'}
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Gmail</h3>
                <Text className="text-sm text-gray-500">
                  {isGoogleConnected 
                    ? 'Your Gmail account is connected for sending emails.'
                    : 'Connect to send emails through your Gmail account.'}
                </Text>
              </div>
              <form 
                action={isGoogleConnected ? "/api/integrations/google/disconnect" : "/api/integrations/google/connect"} 
                method="POST"
              >
                <input type="hidden" name="service" value="gmail" />
                <Button
                  type="submit"
                  variant={isGoogleConnected ? "secondary" : "primary"}
                >
                  {isGoogleConnected ? 'Disconnect' : 'Connect Gmail'}
                </Button>
              </form>
            </div>

            {isGoogleConnected && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700">Connected Account</h4>
                <Text className="text-sm text-gray-500">{dbUser.integration?.googleEmail}</Text>
                <div className="mt-2">
                  <Text className="text-sm text-gray-500">
                    Last synced: {dbUser.integration?.lastSyncedAt?.toLocaleDateString() ?? 'Never'}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {isGoogleConnected && (
        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium">Sync Settings</h2>
              <Text>Configure how your connected accounts sync with the system.</Text>
            </div>

            <div className="space-y-4">
              <form action="/api/integrations/google/settings" method="POST" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Calendar Sync</h3>
                    <Text className="text-sm text-gray-500">
                      Enable or disable calendar synchronization
                    </Text>
                  </div>
                  <Button 
                    type="submit"
                    name="setting" 
                    value="calendar"
                    variant={dbUser.integration?.calendarSyncEnabled ? "secondary" : "primary"}
                  >
                    {dbUser.integration?.calendarSyncEnabled ? 'Disable' : 'Enable'} Sync
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Sync</h3>
                    <Text className="text-sm text-gray-500">
                      Enable or disable email synchronization
                    </Text>
                  </div>
                  <Button 
                    type="submit"
                    name="setting" 
                    value="email"
                    variant={dbUser.integration?.emailSyncEnabled ? "secondary" : "primary"}
                  >
                    {dbUser.integration?.emailSyncEnabled ? 'Disable' : 'Enable'} Sync
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 