'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
  FunnelIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  HashtagIcon,
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
import classNames from 'classnames';
import { LoadingScreen } from './LoadingScreen';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: FunnelIcon },
  { name: 'Clients', href: '/dashboard/clients', icon: UserGroupIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: DocumentDuplicateIcon },
  { name: 'Estimates', href: '/dashboard/estimates', icon: CalculatorIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Communication', href: '/dashboard/communication', icon: EnvelopeIcon },
];

const reportingNavigation = [
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Commissions', href: '/dashboard/reports/commissions', icon: CurrencyDollarIcon },
];

const settingsNavigation = [
  { name: 'Settings', href: '/dashboard/settings/profile', icon: Cog6ToothIcon },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    router.push(href);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
              Signage CRM
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">Reporting</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {reportingNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">Settings</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {settingsNavigation.map((item) => {
                    const isActive = pathname.startsWith('/dashboard/settings');
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">Factory Chat</div>
                <div className="mt-2">
                  <Link
                    href="/dashboard/factory-chat"
                    className={classNames(
                      pathname === '/dashboard/factory-chat'
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold -mx-2'
                    )}
                  >
                    <ChatBubbleLeftRightIcon
                      className={classNames(
                        pathname === '/dashboard/factory-chat' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    All Channels
                  </Link>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-medium text-gray-500 px-2">Recent Projects</div>
                    <Link
                      href="/dashboard/factory-chat/example-project"
                      className={classNames(
                        pathname === '/dashboard/factory-chat/example-project'
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold -mx-2'
                      )}
                    >
                      <HashtagIcon
                        className={classNames(
                          pathname === '/dashboard/factory-chat/example-project' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      example-project
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <Disclosure as="nav" className="lg:hidden">
        {({ open }) => (
          <>
            <div className="fixed inset-x-0 top-0 z-40 bg-white border-b border-gray-200">
              <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                  <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                    Signage CRM
                  </Link>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="fixed inset-0 z-40 lg:hidden">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              <div className="fixed inset-0 z-40 flex">
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                  <div className="absolute right-0 top-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => open}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex flex-shrink-0 items-center px-4">
                    <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                      Signage CRM
                    </Link>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Disclosure.Button
                              key={item.name}
                              as={Link}
                              href={item.href}
                              className={classNames(
                                isActive
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Disclosure.Button>
                          );
                        })}
                      </div>
                      <div className="mt-6">
                        <div className="text-sm font-medium text-gray-400 px-2">Reporting</div>
                        <div className="mt-2 space-y-1">
                          {reportingNavigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <Disclosure.Button
                                key={item.name}
                                as={Link}
                                href={item.href}
                                className={classNames(
                                  isActive
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Disclosure.Button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm font-medium text-gray-400 px-2">Settings</div>
                        <div className="mt-2 space-y-1">
                          {settingsNavigation.map((item) => {
                            const isActive = pathname.startsWith('/dashboard/settings');
                            return (
                              <Disclosure.Button
                                key={item.name}
                                as={Link}
                                href={item.href}
                                className={classNames(
                                  isActive
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Disclosure.Button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm font-medium text-gray-400 px-2">Factory Chat</div>
                        <div className="mt-2 space-y-1">
                          <Disclosure.Button
                            as={Link}
                            href="/dashboard/factory-chat"
                            className={classNames(
                              pathname === '/dashboard/factory-chat'
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <ChatBubbleLeftRightIcon
                              className={classNames(
                                pathname === '/dashboard/factory-chat' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            All Channels
                          </Disclosure.Button>
                          <div className="text-xs font-medium text-gray-500 px-2 mt-4">Recent Projects</div>
                          <Disclosure.Button
                            as={Link}
                            href="/dashboard/factory-chat/example-project"
                            className={classNames(
                              pathname === '/dashboard/factory-chat/example-project'
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <HashtagIcon
                              className={classNames(
                                pathname === '/dashboard/factory-chat/example-project' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            example-project
                          </Disclosure.Button>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
} 