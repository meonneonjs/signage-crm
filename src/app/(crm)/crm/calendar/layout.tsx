import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendar | Atellier CRM',
  description: 'Manage your schedule, meetings, and events.',
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {children}
    </div>
  );
} 