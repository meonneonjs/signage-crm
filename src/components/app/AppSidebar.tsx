'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '@/config/navigation';
import { BrandLogo } from '@/components/BrandLogo';

interface NavItemProps {
  item: (typeof navigation)[0];
  isActive: boolean;
}

function NavItem({ item, isActive }: NavItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
        isActive
          ? 'text-primary-900 bg-primary-50'
          : 'text-gray-600 hover:text-primary-900 hover:bg-gray-50'
      )}
    >
      <item.icon
        className={cn('w-5 h-5', isActive ? 'text-primary-600' : 'text-gray-400')}
      />
      {item.name}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BrandLogo iconOnly className="h-8 w-8" />
          <BrandLogo withoutIcon className="h-6 hidden md:block" />
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </nav>
    </div>
  );
} 