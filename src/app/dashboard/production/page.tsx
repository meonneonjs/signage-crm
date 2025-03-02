import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';

export default async function ProductionPage() {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Production</h1>
      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Production Overview</h2>
          <p>Welcome to the production dashboard. This page is under construction.</p>
        </div>
      </div>
    </div>
  );
} 