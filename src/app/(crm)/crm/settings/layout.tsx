'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Building2,
  Users,
  CreditCard,
  FileText,
  Palette,
  Mail,
  Plug,
  Database,
  Layout,
  MessageSquare,
  Workflow,
  Tags,
  Filter,
  Sliders,
  Globe,
  Clock,
  FileCode2,
  Bot,
} from 'lucide-react';
import { usePermissions } from '@/contexts/PermissionContext';
import { rolePermissions } from '@/types/roles';

const personalSettings = [
  { name: 'Profile', href: '/dashboard/settings/profile', icon: User },
  { name: 'Preferences', href: '/dashboard/settings/preferences', icon: Settings },
  { name: 'Notifications', href: '/dashboard/settings/notifications', icon: Bell },
  { name: 'Security', href: '/dashboard/settings/security', icon: Shield },
  { name: 'API Keys', href: '/dashboard/settings/api-keys', icon: Key },
];

const adminSettings = [
  // Company & Team
  { name: 'Company Profile', href: '/dashboard/settings/company', icon: Building2 },
  { 
    name: 'Team Management', 
    href: '/dashboard/settings/team', 
    icon: Users,
    requiresPermission: true 
  },
  { name: 'Billing & Plans', href: '/dashboard/settings/billing', icon: CreditCard },
  
  // Customization
  { name: 'Templates', href: '/dashboard/settings/templates', icon: FileText },
  { name: 'Branding', href: '/dashboard/settings/branding', icon: Palette },
  { name: 'Layout & UI', href: '/dashboard/settings/layout', icon: Layout },
  
  // Communication
  { name: 'Email Settings', href: '/dashboard/settings/email', icon: Mail },
  { name: 'Chat Settings', href: '/dashboard/settings/chat', icon: MessageSquare },
  
  // Automation & Integration
  { name: 'Workflow Automation', href: '/dashboard/settings/automation', icon: Workflow },
  { name: 'Integrations', href: '/dashboard/settings/integrations', icon: Plug },
  { name: 'API Configuration', href: '/dashboard/settings/api-config', icon: FileCode2 },
  { name: 'AI Assistant Settings', href: '/dashboard/settings/ai-settings', icon: Bot },
  
  // Data & Fields
  { name: 'Custom Fields', href: '/dashboard/settings/custom-fields', icon: Tags },
  { name: 'Data Management', href: '/dashboard/settings/data', icon: Database },
  { name: 'Filters & Views', href: '/dashboard/settings/filters', icon: Filter },
  
  // Business Rules
  { name: 'Business Rules', href: '/dashboard/settings/business-rules', icon: Sliders },
  { name: 'Localization', href: '/dashboard/settings/localization', icon: Globe },
  { name: 'Working Hours', href: '/dashboard/settings/working-hours', icon: Clock },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { userRole, can } = usePermissions();
  
  const isAdminSection = adminSettings.some(setting => 
    pathname === setting.href || pathname.startsWith(`${setting.href}/`)
  );

  const filteredAdminSettings = adminSettings.filter(setting => 
    !setting.requiresPermission || can('team', 'view')
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and customize your CRM experience
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
              {(!isAdminSection ? personalSettings : filteredAdminSettings).map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {isAdminSection && (
              <div className="pt-4 border-t">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 text-sm text-left text-indigo-600 hover:bg-gray-50 rounded-md">
                    Export Settings
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-left text-indigo-600 hover:bg-gray-50 rounded-md">
                    Import Settings
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-md">
                    Reset to Default
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 