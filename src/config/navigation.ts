import {
  LayoutDashboard,
  Users,
  Briefcase,
  Factory,
  Palette,
  UserCircle2,
  Wallet,
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Settings,
  MessagesSquare,
} from 'lucide-react';
import { DashboardPermissions, Permission } from '@/types/roles';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  permission?: {
    section: keyof DashboardPermissions;
    action: keyof Permission;
  };
  items?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    permission: { section: 'dashboards', action: 'view' },
  },
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: Users,
    permission: { section: 'clients', action: 'view' },
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase,
    permission: { section: 'projects', action: 'view' },
  },
  {
    name: 'Production',
    href: '/dashboard/production',
    icon: Factory,
    permission: { section: 'production', action: 'view' },
  },
  {
    name: 'Design Studio',
    href: '/dashboard/design',
    icon: Palette,
    permission: { section: 'design', action: 'view' },
  },
  {
    name: 'Team',
    href: '/dashboard/team',
    icon: UserCircle2,
    permission: { section: 'team', action: 'view' },
  },
  {
    name: 'Finance',
    href: '/dashboard/finance',
    icon: Wallet,
    permission: { section: 'billing', action: 'view' },
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    permission: { section: 'analytics', action: 'view' },
  },
  {
    name: 'Communication',
    href: '/dashboard/communication',
    icon: MessageSquare,
    permission: { section: 'messages', action: 'view' },
  },
  {
    name: 'Resources',
    href: '/dashboard/resources',
    icon: BookOpen,
    permission: { section: 'assets', action: 'view' },
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
    permission: { section: 'calendar', action: 'view' },
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    permission: { section: 'settings', action: 'view' },
  },
  {
    name: 'Atelier Connect',
    href: '/dashboard/connect',
    icon: MessagesSquare,
    permission: { section: 'messages', action: 'view' },
  },
]; 