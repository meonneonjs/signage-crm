import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Filter,
  X,
  CalendarIcon,
  Users,
  Building2,
  MapPin,
  Tags,
} from "lucide-react";
import { format } from 'date-fns';
import { UserRole } from '@/types/roles';

interface FilterValue {
  dateRange: { from: Date | undefined; to: Date | undefined };
  assignee: string;
  team: string;
  status: string;
  industry: string;
  region: string;
  tags: string[];
}

interface DashboardFiltersProps {
  userRole: UserRole;
  onFilterChange: (filters: FilterValue) => void;
}

const teamMembers = [
  { id: 'all', name: 'All Team Members' },
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Chen' },
];

const teams = [
  { id: 'all', name: 'All Teams' },
  { id: '1', name: 'Sales Team A' },
  { id: '2', name: 'Sales Team B' },
  { id: '3', name: 'Enterprise Team' },
];

const statuses = [
  'All Statuses',
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Negotiating',
  'Closed Won',
  'Closed Lost',
];

const industries = [
  'All Industries',
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
];

const regions = [
  'All Regions',
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East',
];

const tags = [
  'High Value',
  'Quick Close',
  'Enterprise',
  'SMB',
  'Referral',
  'Competitor Switch',
];

export function DashboardFilters({ userRole, onFilterChange }: DashboardFiltersProps) {
  const [filters, setFilters] = useState<FilterValue>({
    dateRange: { from: undefined, to: undefined },
    assignee: 'all',
    team: 'all',
    status: 'All Statuses',
    industry: 'All Industries',
    region: 'All Regions',
    tags: [],
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterValue, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const canViewTeamFilters = ['owner', 'admin', 'manager'].includes(userRole);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={{ 
                from: filters.dateRange.from,
                to: filters.dateRange.to
              }}
              onSelect={(range) => handleFilterChange('dateRange', {
                from: range?.from,
                to: range?.to
              })}
            />
          </PopoverContent>
        </Popover>

        {canViewTeamFilters && (
          <>
            <Select
              value={filters.assignee}
              onValueChange={(value) => handleFilterChange('assignee', value)}
            >
              <SelectTrigger className="w-[200px]">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.team}
              onValueChange={(value) => handleFilterChange('team', value)}
            >
              <SelectTrigger className="w-[200px]">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.industry}
          onValueChange={(value) => handleFilterChange('industry', value)}
        >
          <SelectTrigger className="w-[200px]">
            <Building2 className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.region}
          onValueChange={(value) => handleFilterChange('region', value)}
        >
          <SelectTrigger className="w-[200px]">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.tags[0] || ''}
          onValueChange={(value) => handleFilterChange('tags', [value])}
        >
          <SelectTrigger className="w-[200px]">
            <Tags className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Tags" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (key === 'dateRange' && (value.from || value.to)) {
            return (
              <div key={key} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <span>
                  {value.from ? format(value.from, "LLL dd, y") : ''} 
                  {value.to ? ` - ${format(value.to, "LLL dd, y")}` : ''}
                </span>
                <button
                  onClick={() => handleFilterChange(key as keyof FilterValue, { from: undefined, to: undefined })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          }
          if (Array.isArray(value) && value.length > 0) {
            return value.map((v) => (
              <div key={`${key}-${v}`} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <span>{v}</span>
                <button
                  onClick={() => handleFilterChange(key as keyof FilterValue, value.filter(t => t !== v))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ));
          }
          if (typeof value === 'string' && value !== 'all' && !value.startsWith('All')) {
            return (
              <div key={key} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <span>{value}</span>
                <button
                  onClick={() => handleFilterChange(key as keyof FilterValue, 'all')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
} 