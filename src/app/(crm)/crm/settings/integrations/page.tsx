"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertCircle, Link, Key, RefreshCw, CheckCircle2, XCircle } from "lucide-react"

interface Integration {
  id: string
  name: string
  type: "email" | "calendar" | "crm" | "payment" | "communication" | "analytics" | "storage" | "other"
  status: "active" | "inactive" | "error" | "pending"
  config: {
    apiKey?: string
    apiSecret?: string
    webhookUrl?: string
    scopes?: string[]
    settings?: Record<string, any>
  }
  lastSync?: string
  error?: string
}

interface IntegrationSettings {
  integrations: Integration[]
  globalSettings: {
    enableIntegrations: boolean
    autoSync: boolean
    syncInterval: number
    webhookEndpoint: string
    apiKey: string
    apiSecret: string
    allowedOrigins: string[]
  }
}

export default function IntegrationsSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<IntegrationSettings>({
    integrations: [],
    globalSettings: {
      enableIntegrations: true,
      autoSync: true,
      syncInterval: 15,
      webhookEndpoint: "",
      apiKey: "",
      apiSecret: "",
      allowedOrigins: [],
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save integration settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your integration settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save integration settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      integrations: [],
      globalSettings: {
        enableIntegrations: true,
        autoSync: true,
        syncInterval: 15,
        webhookEndpoint: "",
        apiKey: "",
        apiSecret: "",
        allowedOrigins: [],
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your integration settings have been reset to default values.",
    })
  }

  const handleAddIntegration = () => {
    const newIntegration: Integration = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Integration",
      type: "other",
      status: "inactive",
      config: {},
    }
    setSettings({
      ...settings,
      integrations: [...settings.integrations, newIntegration],
    })
  }

  const handleDeleteIntegration = (integrationId: string) => {
    setSettings({
      ...settings,
      integrations: settings.integrations.filter((i) => i.id !== integrationId),
    })
  }

  const handleUpdateIntegration = (integrationId: string, updates: Partial<Integration>) => {
    setSettings({
      ...settings,
      integrations: settings.integrations.map((i) =>
        i.id === integrationId ? { ...i, ...updates } : i
      ),
    })
  }

  const getStatusBadge = (status: Integration["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      error: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Configure and manage third-party integrations for your CRM.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Configure general integration settings and API credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Integrations</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable all third-party integrations.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.enableIntegrations}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    enableIntegrations: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync data with integrated services.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.autoSync}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    autoSync: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Sync Interval (minutes)</Label>
            <Input
              type="number"
              value={settings.globalSettings.syncInterval}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    syncInterval: parseInt(e.target.value),
                  },
                })
              }
              min={1}
              max={1440}
            />
          </div>

          <div className="space-y-2">
            <Label>Webhook Endpoint</Label>
            <Input
              value={settings.globalSettings.webhookEndpoint}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    webhookEndpoint: e.target.value,
                  },
                })
              }
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex space-x-2">
              <Input
                type="password"
                value={settings.globalSettings.apiKey}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      apiKey: e.target.value,
                    },
                  })
                }
              />
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>API Secret</Label>
            <div className="flex space-x-2">
              <Input
                type="password"
                value={settings.globalSettings.apiSecret}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      apiSecret: e.target.value,
                    },
                  })
                }
              />
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allowed Origins</Label>
            <div className="space-y-2">
              {settings.globalSettings.allowedOrigins.map((origin, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={origin}
                    onChange={(e) => {
                      const newOrigins = [...settings.globalSettings.allowedOrigins]
                      newOrigins[index] = e.target.value
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          allowedOrigins: newOrigins,
                        },
                      })
                    }}
                    placeholder="https://example.com"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newOrigins = settings.globalSettings.allowedOrigins.filter(
                        (_, i) => i !== index
                      )
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          allowedOrigins: newOrigins,
                        },
                      })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      allowedOrigins: [...settings.globalSettings.allowedOrigins, ""],
                    },
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Origin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Integrations</CardTitle>
          <CardDescription>
            Manage your active third-party integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleAddIntegration} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Integration
          </Button>

          {settings.integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <Input
                        value={integration.name}
                        onChange={(e) =>
                          handleUpdateIntegration(integration.id, { name: e.target.value })
                        }
                        className="h-7 w-[200px]"
                      />
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={integration.type}
                        onValueChange={(value: Integration["type"]) =>
                          handleUpdateIntegration(integration.id, { type: value })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="calendar">Calendar</SelectItem>
                          <SelectItem value="crm">CRM</SelectItem>
                          <SelectItem value="payment">Payment</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="storage">Storage</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {getStatusBadge(integration.status)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // TODO: Implement OAuth flow
                        toast({
                          title: "Coming soon",
                          description: "OAuth integration will be available soon.",
                        })
                      }}
                    >
                      <Link className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteIntegration(integration.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Configuration</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="password"
                        placeholder="API Key"
                        value={integration.config.apiKey || ""}
                        onChange={(e) =>
                          handleUpdateIntegration(integration.id, {
                            config: {
                              ...integration.config,
                              apiKey: e.target.value,
                            },
                          })
                        }
                      />
                      <Input
                        type="password"
                        placeholder="API Secret"
                        value={integration.config.apiSecret || ""}
                        onChange={(e) =>
                          handleUpdateIntegration(integration.id, {
                            config: {
                              ...integration.config,
                              apiSecret: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <Input
                      placeholder="Webhook URL"
                      value={integration.config.webhookUrl || ""}
                      onChange={(e) =>
                        handleUpdateIntegration(integration.id, {
                          config: {
                            ...integration.config,
                            webhookUrl: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                {integration.error && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{integration.error}</AlertDescription>
                  </Alert>
                )}

                {integration.lastSync && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-4 w-4" />
                    <span>Last synced: {integration.lastSync}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleDiscard}>
          Discard Changes
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Security Note</AlertTitle>
        <AlertDescription>
          Keep your API keys and secrets secure. Never share them or commit them to
          version control.
        </AlertDescription>
      </Alert>
    </div>
  )
} 