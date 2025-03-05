'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare, Calendar, Search } from 'lucide-react';

// Demo data - replace with actual data fetching
const demoCommunications = [
  {
    id: '1',
    type: 'email',
    clientName: 'John Smith',
    clientId: '1',
    subject: 'Project Update Meeting',
    content: 'Hi John, Following up on our discussion about the project timeline...',
    timestamp: '2024-03-05T10:30:00Z',
    status: 'sent'
  },
  {
    id: '2',
    type: 'call',
    clientName: 'Sarah Johnson',
    clientId: '2',
    subject: 'Initial Consultation',
    content: 'Discussed project requirements and budget constraints',
    timestamp: '2024-03-04T15:45:00Z',
    status: 'completed'
  },
  {
    id: '3',
    type: 'meeting',
    clientName: 'Mike Brown',
    clientId: '3',
    subject: 'Quarterly Review',
    content: 'Reviewed Q1 progress and set Q2 goals',
    timestamp: '2024-03-06T13:00:00Z',
    status: 'scheduled'
  }
];

const emailTemplates = [
  { 
    id: '1',
    name: 'Project Update',
    subject: 'Project Status Update',
    content: 'Dear {client},\n\nHere is your project status update...'
  },
  { 
    id: '2',
    name: 'Meeting Follow-up',
    subject: 'Meeting Summary',
    content: 'Dear {client},\n\nThank you for your time today...'
  },
  { 
    id: '3',
    name: 'Welcome Message',
    subject: 'Welcome to Our Service',
    content: 'Dear {client},\n\nWelcome aboard! We\'re excited...'
  }
];

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');

  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailSubject(template.subject);
      setEmailContent(template.content);
    }
  };

  const filteredCommunications = demoCommunications.filter(comm =>
    comm.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Communication Center</h1>
        <div className="flex space-x-2">
          <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
            <Phone className="w-4 h-4 mr-2" />
            Log Call
          </Button>
          <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email template" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />

              <Textarea
                placeholder="Email content..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-[200px]"
              />

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search communications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="space-y-4">
            {filteredCommunications.map(comm => (
              <Card key={comm.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {comm.type === 'email' && <Mail className="w-4 h-4" />}
                      {comm.type === 'call' && <Phone className="w-4 h-4" />}
                      {comm.type === 'meeting' && <Calendar className="w-4 h-4" />}
                      <h3 className="font-semibold text-lg">{comm.subject}</h3>
                    </div>
                    <p className="text-sm text-gray-500">with {comm.clientName}</p>
                    <p className="text-sm">{comm.content}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {new Date(comm.timestamp).toLocaleString()}
                    </span>
                    <div className="mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        comm.status === 'sent' ? 'bg-green-100 text-green-800' :
                        comm.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {emailTemplates.map(template => (
              <Card key={template.id} className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.subject}</p>
                  <p className="text-sm">{template.content.substring(0, 100)}...</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button
                      size="sm"
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 