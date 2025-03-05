'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useClerk, useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function MarketingNav() {
  const pathname = usePathname();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold text-primary-900">
            AtellierCRM
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
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
          {isSignedIn ? (
            <Link href="/dashboard">
              <Button variant="default">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => openSignIn()}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                onClick={() => openSignIn()}
              >
                Start Free Trial
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
} 