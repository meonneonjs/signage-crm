'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, DollarSign } from 'lucide-react';
import { NewDealDialog } from './_components/NewDealDialog';
import { PipelineBoard } from './_components/PipelineBoard';
import { DealDetails } from './_components/DealDetails';

// Demo data - replace with actual API integration
const demoPipeline = {
  stages: [
    { id: 'lead', name: 'Lead', color: 'bg-blue-100 text-blue-800' },
    { id: 'qualified', name: 'Qualified', color: 'bg-purple-100 text-purple-800' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'closed', name: 'Closed Won', color: 'bg-green-100 text-green-800' },
    { id: 'lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800' },
  ],
  deals: [
    {
      id: '1',
      title: 'Digital Signage Solution',
      company: 'Tech Corp',
      value: 75000,
      stage: 'qualified',
      probability: 60,
      expectedCloseDate: '2024-04-15',
      owner: 'John Smith',
      lastActivity: '2024-03-01',
      contacts: ['sarah@techcorp.com', 'mike@techcorp.com'],
      notes: 'Interested in enterprise-wide digital signage deployment',
    },
    {
      id: '2',
      title: 'Retail Display Network',
      company: 'Retail Group',
      value: 120000,
      stage: 'proposal',
      probability: 75,
      expectedCloseDate: '2024-04-30',
      owner: 'Sarah Johnson',
      lastActivity: '2024-03-02',
      contacts: ['john@retailgroup.com'],
      notes: 'Proposal for 50 store locations',
    },
    {
      id: '3',
      title: 'Interactive Kiosks',
      company: 'City Services',
      value: 45000,
      stage: 'lead',
      probability: 30,
      expectedCloseDate: '2024-05-15',
      owner: 'Mike Brown',
      lastActivity: '2024-03-03',
      contacts: ['director@cityservices.gov'],
      notes: 'Initial discussion for public information kiosks',
    },
  ],
};

export default function PipelinePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [valueFilter, setValueFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');

  const owners = Array.from(new Set(demoPipeline.deals.map(deal => deal.owner)));

  const filteredDeals = demoPipeline.deals.filter(deal => {
    const matchesSearch = 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesValue = valueFilter === 'all' || 
      (valueFilter === 'high' && deal.value >= 100000) ||
      (valueFilter === 'medium' && deal.value >= 50000 && deal.value < 100000) ||
      (valueFilter === 'low' && deal.value < 50000);
    const matchesOwner = ownerFilter === 'all' || deal.owner === ownerFilter;
    return matchesSearch && matchesValue && matchesOwner;
  });

  const dealsByStage = demoPipeline.stages.reduce((acc, stage) => {
    acc[stage.id] = filteredDeals.filter(deal => deal.stage === stage.id);
    return acc;
  }, {} as Record<string, typeof demoPipeline.deals>);

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Pipeline Management</h1>
        <NewDealDialog stages={demoPipeline.stages} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Total Pipeline Value</div>
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold mt-2">
              ${totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Weighted Pipeline Value</div>
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold mt-2">
              ${Math.round(weightedValue).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Active Deals</div>
              <Badge variant="outline">{filteredDeals.length}</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              {filteredDeals.filter(d => d.stage !== 'closed' && d.stage !== 'lost').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Win Rate</div>
              <Badge variant="outline">Last 30 Days</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              {Math.round((filteredDeals.filter(d => d.stage === 'closed').length / 
                filteredDeals.filter(d => d.stage === 'closed' || d.stage === 'lost').length) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deals Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search deals..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select value={valueFilter} onValueChange={setValueFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Values</SelectItem>
                  <SelectItem value="high">High Value (≥$100k)</SelectItem>
                  <SelectItem value="medium">Medium Value (50k-100k)</SelectItem>
                  <SelectItem value="low">Low Value (less than 50k)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  {owners.map(owner => (
                    <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <PipelineBoard
                  stages={demoPipeline.stages}
                  dealsByStage={dealsByStage}
                  onSelectDeal={setSelectedDeal}
                  selectedDeal={selectedDeal}
                />
              </div>
              <div>
                <DealDetails
                  deal={filteredDeals.find(d => d.id === selectedDeal)}
                  stages={demoPipeline.stages}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 