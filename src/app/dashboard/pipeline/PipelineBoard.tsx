'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
} from '@tremor/react';
import { DealStage } from '@prisma/client';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Deal {
  id: string;
  name: string;
  value: number;
  closeProbability: number;
  stage: DealStage;
  lead: {
    contactName: string;
    companyName: string | null;
  };
  assignedTo: {
    name: string | null;
  };
}

interface DealCardProps {
  deal: Deal;
  onDragEnd: (dealId: string, newStage: DealStage) => Promise<void>;
}

const STAGE_COLORS = {
  INITIAL_CONTACT: 'gray',
  DESIGN_CONSULTATION: 'blue',
  PROPOSAL: 'yellow',
  DESIGN_APPROVAL: 'purple',
  PRODUCTION: 'orange',
  INSTALLATION: 'indigo',
  FOLLOW_UP: 'teal',
  CLOSED_WON: 'green',
  CLOSED_LOST: 'red',
} as const;

const STAGES = [
  'INITIAL_CONTACT',
  'DESIGN_CONSULTATION',
  'PROPOSAL',
  'DESIGN_APPROVAL',
  'PRODUCTION',
  'INSTALLATION',
  'FOLLOW_UP',
] as const;

function formatStage(stage: string) {
  return stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

function DealCard({ deal, onDragEnd }: DealCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DEAL',
    item: { id: deal.id, stage: deal.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      <Card className="mb-3">
        <Link
          href={`/dashboard/pipeline/${deal.id}`}
          className="block hover:bg-gray-50 -m-4 p-4"
        >
          <Title>{deal.name}</Title>
          <div className="mt-2">
            <Text>{deal.lead.contactName}</Text>
            {deal.lead.companyName && (
              <Text className="text-gray-500">{deal.lead.companyName}</Text>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Text className="font-medium">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(deal.value)}
            </Text>
            <Badge color={STAGE_COLORS[deal.stage]}>
              {deal.closeProbability}%
            </Badge>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Assigned to {deal.assignedTo.name || 'Unassigned'}
          </div>
        </Link>
      </Card>
    </div>
  );
}

function StageColumn({
  stage,
  deals,
  onDragEnd,
}: {
  stage: DealStage;
  deals: Deal[];
  onDragEnd: (dealId: string, newStage: DealStage) => Promise<void>;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DEAL',
    drop: (item: { id: string }) => {
      onDragEnd(item.id, stage);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const stageValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce(
    (sum, deal) => sum + (deal.value * deal.closeProbability) / 100,
    0
  );

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] p-4 rounded-lg ${
        isOver ? 'bg-gray-100' : 'bg-gray-50'
      }`}
    >
      <div className="mb-4">
        <Title>{formatStage(stage)}</Title>
        <div className="mt-1 text-sm text-gray-500">
          <div>{deals.length} deals</div>
          <div>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(stageValue)}
          </div>
          <div className="text-xs">
            Weighted:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(weightedValue)}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onDragEnd={onDragEnd} />
        ))}
      </div>
    </div>
  );
}

export default function PipelineBoard({
  initialDeals,
}: {
  initialDeals: Deal[];
}) {
  const [deals, setDeals] = useState(initialDeals);
  const router = useRouter();

  const handleDragEnd = async (dealId: string, newStage: DealStage) => {
    try {
      const response = await fetch(`/api/deals/${dealId}/stage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!response.ok) {
        throw new Error('Failed to update deal stage');
      }

      setDeals((prevDeals) =>
        prevDeals.map((deal) =>
          deal.id === dealId ? { ...deal, stage: newStage } : deal
        )
      );

      router.refresh();
    } catch (error) {
      console.error('Error updating deal stage:', error);
      // TODO: Add error handling UI
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage as DealStage}
            deals={deals.filter((deal) => deal.stage === stage)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </DndProvider>
  );
} 