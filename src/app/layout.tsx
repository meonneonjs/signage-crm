import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AtellierCRM',
  description: 'Business Management for Creative Professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/atellierCRM icon only.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
