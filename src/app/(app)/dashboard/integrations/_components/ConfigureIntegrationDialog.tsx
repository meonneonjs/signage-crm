import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface ConfigureIntegrationDialogProps {
  integration: Integration | undefined;
  onClose: () => void;
}

interface ConfigurationForm {
  webhookUrl: string;
  apiKey: string;
  syncInterval: string;
  notifications: boolean;
  dataSync: {
    customers: boolean;
    orders: boolean;
    products: boolean;
    analytics: boolean;
  };
}

interface FormErrors {
  webhookUrl?: string;
  apiKey?: string;
}

export function ConfigureIntegrationDialog({
  integration,
  onClose,
}: ConfigureIntegrationDialogProps) {
  const [formData, setFormData] = useState<ConfigurationForm>({
    webhookUrl: 'https://api.example.com/webhook',
    apiKey: '••••••••••••••••',
    syncInterval: '15',
    notifications: true,
    dataSync: {
      customers: true,
      orders: true,
      products: true,
      analytics: false,
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  if (!integration) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.webhookUrl) {
      newErrors.webhookUrl = 'Webhook URL is required';
    } else if (!formData.webhookUrl.startsWith('https://')) {
      newErrors.webhookUrl = 'Webhook URL must use HTTPS';
    }

    if (!formData.apiKey) {
      newErrors.apiKey = 'API Key is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix the form errors before saving');
      return;
    }

    try {
      setIsSaving(true);
      // TODO: Implement actual API call to save configuration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      toast.success(`Configuration saved for ${integration.name}`);
      onClose();
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast.error('Failed to save configuration. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={Boolean(integration)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure {integration.name}</DialogTitle>
          <DialogDescription>
            Configure your integration settings and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sync">Data Sync</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      webhookUrl: e.target.value
                    }));
                    if (errors.webhookUrl) {
                      setErrors(prev => ({
                        ...prev,
                        webhookUrl: undefined
                      }));
                    }
                  }}
                  className={errors.webhookUrl ? 'border-red-500' : ''}
                />
                {errors.webhookUrl && (
                  <p className="text-sm text-red-500">{errors.webhookUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      apiKey: e.target.value
                    }));
                    if (errors.apiKey) {
                      setErrors(prev => ({
                        ...prev,
                        apiKey: undefined
                      }));
                    }
                  }}
                  className={errors.apiKey ? 'border-red-500' : ''}
                />
                {errors.apiKey && (
                  <p className="text-sm text-red-500">{errors.apiKey}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about sync status
                  </p>
                </div>
                <Switch
                  checked={formData.notifications}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notifications: checked
                  }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                <Select
                  value={formData.syncInterval}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    syncInterval: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Data to Sync</Label>
                <div className="space-y-2">
                  {Object.entries(formData.dataSync).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label className="capitalize">{key}</Label>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          dataSync: {
                            ...prev.dataSync,
                            [key]: checked
                          }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Debug Mode</Label>
                <p className="text-sm text-gray-500">
                  Enable detailed logging for troubleshooting
                </p>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Custom Headers</Label>
                <Input placeholder="Key: Value" />
                <Button variant="outline" size="sm">
                  Add Header
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 