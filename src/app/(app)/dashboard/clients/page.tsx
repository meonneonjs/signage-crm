'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Grid2x2,
  LayoutList,
  Table as TableIcon,
  Plus,
  Filter,
  SlidersHorizontal,
  Search,
  MoreVertical,
  Building,
  Phone,
  Mail,
  MapPin,
  Users,
  UserCircle,
  Star,
  Archive,
  Loader2,
} from 'lucide-react';
import { useContactsStore } from '@/lib/stores/contactsStore';
import { useRouter } from 'next/navigation';
import { Client, mockClients } from '@/lib/mockData';

type ViewMode = 'grid' | 'list' | 'table';
type SortField = 'name' | 'company' | 'revenue' | 'lastContact' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export default function ClientsPage() {
  const router = useRouter();
  const { viewMode: contactsView, setViewMode: setContactsView, canPerformAction } = useContactsStore();
  const [layoutMode, setLayoutMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('lastContact');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredClients = mockClients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = !selectedType || client.type === selectedType;
      const matchesStatus = !selectedStatus || client.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'name') return multiplier * a.name.localeCompare(b.name);
      if (sortField === 'company') return multiplier * a.company.localeCompare(b.company);
      if (sortField === 'revenue') return multiplier * (a.revenue - b.revenue);
      if (sortField === 'lastContact') return multiplier * (a.lastContact.getTime() - b.lastContact.getTime());
      if (sortField === 'createdAt') return multiplier * (a.createdAt.getTime() - b.createdAt.getTime());
      return 0;
    });

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
    setShowBulkActions(true);
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
      setShowBulkActions(false);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
      setShowBulkActions(true);
    }
  };

  const handleBulkAction = (action: string) => {
    // Implement bulk actions here
    console.log(`Performing ${action} on clients:`, selectedClients);
    setSelectedClients([]);
    setShowBulkActions(false);
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting clients:', filteredClients);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const handleClientClick = (clientId: string) => {
    setIsLoading(true);
    router.push(`/dashboard/clients/${clientId}`);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredClients.map((client) => (
        <div key={client.id} className="relative group">
          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClientClick(client.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white">
                    {client.name[0]}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
              </div>
              <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                {client.status}
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                {client.phone}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Building className="h-4 w-4 mr-2" />
                {client.type}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="font-medium">${client.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Projects</p>
                <p className="font-medium">{client.projects.length}</p>
              </div>
            </div>
          </Card>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium">View Details</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredClients.map((client) => (
        <div key={client.id} className="relative group">
          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClientClick(client.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white text-lg">
                    {client.name[0]}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.company}</p>
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {client.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {client.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building className="h-4 w-4 mr-2" />
                      {client.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {client.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                  {client.status}
                </Badge>
                <div className="text-sm text-gray-500">
                  Last contact: {client.lastContact.toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium">View Details</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedClients.length === filteredClients.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-500">
              {selectedClients.length} selected
            </span>
          </div>
          {showBulkActions && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('export')}
              >
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('archive')}
              >
                Archive Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction('delete')}
              >
                Delete Selected
              </Button>
            </div>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {renderSortIcon('name')}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('company')}
            >
              Company {renderSortIcon('company')}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('revenue')}
            >
              Revenue {renderSortIcon('revenue')}
            </TableHead>
            <TableHead>Projects</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('lastContact')}
            >
              Last Contact {renderSortIcon('lastContact')}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('createdAt')}
            >
              Created {renderSortIcon('createdAt')}
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow 
              key={client.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleClientClick(client.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => handleSelectClient(client.id)}
                  className="rounded border-gray-300"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white">
                      {client.name[0]}
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.company}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{client.company}</TableCell>
              <TableCell>
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{client.email}</div>
                  <div className="text-gray-500">{client.phone}</div>
                </div>
              </TableCell>
              <TableCell>${client.revenue.toLocaleString()}</TableCell>
              <TableCell>{client.projects.length}</TableCell>
              <TableCell>{client.lastContact.toLocaleDateString()}</TableCell>
              <TableCell>{client.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{client.assignedTo}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleClientClick(client.id)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            Export
          </Button>
          {canPerformAction('edit') && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          )}
        </div>
      </div>

      <Tabs 
        value={contactsView} 
        onValueChange={(value) => setContactsView(value as typeof contactsView)} 
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="my-contacts" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            My Contacts
          </TabsTrigger>
          {canPerformAction('view') && (
            <TabsTrigger value="team-contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Contacts
            </TabsTrigger>
          )}
          {canPerformAction('admin') && (
            <TabsTrigger value="all-contacts" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              All Contacts
            </TabsTrigger>
          )}
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Leads
          </TabsTrigger>
          {canPerformAction('view') && (
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Archived
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedType(null)}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType('retail')}>
                Retail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType('corporate')}>
                Corporate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType('government')}>
                Government
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedIndustry(null)}>
                All Industries
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedIndustry('Retail')}>
                Retail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedIndustry('Technology')}>
                Technology
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedIndustry('Government')}>
                Government
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Save Filter
              </DropdownMenuItem>
              <DropdownMenuItem>
                Manage Custom Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('inactive')}>
                Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('lead')}>
                Lead
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 border rounded-lg p-1">
          <Button
            variant={layoutMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayoutMode('grid')}
          >
            <Grid2x2 className="h-4 w-4" />
          </Button>
          <Button
            variant={layoutMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayoutMode('list')}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={layoutMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayoutMode('table')}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {layoutMode === 'grid' && renderGridView()}
      {layoutMode === 'list' && renderListView()}
      {layoutMode === 'table' && renderTableView()}
    </div>
  );
} 