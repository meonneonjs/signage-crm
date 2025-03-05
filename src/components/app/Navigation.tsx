'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { usePermissions } from '@/contexts/PermissionContext';

export function Navigation() {
  const pathname = usePathname();
  const { can } = usePermissions();

  // Filter navigation items based on permissions
  const filteredNavigation = navigation.filter(item => {
    if (!item.permission) return true;
    return can(item.permission.section, item.permission.action);
  });

  return (
    <nav className="space-y-1">
      {filteredNavigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {item.icon && (
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-gray-500' : 'text-gray-400'
                )}
                aria-hidden="true"
              />
            )}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 