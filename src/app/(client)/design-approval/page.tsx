import { DesignList } from '@/components/client-portal/design-approval/DesignList';
import { DesignFilters } from '@/components/client-portal/design-approval/DesignFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function DesignApprovalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Design Approval</h1>
          <p className="text-muted-foreground">Review and approve design submissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Submit Design
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-64">
          <DesignFilters />
        </div>
        <div className="flex-1">
          <DesignList />
        </div>
      </div>
    </div>
  );
} 