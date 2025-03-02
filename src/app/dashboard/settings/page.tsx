'use client';

import { useState } from 'react';
import { Card, Title, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Grid } from '@tremor/react';
import PersonalSettings from './PersonalSettings';
import AdminSettings from './AdminSettings';
import Link from 'next/link';
import {
  UserIcon,
  BuildingOfficeIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UsersIcon,
  SwatchIcon,
  EnvelopeIcon,
  CloudIcon,
} from '@heroicons/react/24/outline';

const settingsSections = [
  {
    title: 'Profile',
    description: 'Manage your personal information and preferences',
    icon: UserIcon,
    href: '/dashboard/settings/profile',
  },
  {
    title: 'Company',
    description: 'Update company details and branding',
    icon: BuildingOfficeIcon,
    href: '/dashboard/settings/company',
  },
  {
    title: 'Team',
    description: 'Manage team members and permissions',
    icon: UsersIcon,
    href: '/dashboard/settings/team',
  },
  {
    title: 'Integrations',
    description: 'Connect with external services and tools',
    icon: CloudIcon,
    href: '/dashboard/settings/integrations',
  },
  {
    title: 'Email Templates',
    description: 'Customize communication templates',
    icon: EnvelopeIcon,
    href: '/dashboard/settings/email-templates',
  },
  {
    title: 'Billing',
    description: 'Manage subscription and payment methods',
    icon: CreditCardIcon,
    href: '/dashboard/settings/billing',
  },
  {
    title: 'Security',
    description: 'Configure security settings and 2FA',
    icon: ShieldCheckIcon,
    href: '/dashboard/settings/security',
  },
  {
    title: 'Notifications',
    description: 'Set up alerts and notification preferences',
    icon: BellIcon,
    href: '/dashboard/settings/notifications',
  },
];

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="p-8 space-y-8">
      <div>
        <Title>Settings</Title>
        <Text>Configure your system preferences and account settings</Text>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        {settingsSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <section.icon className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </Grid>

      <Card>
        <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
          <TabList>
            <Tab>Personal Settings</Tab>
            <Tab>Admin Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PersonalSettings />
            </TabPanel>
            <TabPanel>
              <AdminSettings />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
} 