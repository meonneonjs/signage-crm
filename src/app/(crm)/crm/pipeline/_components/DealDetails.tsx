'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Calendar, Users, Clock, FileText } from 'lucide-react';

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

interface DealDetailsProps {
  deal: Deal | undefined;
  stages: Stage[];
}

export function DealDetails({ deal, stages }: DealDetailsProps) {
  if (!deal) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <FileText className="w-12 h-12 text-gray-400" />
            <div className="text-lg font-medium text-gray-900">
              Select a deal to view details
            </div>
            <p className="text-sm text-gray-500">
              Choose a deal from the pipeline to view and manage its details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStage = stages.find(s => s.id === deal.stage);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{deal.title}</h3>
          <p className="text-sm text-gray-500">{deal.company}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Stage</span>
            <Select defaultValue={deal.stage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  <Badge className={currentStage?.color}>
                    {currentStage?.name}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {stages.map(stage => (
                  <SelectItem key={stage.id} value={stage.id}>
                    <Badge className={stage.color}>{stage.name}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Deal Value</span>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
              <span className="font-medium">{deal.value.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Probability</span>
            <Badge variant="outline">{deal.probability}%</Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Expected Close</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-gray-500" />
              <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Owner</span>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-gray-500" />
              <span>{deal.owner}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Last Activity</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-500" />
              <span>{new Date(deal.lastActivity).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Contacts</h4>
          <div className="space-y-1">
            {deal.contacts.map((contact, index) => (
              <div
                key={index}
                className="text-sm px-3 py-2 bg-gray-50 rounded-md"
              >
                {contact}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Notes</h4>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3">
            {deal.notes}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-full bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
            Edit Deal
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Add Activity</Button>
            <Button variant="outline">Add Contact</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 