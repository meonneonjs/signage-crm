'use client';

import { StartupScreen } from '@/components/StartupScreen';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StartupScreen />
      {children}
    </>
  );
} 