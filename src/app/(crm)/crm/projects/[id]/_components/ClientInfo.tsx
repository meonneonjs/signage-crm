import { Client, demoClients } from '@/db/demo';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Building, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';

interface ClientInfoProps {
  client: Client | undefined;
  onClientChange?: (clientId: string) => void;
}

export default function ClientInfo({ client, onClientChange }: ClientInfoProps) {
  const [search, setSearch] = useState('');
  const filteredClients = demoClients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Client Information</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              {client ? (
                <>
                  <span>Reassign Client</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500 truncate max-w-[100px]">{client.name}</span>
                </>
              ) : (
                'Assign Client'
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-2 border-b">
              <Input
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8"
              />
            </div>
            <ScrollArea className="h-72">
              <div className="p-2">
                {filteredClients.map((c) => (
                  <button
                    key={c.id}
                    className={`w-full text-left p-2 hover:bg-gray-100 rounded-md flex items-center gap-3 ${
                      client?.id === c.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => onClientChange?.(c.id)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{c.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-500">{c.company}</p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
      {client ? (
        <div className="space-y-4">
          <Link 
            href={`/dashboard/clients/${client.id}`}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-500">{client.company}</p>
            </div>
          </Link>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Mail className="h-4 w-4" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Phone className="h-4 w-4" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{client.address}</span>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">{client.notes}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Building className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No client assigned</p>
          <p className="text-sm">Click "Assign Client" to assign one</p>
        </div>
      )}
    </Card>
  );
} 