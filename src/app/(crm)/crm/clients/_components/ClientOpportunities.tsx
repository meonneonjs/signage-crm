'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: 'lead', name: 'Lead', color: 'bg-gray-100' },
  { id: 'contact', name: 'Contact Made', color: 'bg-blue-50' },
  { id: 'proposal', name: 'Proposal Sent', color: 'bg-yellow-50' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-50' },
  { id: 'closed', name: 'Closed Won', color: 'bg-green-50' },
];

export function ClientOpportunities() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Pipeline</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{stage.name}</h4>
              <span className="text-sm text-gray-500">0</span>
            </div>
            <Card className={cn("p-4 min-h-[200px]", stage.color)}>
              <div className="text-sm text-gray-500 text-center">
                No opportunities
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
} 