import { headers } from 'next/headers';
import SettingsLayout from './layout';

export default async function SettingsServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get headers on the server side
  const headersList = headers();
  
  return <SettingsLayout>{children}</SettingsLayout>;
} 