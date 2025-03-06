import { Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Card } from '@tremor/react';

export default async function EstimatesPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Estimates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your estimates and quotes for signage projects
          </p>
        </div>

        <Card>
          <div className="p-4">
            <p className="text-gray-500">Estimates functionality coming soon...</p>
          </div>
        </Card>
      </div>
    </Suspense>
  );
} 