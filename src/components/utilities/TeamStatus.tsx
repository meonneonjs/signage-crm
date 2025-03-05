'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCircle2, Search } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'meeting' | 'break' | 'offline';
  department: 'design' | 'production' | 'installation' | 'sales' | 'management';
  lastActive: string;
  currentTask?: string;
}

const SAMPLE_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Senior Designer',
    status: 'busy',
    department: 'design',
    lastActive: '2 mins ago',
    currentTask: 'Working on XYZ Corp signage design'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Production Manager',
    status: 'available',
    department: 'production',
    lastActive: 'Just now'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Installation Lead',
    status: 'meeting',
    department: 'installation',
    lastActive: '5 mins ago',
    currentTask: 'Client meeting - ABC Retail'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    role: 'Sales Representative',
    status: 'break',
    department: 'sales',
    lastActive: '15 mins ago'
  },
  {
    id: '5',
    name: 'David Brown',
    role: 'Operations Manager',
    status: 'offline',
    department: 'management',
    lastActive: '1 hour ago'
  }
];

export function TeamStatus() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<TeamMember['department'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TeamMember['status'] | 'all'>('all');

  const statusColors = {
    available: 'bg-green-100 text-green-700',
    busy: 'bg-orange-100 text-orange-700',
    meeting: 'bg-purple-100 text-purple-700',
    break: 'bg-blue-100 text-blue-700',
    offline: 'bg-gray-100 text-gray-700'
  };

  const departmentColors = {
    design: 'bg-indigo-100 text-indigo-700',
    production: 'bg-green-100 text-green-700',
    installation: 'bg-orange-100 text-orange-700',
    sales: 'bg-blue-100 text-blue-700',
    management: 'bg-purple-100 text-purple-700'
  };

  const filteredTeam = SAMPLE_TEAM.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members..."
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <Select
              value={departmentFilter}
              onValueChange={(value: TeamMember['department'] | 'all') => setDepartmentFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={statusFilter}
              onValueChange={(value: TeamMember['status'] | 'all') => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="meeting">In Meeting</SelectItem>
                <SelectItem value="break">On Break</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTeam.map(member => (
          <Card key={member.id} className="p-4">
            <div className="flex items-start gap-4">
              <UserCircle2 className="h-10 w-10 text-gray-400" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{member.name}</h4>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    statusColors[member.status]
                  )}>
                    {member.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    departmentColors[member.department]
                  )}>
                    {member.department}
                  </span>
                  <span className="text-xs text-gray-500">
                    Active {member.lastActive}
                  </span>
                </div>
                {member.currentTask && (
                  <p className="text-sm text-gray-600 mt-2">
                    {member.currentTask}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredTeam.length === 0 && (
          <div className="text-center text-gray-500">
            No team members found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
} 