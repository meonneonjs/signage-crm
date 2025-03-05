import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Power } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected';
  icon: string;
  lastSync: string | null;
}

interface IntegrationCardProps {
  integration: Integration;
  onConfigure: () => void;
}

export function IntegrationCard({ integration, onConfigure }: IntegrationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConnectionToggle = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual connection/disconnection API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      toast.success(
        integration.status === 'connected' 
          ? `Disconnected from ${integration.name}` 
          : `Connected to ${integration.name}`
      );
    } catch (error) {
      console.error('Connection toggle failed:', error);
      toast.error(
        `Failed to ${integration.status === 'connected' ? 'disconnect from' : 'connect to'} ${integration.name}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                {!imageError ? (
                  <Image
                    src={integration.icon}
                    alt={integration.name}
                    fill
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-500">
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{integration.name}</h3>
                <p className="text-sm text-gray-500">{integration.category}</p>
              </div>
            </div>
            <Badge className={getStatusColor(integration.status)}>
              {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
            </Badge>
          </div>

          <p className="text-sm text-gray-600">
            {integration.description}
          </p>

          {integration.lastSync && (
            <p className="text-xs text-gray-500">
              Last synced: {new Date(integration.lastSync).toLocaleString()}
            </p>
          )}

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={onConfigure}
            >
              <Settings className="w-4 h-4" />
              Configure
            </Button>
            <Button
              variant={integration.status === 'connected' ? 'destructive' : 'default'}
              size="sm"
              className={`gap-2 ${
                integration.status === 'connected' ? '' : 'bg-[#1eb5b6] hover:bg-[#1eb5b6]/90'
              }`}
              onClick={handleConnectionToggle}
              disabled={isLoading}
            >
              <Power className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading 
                ? (integration.status === 'connected' ? 'Disconnecting...' : 'Connecting...') 
                : (integration.status === 'connected' ? 'Disconnect' : 'Connect')
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 