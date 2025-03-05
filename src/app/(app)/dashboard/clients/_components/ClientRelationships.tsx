'use client';

import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ClientRelationships() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Client Network</h3>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Relationships</SelectItem>
            <SelectItem value="direct">Direct Clients</SelectItem>
            <SelectItem value="referral">Referral Sources</SelectItem>
            <SelectItem value="partner">Partners</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-4 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Network visualization coming soon</p>
          <p className="text-xs text-gray-400">
            View and manage client relationships, referral sources, and business networks
          </p>
        </div>
      </Card>
    </div>
  );
} 