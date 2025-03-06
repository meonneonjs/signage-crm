'use client';

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DollarSign } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  lastActivity: string;
  contacts: string[];
  notes: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
}

interface PipelineBoardProps {
  stages: Stage[];
  dealsByStage: Record<string, Deal[]>;
  onSelectDeal: (id: string) => void;
  selectedDeal: string | null;
}

export function PipelineBoard({
  stages,
  dealsByStage,
  onSelectDeal,
  selectedDeal,
}: PipelineBoardProps) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {stages.map((stage) => (
        <div key={stage.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={stage.color}>{stage.name}</Badge>
            <Badge variant="outline">
              {dealsByStage[stage.id]?.length || 0}
            </Badge>
          </div>
          <div className="space-y-2">
            {dealsByStage[stage.id]?.map((deal) => (
              <Card
                key={deal.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  selectedDeal === deal.id ? 'ring-2 ring-[#1eb5b6]' : ''
                }`}
                onClick={() => onSelectDeal(deal.id)}
              >
                <div className="space-y-2">
                  <div className="font-medium truncate">{deal.title}</div>
                  <div className="text-sm text-gray-500 truncate">{deal.company}</div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-900">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {deal.value.toLocaleString()}
                    </div>
                    <Badge variant="outline">{deal.probability}%</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Due {new Date(deal.expectedCloseDate).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
            {(!dealsByStage[stage.id] || dealsByStage[stage.id].length === 0) && (
              <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-gray-500">
                No deals
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 