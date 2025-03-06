'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  TrendingUp,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  Star,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { demoProjects, demoTasks, demoNotifications } from '@/db/demo';
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { UserRole } from '@/types/roles';
import { usePermissions } from '@/contexts/PermissionContext';

// Demo data
const leadScores = [
  { name: 'Cold', value: 30, color: '#94A3B8' },
  { name: 'Warm', value: 45, color: '#FCD34D' },
  { name: 'Hot', value: 25, color: '#EF4444' },
];

const pipelineData = [
  { stage: 'Lead', count: 145, value: 290000 },
  { stage: 'Meeting', count: 89, value: 178000 },
  { stage: 'Proposal', count: 42, value: 126000 },
  { stage: 'Negotiation', count: 28, value: 98000 },
  { stage: 'Closed', count: 15, value: 75000 },
];

const kpis = [
  {
    title: 'Total Leads',
    value: '2,834',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Conversion Rate',
    value: '24.8%',
    change: '+3.2%',
    trend: 'up',
    icon: Target,
  },
  {
    title: 'Revenue',
    value: '$567,890',
    change: '-2.5%',
    trend: 'down',
    icon: DollarSign,
  },
  {
    title: 'Customer LTV',
    value: '$1,890',
    change: '+8.1%',
    trend: 'up',
    icon: TrendingUp,
  },
];

const recentLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Tech Solutions Inc.',
    score: 85,
    status: 'New',
    lastContact: '2h ago',
    avatar: '/avatars/sarah.png',
    initials: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Digital Dynamics',
    score: 92,
    status: 'Meeting Scheduled',
    lastContact: '5h ago',
    avatar: '/avatars/michael.png',
    initials: 'MC',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    company: 'Creative Studios',
    score: 78,
    status: 'Follow-up',
    lastContact: '1d ago',
    avatar: '/avatars/emma.png',
    initials: 'EW',
  },
];

const aiRecommendations = [
  {
    id: '1',
    type: 'lead_scoring',
    title: 'High-Value Lead Alert',
    description: 'Tech Solutions Inc. shows strong buying signals. Consider immediate follow-up.',
    priority: 'high',
  },
  {
    id: '2',
    type: 'engagement',
    title: 'Re-engagement Opportunity',
    description: 'Digital Dynamics has been inactive for 14 days. Send personalized outreach.',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'deal_risk',
    title: 'Deal Risk Warning',
    description: 'Creative Studios deal showing signs of stalling. Review and take action.',
    priority: 'high',
  },
];

const upcomingTasks = [
  {
    id: '1',
    title: 'Follow-up call with Sarah Johnson',
    dueDate: '2024-03-20T10:00:00',
    type: 'call',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Send proposal to Digital Dynamics',
    dueDate: '2024-03-21T15:00:00',
    type: 'email',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Product demo for Creative Studios',
    dueDate: '2024-03-22T11:00:00',
    type: 'meeting',
    priority: 'high',
  },
];

// Demo data - replace with actual data from your backend
const demoUser = {
  id: '1',
  name: 'John Smith',
  role: 'sales_rep' as UserRole,
  teamId: '1',
};

const demoDeals = [
  { id: '1', name: 'Enterprise Deal A', value: 50000, status: 'Negotiating', assigneeId: '1', teamId: '1', date: '2024-03-01' },
  { id: '2', name: 'SMB Deal B', value: 15000, status: 'Proposal Sent', assigneeId: '2', teamId: '1', date: '2024-03-05' },
  { id: '3', name: 'Enterprise Deal C', value: 75000, status: 'Meeting Scheduled', assigneeId: '1', teamId: '2', date: '2024-03-10' },
  // Add more demo deals...
];

