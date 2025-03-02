'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigation, reportingNavigation, settingsNavigation } from './navigationConfig';
import { classNames } from '@/lib/utils';

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="lg:hidden">
      {({ open }) => (
        <>
          <div className="fixed inset-x-0 top-0 z-40 bg-white border-b border-gray-200">
            <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <Disclosure.Button className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
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
                  </nav>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 