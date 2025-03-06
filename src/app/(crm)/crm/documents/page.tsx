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
import { Search, Upload, Filter, FolderPlus } from 'lucide-react';
import { UploadDocumentDialog } from './_components/UploadDocumentDialog';
import { DocumentList } from './_components/DocumentList';
import { DocumentPreview } from './_components/DocumentPreview';

// Demo data - replace with actual API integration
const demoDocuments = [
  {
    id: '1',
    name: 'Service Agreement.pdf',
    type: 'Contract',
    status: 'Pending Signature',
    uploadedBy: 'John Smith',
    uploadDate: '2024-03-01',
    size: '2.4 MB',
    signers: ['client@example.com', 'manager@company.com'],
  },
  {
    id: '2',
    name: 'Project Proposal.docx',
    type: 'Proposal',
    status: 'Draft',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2024-03-02',
    size: '1.8 MB',
    signers: [],
  },
  {
    id: '3',
    name: 'Requirements.pdf',
    type: 'Specification',
    status: 'Signed',
    uploadedBy: 'Mike Brown',
    uploadDate: '2024-03-03',
    size: '3.1 MB',
    signers: ['client@example.com'],
  },
];

const documentTypes = ['All Types', 'Contract', 'Proposal', 'Specification', 'Invoice', 'Report'];
const documentStatuses = ['All Statuses', 'Draft', 'Pending Signature', 'Signed', 'Expired'];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const filteredDocuments = demoDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All Types' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'All Statuses' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Signature': return 'bg-yellow-100 text-yellow-800';
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-blue-100 text-blue-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Document Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <UploadDocumentDialog />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {documentStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DocumentList
                  documents={filteredDocuments}
                  selectedDocument={selectedDocument}
                  onSelectDocument={setSelectedDocument}
                  getStatusColor={getStatusColor}
                />
              </div>
              <div>
                <DocumentPreview
                  document={filteredDocuments.find(d => d.id === selectedDocument)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 