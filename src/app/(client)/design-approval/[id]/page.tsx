import { DesignViewer } from '@/components/client-portal/design-approval/DesignViewer';
import { DesignInfo } from '@/components/client-portal/design-approval/DesignInfo';
import { DesignComments } from '@/components/client-portal/design-approval/DesignComments';
import { DesignVersions } from '@/components/client-portal/design-approval/DesignVersions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface DesignReviewPageProps {
  params: {
    id: string;
  };
}

export default async function DesignReviewPage({ params }: DesignReviewPageProps) {
  // TODO: Fetch design data from API using params.id
  const design = {
    id: params.id,
    title: 'Homepage Design - Final',
    description: 'Updated layout with client feedback incorporated',
    status: 'pending',
    submittedBy: {
      name: 'Alex Kim',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Kim',
    },
    submittedAt: '2024-03-05T10:30:00Z',
    version: 2,
    project: 'Website Redesign',
    images: [
      {
        id: '1',
        url: '/designs/homepage-v2-full.jpg',
        caption: 'Desktop View',
      },
      {
        id: '2',
        url: '/designs/homepage-v2-mobile.jpg',
        caption: 'Mobile View',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/design-approval"
            className="rounded-full p-2 hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to designs</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{design.title}</h1>
            <p className="text-muted-foreground">Version {design.version}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button size="sm">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div className="space-y-6">
          <DesignViewer images={design.images} />
          <DesignComments designId={design.id} />
        </div>
        <div className="space-y-6">
          <DesignInfo design={design} />
          <DesignVersions designId={design.id} currentVersion={design.version} />
        </div>
      </div>
    </div>
  );
} 