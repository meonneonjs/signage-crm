'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useClerk, useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { ArrowRight, Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BrandLogo } from '@/components/BrandLogo';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const footerNavigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '/security' },
    { name: 'Resources', href: '/resources' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo iconOnly className="h-8 w-8" />
              <BrandLogo withoutIcon className="h-6 hidden md:block" />
            </Link>
            
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'text-primary-900'
                      : 'text-gray-600 hover:text-primary-900'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                onClick={() => {
                  if (isSignedIn) {
                    window.location.href = '/crm';
                  } else {
                    openSignIn();
                  }
                }}
              >
                Access CRM
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-14 right-0 w-full max-w-sm bg-white border-l shadow-xl z-50 p-6">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors px-4 py-2 rounded-lg',
                      pathname === item.href
                        ? 'bg-primary-50 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t my-4" />
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center"
                  onClick={() => {
                    if (isSignedIn) {
                      window.location.href = '/crm';
                    } else {
                      openSignIn();
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  Access CRM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                {footerNavigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/atellierCRM icon only.svg"
                alt="AtellierCRM"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} AtellierCRM. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 