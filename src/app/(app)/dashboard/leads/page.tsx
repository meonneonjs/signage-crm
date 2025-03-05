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
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { NewLeadDialog } from './_components/NewLeadDialog';
import { LeadScoreCard } from './_components/LeadScoreCard';

// Demo data - replace with actual API integration
const demoLeads = [
  {
    id: '1',
    companyName: 'Tech Solutions Inc',
    contactName: 'John Smith',
    email: 'john@techsolutions.com',
    phone: '(555) 123-4567',
    source: 'Website',
    status: 'New',
    score: 85,
    lastContact: '2024-03-01',
    notes: 'Interested in digital signage for their new office building',
  },
  {
    id: '2',
    companyName: 'Retail Group',
    contactName: 'Sarah Johnson',
    email: 'sarah@retailgroup.com',
    phone: '(555) 234-5678',
    source: 'Referral',
    status: 'Qualified',
    score: 92,
    lastContact: '2024-03-02',
    notes: 'Looking for store display solutions',
  },
  {
    id: '3',
    companyName: 'City Services',
    contactName: 'Mike Brown',
    email: 'mike@cityservices.com',
    phone: '(555) 345-6789',
    source: 'Trade Show',
    status: 'In Progress',
    score: 78,
    lastContact: '2024-03-03',
    notes: 'Need outdoor digital displays for public spaces',
  },
];

const leadStatuses = ['New', 'Qualified', 'In Progress', 'Nurturing', 'Converted', 'Lost'];
const leadSources = ['Website', 'Referral', 'Trade Show', 'Cold Call', 'Social Media', 'Email Campaign'];

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredLeads = demoLeads
    .filter(lead => {
      const matchesSearch = 
        lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'score':
          return (a.score - b.score) * order;
        case 'company':
          return a.companyName.localeCompare(b.companyName) * order;
        case 'lastContact':
          return (new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime()) * order;
        default:
          return 0;
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Nurturing': return 'bg-purple-100 text-purple-800';
      case 'Converted': return 'bg-emerald-100 text-emerald-800';
      case 'Lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Lead Management</h1>
        <NewLeadDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <LeadScoreCard
          title="Average Lead Score"
          score={85}
          trend={5.2}
          description="Based on engagement and qualification criteria"
        />
        <LeadScoreCard
          title="New Leads (30 days)"
          score={24}
          trend={12.5}
          description="Compared to previous period"
          isCount
        />
        <LeadScoreCard
          title="Conversion Rate"
          score={32}
          trend={-2.3}
          description="Leads converted to opportunities"
          suffix="%"
        />
        <LeadScoreCard
          title="Response Time"
          score={2.5}
          trend={-15.4}
          description="Average hours to first contact"
          suffix="h"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {leadStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {leadSources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Lead Score</SelectItem>
                  <SelectItem value="company">Company Name</SelectItem>
                  <SelectItem value="lastContact">Last Contact</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Source</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Score</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Last Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="p-4">
                        <div className="font-medium">{lead.companyName}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        <div>{lead.contactName}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="p-4">{lead.source}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Badge className={getScoreColor(lead.score)}>{lead.score}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 