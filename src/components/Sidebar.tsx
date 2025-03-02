import Link from 'next/link'
import { HomeIcon, UsersIcon, FolderIcon, DocumentTextIcon, CheckCircleIcon, CalendarIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UsersIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Proposals', href: '/dashboard/proposals', icon: DocumentTextIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckCircleIcon },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Signage CRM</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="block hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/clients" className="block hover:text-gray-300">
              Clients
            </Link>
          </li>
          <li>
            <Link href="/dashboard/projects" className="block hover:text-gray-300">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
} 