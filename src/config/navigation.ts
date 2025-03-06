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

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  permission: {
    section: string;
    action: string;
  };
}

export const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard',
    href: '/crm',
    icon: LayoutDashboard,
    permission: { section: 'dashboards', action: 'view' },
  },
  {
    name: 'Clients',
    href: '/crm/clients',
    icon: Users,
    permission: { section: 'clients', action: 'view' },
  },
  {
    name: 'Projects',
    href: '/crm/projects',
    icon: Briefcase,
    permission: { section: 'projects', action: 'view' },
  },
  {
    name: 'Production',
    href: '/crm/production',
    icon: Factory,
    permission: { section: 'production', action: 'view' },
  },
  {
    name: 'Design Studio',
    href: '/crm/design',
    icon: Palette,
    permission: { section: 'design', action: 'view' },
  },
  {
    name: 'Team',
    href: '/crm/team',
    icon: UserCircle2,
    permission: { section: 'team', action: 'view' },
  },
  {
    name: 'Finance',
    href: '/crm/finance',
    icon: Wallet,
    permission: { section: 'billing', action: 'view' },
  },
  {
    name: 'Analytics',
    href: '/crm/analytics',
    icon: BarChart3,
    permission: { section: 'analytics', action: 'view' },
  },
  {
    name: 'Communication',
    href: '/crm/communication',
    icon: MessageSquare,
    permission: { section: 'messages', action: 'view' },
  },
  {
    name: 'Resources',
    href: '/crm/resources',
    icon: BookOpen,
    permission: { section: 'assets', action: 'view' },
  },
  {
    name: 'Calendar',
    href: '/crm/calendar',
    icon: Calendar,
    permission: { section: 'calendar', action: 'view' },
  },
  {
    name: 'Settings',
    href: '/crm/settings',
    icon: Settings,
    permission: { section: 'settings', action: 'view' },
  },
  {
    name: 'Atelier Connect',
    href: '/crm/connect',
    icon: MessagesSquare,
    permission: { section: 'messages', action: 'view' },
  },
]; 