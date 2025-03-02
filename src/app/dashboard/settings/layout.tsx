'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const personalSettings = [
  { name: 'Profile', href: '/dashboard/settings/profile' },
  { name: 'Preferences', href: '/dashboard/settings/preferences' },
  { name: 'Notifications', href: '/dashboard/settings/notifications' },
  { name: 'Security', href: '/dashboard/settings/security' },
  { name: 'API Keys', href: '/dashboard/settings/api-keys' },
];

const adminSettings = [
  { name: 'Company', href: '/dashboard/settings/company' },
  { name: 'Team', href: '/dashboard/settings/team' },
  { name: 'Billing', href: '/dashboard/settings/billing' },
  { name: 'Templates', href: '/dashboard/settings/templates' },
  { name: 'Branding', href: '/dashboard/settings/branding' },
  { name: 'Email', href: '/dashboard/settings/email' },
  { name: 'Integrations', href: '/dashboard/settings/integrations' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminSection = adminSettings.some(setting => pathname === setting.href);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex space-x-8">
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <div className="w-full rounded-lg border border-gray-200">
                <div className="flex">
                  <Link
                    href="/dashboard/settings/profile"
                    className={`flex-1 px-4 py-2 text-sm font-medium text-center rounded-l-lg ${
                      !isAdminSection ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Personal
                  </Link>
                  <Link
                    href="/dashboard/settings/company"
                    className={`flex-1 px-4 py-2 text-sm font-medium text-center rounded-r-lg ${
                      isAdminSection ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {(!isAdminSection ? personalSettings : adminSettings).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 