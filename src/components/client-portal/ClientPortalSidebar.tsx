import { useClientPortal } from '@/contexts/ClientPortalContext';
import {
  LayoutDashboard,
  FileCheck,
  Files,
  MessageSquare,
  CreditCard,
  BarChart,
  FolderOpen,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const baseNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    feature: null,
  },
  {
    title: 'Design Approval',
    href: '/design-approval',
    icon: FileCheck,
    feature: 'designApproval',
  },
  {
    title: 'Files & Assets',
    href: '/files',
    icon: Files,
    feature: 'fileManagement',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    feature: null,
  },
  {
    title: 'Team',
    href: '/team',
    icon: Users,
    feature: null,
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    feature: 'communication',
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: CreditCard,
    feature: 'payments',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart,
    feature: 'analytics',
  },
];

export function ClientPortalSidebar() {
  const { features } = useClientPortal();
  const pathname = usePathname();

  const navItems = baseNavItems.filter(
    item => item.feature === null || features[item.feature as keyof typeof features]
  );

  return (
    <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 