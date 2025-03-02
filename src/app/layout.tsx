import './globals.css';
import { Inter } from 'next/font/google';
import { classNames } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { StartupScreen } from '@/components/StartupScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Signage CRM',
  description: 'Modern CRM for signage business management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full bg-gray-50">
        <body 
          className={classNames("h-full antialiased", inter.className)}
          data-new-gr-c-s-check-loaded=""
          data-gr-ext-installed=""
        >
          <StartupScreen />
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
