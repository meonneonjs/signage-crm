import { CheckCircle, Clock, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DesignSubmission {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: {
    name: string;
    avatar: string;
  };
  submittedAt: string;
  version: number;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    label: 'Pending Review',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-500',
    label: 'Approved',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-500',
    label: 'Rejected',
  },
};

export function DesignList() {
  // TODO: Replace with real data from API
  const designs: DesignSubmission[] = [
    {
      id: '1',
      title: 'Homepage Design - Final',
      description: 'Updated layout with client feedback incorporated',
      thumbnail: '/designs/homepage-v2.jpg',
      status: 'pending',
      submittedBy: {
        name: 'Alex Kim',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Kim',
      },
      submittedAt: '2024-03-05T10:30:00Z',
      version: 2,
    },
    {
      id: '2',
      title: 'Product Page Template',
      description: 'E-commerce product page design with gallery',
      thumbnail: '/designs/product-page.jpg',
      status: 'approved',
      submittedBy: {
        name: 'Emily Davis',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Davis',
      },
      submittedAt: '2024-03-04T15:45:00Z',
      version: 1,
    },
    {
      id: '3',
      title: 'Mobile Navigation',
      description: 'Mobile menu and navigation patterns',
      thumbnail: '/designs/mobile-nav.jpg',
      status: 'rejected',
      submittedBy: {
        name: 'Mike Chen',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Chen',
      },
      submittedAt: '2024-03-03T09:15:00Z',
      version: 1,
    },
  ];

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div className="space-y-4">
      {designs.map(design => {
        const StatusIcon = statusConfig[design.status].icon;

        return (
          <Link
            key={design.id}
            href={`/design-approval/${design.id}`}
            className="group block"
          >
            <div className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent">
              <div className="flex gap-4">
                <div className="relative h-24 w-32 overflow-hidden rounded-md">
                  <Image
                    src={design.thumbnail}
                    alt={design.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{design.title}</h3>
                      <div className={`flex items-center gap-1 ${statusConfig[design.status].color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-sm">{statusConfig[design.status].label}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {design.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={design.submittedBy.avatar}
                        alt={design.submittedBy.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">
                        {design.submittedBy.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Version {design.version}</span>
                      <span>{formatDate(design.submittedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 