import {
  HomeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  FunnelIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: FunnelIcon },
  { name: 'Clients', href: '/dashboard/clients', icon: UserGroupIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: DocumentDuplicateIcon },
  { name: 'Estimates', href: '/dashboard/estimates', icon: CalculatorIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Communication', href: '/dashboard/communication', icon: EnvelopeIcon },
];

export const reportingNavigation = [
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Commissions', href: '/dashboard/reports/commissions', icon: CurrencyDollarIcon },
];

export const settingsNavigation = [
  { name: 'Settings', href: '/dashboard/settings/profile', icon: Cog6ToothIcon },
]; 