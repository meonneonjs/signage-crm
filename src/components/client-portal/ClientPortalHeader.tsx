import { useClientPortal } from '@/contexts/ClientPortalContext';
import { Bell, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ClientPortalHeader() {
  const { branding, isLoading } = useClientPortal();

  if (isLoading) {
    return <div className="h-16 bg-background border-b animate-pulse" />;
  }

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src={branding.logo}
              alt="Client Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold" style={{ fontFamily: branding.typography.headingFont }}>
              Client Portal
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>
          <button className="p-2 hover:bg-accent rounded-full">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>
          <button className="p-2 hover:bg-accent rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </button>
        </nav>
      </div>
    </header>
  );
} 