const demoLeadsByStatus = [
  { name: 'New', value: 45 },
  { name: 'Contacted', value: 30 },
  { name: 'Meeting Scheduled', value: 15 },
  { name: 'Proposal Sent', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const { userRole, can } = usePermissions();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [currentUser] = useState(demoUser);
  const [filters, setFilters] = useState<{
    dateRange: { from: Date | undefined; to: Date | undefined };
    assignee: string;
    team: string;
    status: string;
    industry: string;
    region: string;
    tags: string[];
  }>({
    dateRange: { from: undefined, to: undefined },
    assignee: 'all',
    team: 'all',
    status: 'All Statuses',
    industry: 'All Industries',
    region: 'All Regions',
    tags: [],
  });

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'lead_scoring':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'engagement':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'deal_risk':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  // Filter deals based on user role and selected filters
  const filteredDeals = demoDeals.filter(deal => {
    // Role-based filtering
    if (currentUser.role === 'sales_rep' && deal.assigneeId !== currentUser.id) {
      return false;
    }
    if (currentUser.role === 'manager' && deal.teamId !== currentUser.teamId) {
      return false;
    }
    
    // Filter by assignee
    if (filters.assignee !== 'all' && deal.assigneeId !== filters.assignee) {
      return false;
    }
    
    // Filter by team
    if (filters.team !== 'all' && deal.teamId !== filters.team) {
      return false;
    }
    
    // Filter by status
    if (filters.status !== 'All Statuses' && deal.status !== filters.status) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange.from && filters.dateRange.to) {
      const dealDate = new Date(deal.date);
      if (dealDate < filters.dateRange.from || dealDate > filters.dateRange.to) {
        return false;
      }
    }
    
    return true;
  });

  // Calculate metrics based on filtered deals
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const averageDealValue = totalValue / filteredDeals.length || 0;
  
  // Prepare data for charts
  const dealsByMonth = [
    { month: 'Jan', value: 120000 },
    { month: 'Feb', value: 150000 },
    { month: 'Mar', value: totalValue },
    // Add more months...
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <DashboardFilters
        userRole={userRole}
        onFilterChange={setFilters}
      />

      <div className="space-y-8 p-8">
        {can('analytics', 'view') && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('7d')}>
                  7 Days
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('30d')}>
                  30 Days
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('90d')}>
                  90 Days
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi) => (
                <Card key={kpi.title} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <kpi.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className={cn(
                      'flex items-center text-sm font-medium',
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {kpi.change}
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {can('deals', 'view') && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sales Pipeline</CardTitle>
                    {can('deals', 'create') && (
                      <Button variant="outline" size="sm">Add Deal</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pipelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis yAxisId="left" orientation="left" stroke="#94A3B8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#2563EB" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" name="Number of Deals" fill="#94A3B8" />
                        <Bar yAxisId="right" dataKey="value" name="Value ($)" fill="#2563EB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Lead Scoring Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadScores}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {leadScores.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {can('leads', 'view') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Leads</CardTitle>
                  {can('leads', 'create') && (
                    <Button variant="outline" size="sm">Add Lead</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {recentLeads.map((lead) => (
                      <div key={lead.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
                        <Avatar>
                          <AvatarImage src={lead.avatar} />
                          <AvatarFallback>{lead.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <span className="text-sm text-gray-500">{lead.lastContact}</span>
                          </div>
                          <p className="text-sm text-gray-500">{lead.company}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Lead Score</span>
                                <span>{lead.score}%</span>
                              </div>
                              <Progress value={lead.score} className="h-1" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              {lead.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-4">
                      {aiRecommendations.map((rec) => (
                        <div key={rec.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
                          {getRecommendationIcon(rec.type)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                            <p className="text-sm text-gray-500">{rec.description}</p>
                            <span className={cn(
                              "inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full",
                              rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            )}>
                              {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {can('tasks', 'view') && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Tasks</CardTitle>
                      {can('tasks', 'create') && (
                        <Button variant="outline" size="sm">Add Task</Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[160px]">
                      <div className="space-y-4">
                        {upcomingTasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
                            {getTaskIcon(task.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{task.title}</p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full",
                                  task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                )}>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {can('team', 'view') && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Recent Deals</h3>
              {can('deals', 'create') && (
                <Button variant="outline" size="sm">Export Deals</Button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{deal.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${deal.value.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{deal.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(deal.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 