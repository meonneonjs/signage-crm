'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/app/AppSidebar';
import { NotificationBell } from '@/components/app/NotificationBell';
import { UserNav } from '@/components/app/UserNav';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BottomBar } from '@/components/app/BottomBar';

interface AppLayoutClientProps {
  children: React.ReactNode;
}

export function AppLayoutClient({ children }: AppLayoutClientProps) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
        <BottomBar />
      </div>
    </div>
  );
} 